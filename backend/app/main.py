from fastapi import FastAPI, HTTPException, Depends
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from pydantic import BaseModel
from app.db import get_connection
from app.helper import *
import psycopg2

app = FastAPI(title="Gym App API")

# CORS erlauben (für dein React Native Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserSignup(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

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

@app.post("/auth/signup")
def add_user(user: UserSignup):
    conn = get_connection()
    cur = conn.cursor()

    password_hash = hash_password(user.password)

    try:
        cur.execute(
            """
            INSERT INTO users (email, password_hash)
            VALUES (%s, %s)
            RETURNING user_id;
            """,
            (user.email, password_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
    except Exception:
        conn.rollback()
        raise HTTPException(status_code=400, detail="User already exists")
    finally:
        cur.close()
        conn.close()

    # Dummy token für Testzwecke
    return {
        "id": user_id,
        "email": user.email,
        "access_token": "dummy-token"
    }

@app.post("/auth/login")
def login(user: UserLogin):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT user_id, password_hash FROM users WHERE email=%s",
        (user.email,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_id, password_hash = row
    if not verify_password(user.password, password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # Dummy token für Testzwecke
    return {
        "id": user_id,
        "email": user.email,
        "access_token": "dummy-token"
    }


