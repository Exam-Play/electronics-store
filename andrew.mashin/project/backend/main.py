from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import json


DB_USERS = "database/users.json"


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login")
async def post_login(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")

    with open(DB_USERS, "r", encoding="utf-8") as file:
        database_data = json.load(file)

    for user in database_data:
        if username == user["username"] \
        and password == user["password"]:
            return True

    raise HTTPException(status_code=401, detail="Неправильный логин или пароль")


@app.post("/logout")
def post_logout():
    return True


@app.post("/cart/save")
async def save_cart(request: Request):
    body = await request.json()
    username = body.get("username")
    cart = body.get("cart", [])

    with open(DB_USERS, "r", encoding="utf-8") as file:
        users = json.load(file)

    for user in users:
        if user["username"] == username:
            user["cart"] = cart
            break

    with open(DB_USERS, "w", encoding="utf-8") as file:
        json.dump(users, file, ensure_ascii=False, indent=4)

    return { "success": True }


@app.get("/cart/{username}")
async def get_cart(username: str):
    with open("database/users.json", "r", encoding="utf-8") as file:
        users = json.load(file)

    for user in users:
        if user["username"] == username:
            return { "cart": user.get("cart", []) }

    raise HTTPException(status_code=404, detail="Пользователь не найден")


@app.get("/goods")
def get_goods():
    with open("database/goods.json", "r", encoding="utf-8") as file:
        database_data = json.load(file)

    return database_data


@app.get("/orders")
def get_orders():
    return {"message": "Hello FastAPI"}


@app.post("/orders")
def post_orders():
    return {"message": "Hello FastAPI"}