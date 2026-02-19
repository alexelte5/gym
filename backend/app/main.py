from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.db import get_db
from app.helper import hash_password, verify_password
from app.schemas import *

app = FastAPI(title="Gym App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"health": "ok"}


@app.post("/auth/signup")
def add_user(data: UserCredentials):
    password_hash = hash_password(data.password)
    try:
        with get_db() as cur:
            cur.execute(
                """
                INSERT INTO users (email, password_hash)
                VALUES (%s, %s)
                RETURNING user_id;
                """,
                (data.email, password_hash)
            )
            user_id = cur.fetchone()[0]

        return {
            "id": user_id,
            "email": data.email,
            "access_token": "dummy-token"
        }

    except Exception:
        raise HTTPException(400, "User already exists")


@app.post("/auth/login")
def login(data: UserCredentials):
    with get_db() as cur:
        cur.execute(
            "SELECT user_id, password_hash FROM users WHERE email=%s",
            (data.email,)
        )
        row = cur.fetchone()

    if not row:
        raise HTTPException(401, "Invalid credentials")

    user_id, password_hash = row
    if not verify_password(data.password, password_hash):
        raise HTTPException(401, "Invalid credentials")

    return {
        "id": user_id,
        "email": data.email,
        "access_token": "dummy-token"
    }

@app.post("/auth/forgot-password")
def send_mail(data: ForgotPasswordRequest):
    try:
        with get_db() as cur:
            cur.execute(
                "SELECT user_id FROM users WHERE email=%s",
                (data.email,)
            )
            user = cur.fetchone()

            if user:
                user_id = user[0]
                print(f"Password reset requested for user_id={user_id}")
        return {
            "message": "Falls ein Konto mit dieser E-Mail existiert, wurde eine Passwort-Reset-Mail versendet."
        }

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Passwort-Reset konnte nicht gestartet werden"
        )

@app.get("/admin/users")
def get_users():
    try:
        with get_db() as cur:
            cur.execute("SELECT * FROM users");
            return cur.fetchall()
        
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim Abrufen aller Benutzer")

@app.post("/admin/muscles")
def add_muscles(data: Muscle):
    try:
        with get_db() as cur:
            cur.execute(
                """
                INSERT INTO muscles (name)
                VALUES (%s)
                RETURNING name;
                """,
                (data.name,)
            )
            row = cur.fetchone()
        
        return row
    
    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim hinzufügen des Muskels")
    
@app.put("/admin/muscles/{muscle_id}")
def update_muscle(data: Muscle, muscle_id: str):
    try:
        with get_db() as cur:
            cur.execute(
                "SELECT id FROM muscles WHERE id = %s",
                (muscle_id,)
            )
            existing_muscle = cur.fetchone()
            if not existing_muscle:
                raise HTTPException(404, "Muskel mit dieser ID existiert nicht")
            
            cur.exeucte(
                """
                SELECT id FROM muscles
                WHERE name = %s AND id != %s;
                """,
                (data.name, muscle_id,)
            )
            duplicate_name = cur.fetchone()
            if duplicate_name:
                raise HTTPException(404, "Muskel mit diesem Namen existiert bereits")

            cur.execute(
                """
                UPDATE muscles
                SET name = (%s)
                WHERE id = (%s)
                RETURNING id, name;
                """,
                (data.name, muscle_id,)
            )
            updated = cur.fetchone()
        
        return {
            "id": updated[0],
            "name": updated[1]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim updaten des Muskels")

@app.delete("/admin/muscles/{muscle_id}")
def delete_muscle(muscle_id: str):
    try:
        with get_db() as cur:
            cur.execute(
                """
                DELETE FROM muscles
                WHERE id = %s
                RETURNING id, name;
                """,
                (muscle_id,)
            )
            deleted = cur.fetchone()

            if not deleted:
                raise HTTPException(404, "Muskel nicht gefunden")
            
            return {
                "message": "Muskel erfolgreich gelöscht",
                "deleted": {
                    "id": deleted[0],
                    "name": deleted[1]
                }
            }
    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim löschen des Muskels")

@app.post("/admin/exercise")
def add_exercise(data: ExerciseCreate):
    try:
        with get_db() as cur:
            cur.execute(
                """
                SELECT id FROM muscles
                WHERE id = ANY(%s)
                """,
                (data.muscle_ids,)
            )
            existing_muscles = cur.fetchall()
            exisiting_ids = {row[0] for row in existing_muscles}
            if len(exisiting_ids) != len(set(data.muscle_ids)):
                raise HTTPException(400, "Eine oder mehrere Muskeln existieren nicht")
            
            cur.execute(
                """
                INSERT INTO exercises (name)
                VALUES (%s)
                RETURNING id, name;
                """,
                (data.name,)
            )
            exercise = cur.fetchone()
            exercise_id = exercise[0]

            for muscle_id in data.muscle_ids:
                cur.execute(
                    """
                    INSERT INTO exercise_muscles (exercise_id, muscle_id)
                    VALUES (%s, %s);
                    """,
                    (exercise_id, muscle_id)
                )
        
        return {
            "id": exercise[0],
            "name": exercise[1],
            "muscle_ids": data.muscle_ids
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim hinzufügen der Übung")
    
@app.put("/admin/exercises/{exercise_id}")
def update_exercise(exercise_id: int, data: ExerciseCreate):
    try:
        with get_db() as cur:

            # 1️⃣ Prüfen ob Exercise existiert
            cur.execute(
                "SELECT id FROM exercises WHERE id = %s;",
                (exercise_id,)
            )
            if not cur.fetchone():
                raise HTTPException(404, "Exercise nicht gefunden")


            # 2️⃣ Prüfen ob alle Muskel-IDs existieren
            cur.execute(
                """
                SELECT id FROM muscles
                WHERE id = ANY(%s);
                """,
                (data.muscle_ids,)
            )
            existing = cur.fetchall()
            existing_ids = {row[0] for row in existing}

            if len(existing_ids) != len(set(data.muscle_ids)):
                raise HTTPException(400, "Eine oder mehrere Muskel-IDs existieren nicht")


            # 3️⃣ Exercise Name updaten
            cur.execute(
                """
                UPDATE exercises
                SET name = %s
                WHERE id = %s
                RETURNING id, name, created_at;
                """,
                (data.name, exercise_id)
            )
            updated_exercise = cur.fetchone()


            # 4️⃣ Alte Muskel-Relations löschen
            cur.execute(
                "DELETE FROM exercise_muscles WHERE exercise_id = %s;",
                (exercise_id,)
            )


            # 5️⃣ Neue Muskel-Relations setzen
            for muscle_id in data.muscle_ids:
                cur.execute(
                    """
                    INSERT INTO exercise_muscles (exercise_id, muscle_id)
                    VALUES (%s, %s);
                    """,
                    (exercise_id, muscle_id)
                )

        return {
            "id": updated_exercise[0],
            "name": updated_exercise[1],
            "created_at": updated_exercise[2],
            "muscle_ids": data.muscle_ids
        }

    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim Updaten der Übung")

@app.delete("/admin/exercises/{exercise_id}")
def delete_exercise(exercise_id: int):
    try:
        with get_db() as cur:
            cur.execute(
                """
                DELETE FROM exercises
                WHERE id = %s
                RETURNING id, name;
                """,
                (exercise_id,)
            )
            deleted = cur.fetchone()

        if not deleted:
            raise HTTPException(404, "Exercise nicht gefunden")

        return {
            "message": "Exercise erfolgreich gelöscht",
            "deleted": {
                "id": deleted[0],
                "name": deleted[1]
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim Löschen der Übung")
