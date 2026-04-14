from fastapi import FastAPI

app = FastAPI()

@app.post("/login")
def post_login():
    return {"message": "Hello FastAPI"}


@app.post("/logout")
def post_logout():
    return {"message": "Hello FastAPI"}


@app.get("/goods")
def get_goods():
    return {"message": "Hello FastAPI"}


@app.get("/orders")
def get_orders():
    return {"message": "Hello FastAPI"}


@app.post("/orders")
def post_orders():
    return {"message": "Hello FastAPI"}