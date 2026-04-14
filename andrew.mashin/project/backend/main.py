from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

class LoginData(BaseModel):
    username: str
    password: str

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def post_login(post_data: LoginData):
    with open("database/users.json", "r") as file:
        database_data = json.load(file)

    for user in database_data:
        if post_data.username == user["username"] \
        and post_data.password == user["password"]:
            return True

    return False

@app.post("/logout")
def post_logout():
    return {"message": "Goodbye user"}


@app.get("/goods")
def get_goods():
    return {"message": "Hello FastAPI"}


@app.get("/orders")
def get_orders():
    return {"message": "Hello FastAPI"}


@app.post("/orders")
def post_orders():
    return {"message": "Hello FastAPI"}