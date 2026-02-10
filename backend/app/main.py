from fastapi import FastAPI, HTTPException
from app.db import get_connection
from app.helper import *

app = FastAPI(title="Gym App API")

@app.get("/")
def root():
    return {"health": "ok"}

@app.get("/users")
def get_users():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    user = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return user

@app.post("/signup")
def add_user(email: str, password: str):
    conn = get_connection()
    cur = conn.cursor()

    password_hash = hash_password(password)

    try:
        cur.execute(
            """
            INSERT INTO users (email, password_hash)
            VALUES (%s, %s)
            RETURNING id;
            """,
            (email, password_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
    except Exception:
        conn.rollback()
        raise HTTPException(status_code=400, detail="User already exists")
    finally:
        cur.close()
        conn.close()

    return {
        "id": user_id,
        "email": email
    }


