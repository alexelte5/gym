from fastapi import FastAPI
from app.db import get_connection

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

@app.post("/add_user")
def add_user(email: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (email) VALUES (%s) RETURNING id;", (email,))
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return {"id": user_id, "email": email}
