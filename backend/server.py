from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import time
import jwt
from datetime import datetime, timedelta

SECRET_KEY = os.environ.get("SECRET_KEY", "change-me-later-to-something-long")
ALGORITHM = "HS256"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.environ.get("DATABASE_URL")


def create_access_token(username: str):
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode = {"sub": username, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_db_connection():
    pass


@app.get("/")
async def home():
    return {"status": "online"}


@app.post("/users")
async def add_user(request: Request):
    pass


@app.post("/login")
async def login(request: Request):
    try:
        data = await request.json()
    except:
        raise HTTPException(status_code=400, detail="Некорректный JSON")

    u = data.get("username")
    p = data.get("password")

    if not u or not p:
        raise HTTPException(status_code=400, detail="Введите логин и пароль")

    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Ищем юзера в базе
        cursor.execute("SELECT * FROM users WHERE username = %s", (u,))
        user = cursor.fetchone()

        if not user or user["password"] != p:
            raise HTTPException(status_code=401, detail="Неверное имя или пароль")

        token = create_access_token(u)

        return {"status": "success", "access_token": token, "token_type": "bearer"}
    finally:
        cursor.close()
        conn.close()


@app.get("/users")
async def get_users():
    pass


if __name__ == "__main__":
    import uvicorn
