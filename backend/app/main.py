from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.db import get_db
from app.helper import hash_password, verify_password

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

@app.get("/users")
def get_users():
    try:
        with get_db() as cur:
            cur.execute("SELECT * FROM users")
            return cur.fetchall()
    except Exception as e:
        print(e)
        raise HTTPException(500, "Fehler beim Abrufen der Benutzer")


@app.post("/auth/signup")
def add_user(email: str, password: str):
    password_hash = hash_password(password)

    try:
        with get_db() as cur:
            cur.execute(
                """
                INSERT INTO users (email, password_hash)
                VALUES (%s, %s)
                RETURNING user_id;
                """,
                (email, password_hash)
            )
            user_id = cur.fetchone()[0]

        return {
            "id": user_id,
            "email": email,
            "access_token": "dummy-token"
        }

    except Exception:
        raise HTTPException(400, "User already exists")


@app.post("/auth/login")
def login(email: str, password: str):
    with get_db() as cur:
        cur.execute(
            "SELECT user_id, password_hash FROM users WHERE email=%s",
            (email,)
        )
        row = cur.fetchone()

    if not row:
        raise HTTPException(401, "Invalid credentials")

    user_id, password_hash = row
    if not verify_password(password, password_hash):
        raise HTTPException(401, "Invalid credentials")

    return {
        "id": user_id,
        "email": email,
        "access_token": "dummy-token"
    }

@app.post("/auth/forgot-password")
def send_mail(email: str):
    try:
        with get_db() as cur:
            cur.execute(
                "SELECT user_id FROM users WHERE email=%s",
                (email,)
            )
            user = cur.fetchone()

            if user:
                user_id = user[0]
                # TODO:
                # 1. generate reset token and save in db, send mail
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


