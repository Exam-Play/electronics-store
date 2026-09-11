from datetime import datetime
import os

from sqlalchemy.orm import Session

from database.db import SessionLocal, get_db
from database.models import Good, CartItem

from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware

import bcrypt
from database.models import User, Order, OrderItem

app = FastAPI()

_frontend_urls_raw = os.environ.get("FRONTEND_URLS", "")
_allowed_origins = [
    "http://localhost:3000"
]
_allowed_origins.extend(
    url.strip() for url in _frontend_urls_raw.split(",") if url.strip()
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def post_login(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")

    session = SessionLocal()
    user = session.query(User).filter_by(username=username).first()
    session.close()

    if user is None:
        raise HTTPException(status_code=401, detail="Неправильный логин или пароль")

    password_matches = bcrypt.checkpw(
        password.encode("utf-8"),
        user.password_hash.encode("utf-8")
    )

    if not password_matches:
        raise HTTPException(status_code=401, detail="Неправильный логин или пароль")

    return True

@app.post("/logout")
def post_logout():
    return True

@app.post("/cart/save")
async def save_cart(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    username = body.get("username")
    cart = body.get("cart", [])
    user = db.query(User).filter_by(username=username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    db.query(CartItem).filter_by(user_id=user.id).delete()

    for item in cart:
        db.add(CartItem(
            user_id=user.id,
            good_id=item["id"],
            quantity=item.get("quantity", 1),
        ))

    db.commit()
    return {
        "success": True
    }

@app.get("/users/{username}/cart")
async def get_cart(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(username=username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    cart = [
        {
            "id": item.good.id,
            "name": item.good.name,
            "price": item.good.price,
            "quantity": item.quantity,
        }
        for item in user.cart_items
    ]
    return {
        "cart": cart
    }

@app.get("/goods")
def get_goods(db: Session = Depends(get_db)):
    goods = db.query(Good).all()

    return [
        {
            "id": g.id,
            "name": g.name,
            "price": g.price,
            "rating": g.rating,
            "isBestseller": g.is_bestseller,
            "isNovelty": g.is_novelty,
            "description": g.description,
            "characteristics": g.characteristics,
        }
        for g in goods
    ]

@app.get("/users/{username}/orders")
async def get_orders(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(username=username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    orders = [
        {
            "id": order.order_number,
            "date": order.date.strftime("%d.%m.%Y %H:%M"),
            "contacts": {
                "tel": order.tel,
                "email": order.email,
                "address": order.address,
            },
            "items": [
                {
                    "id": item.good_id,
                    "name": item.name,
                    "quantity": item.quantity,
                    "price": item.price,
                }
                for item in order.items
            ],
            "delivery": order.delivery,
            "payment": order.payment,
            "packaging": order.packaging,
            "total": order.total,
        }
        for order in user.orders
    ]
    return {
        "orders": orders
    }

@app.post("/orders")
async def post_orders(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    username = body.get("username")
    cart = body.get("cart", [])
    order_id = body.get("order_id")

    user = db.query(User).filter_by(username=username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    total = sum(item["price"] * item["quantity"] for item in cart)

    order = Order(
        order_number=order_id,
        user_id=user.id,
        date=datetime.now(),
        tel=body.get("tel"),
        email=body.get("email"),
        address=body.get("address"),
        delivery=body.get("delivery"),
        payment=body.get("payment"),
        packaging=body.get("packaging"),
        total=total,
    )
    db.add(order)
    db.flush()

    for item in cart:
        db.add(OrderItem(
            order_id=order.id,
            good_id=item["id"],
            name=item["name"],
            price=item["price"],
            quantity=item["quantity"],
        ))

    db.query(CartItem).filter_by(user_id=user.id).delete()

    db.commit()
    return {
        "success": True,
        "order_id": order_id
    }