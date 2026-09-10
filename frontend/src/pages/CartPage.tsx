import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import closeCross from '../assets/images/icons/cross_pink.svg'
import "../styles/cartStyle.scss";

import EmptyCart from "../components/cart-page/EmptyCart";
import CheckBox from "../components/catalog-page/CheckBox";
import CartItem from "../components/cart-page/CartItem";
import { CartForm } from "../components/cart-page/CartForm";
import { Gratitude } from "../components/cart-page/Gratitude";
import type { Product } from "../utils/structures";
import { authStore } from "../stores/AuthStore";
import { observer } from 'mobx-react-lite';
import { cartStore } from "../stores/CartStore";

function CartPageComponent({
    cards
}:{
    cards: Product[]
}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (authStore.username === "") {
            navigate("/");
        }
    }, [authStore.username, navigate]);

    const [orders, setOrders] = useState<any[]>([]);

    const loadOrders = useCallback(() => {
        if (!authStore.username) return;
        fetch(`http://127.0.0.1:8080/orders/${authStore.username}`)
            .then(r => r.json())
            .then(data => setOrders(data.orders ?? []));
    }, [authStore.username]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const [thanks, setThanks] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setThanks("");
                cartStore.clearCart();
                loadOrders();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [cartStore.clearCart, loadOrders]);

    const [activeTab, setActiveTab] = useState<"cart" | "history">("cart");
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const selectedItems = cartStore.cartItems.filter(i => selectedIds.has(i.id));
    const finalPrice = selectedItems.reduce((sum, i) => {
        const product = cards.find(c => c.id === i.id);
        return sum + (product?.price ?? 0) * i.quantity;
    }, 0);
    const countGoods = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    const itemText = (count: number) => (count === 1) ? "товар" : (count >= 2 && count <= 4) ? "товара" : "товаров";
    const uniqueItems = cartStore.cartItems.filter(
        (item, index, self) => self.findIndex(i => i.id === item.id) === index
    );

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === uniqueItems.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(uniqueItems.map(i => i.id)));
        }
    };

    const cart = cartStore.cartItems.length === 0 ? <EmptyCart/> : (
        <div>
            <div className="cart-content">
                <div className="all-buttons">
                    <CheckBox
                        title={"Выбрать все"}
                        checked={selectedIds.size === uniqueItems.length && uniqueItems.length > 0}
                        onChange={toggleSelectAll}
                    />

                    {selectedIds.size === uniqueItems.length &&
                        <button
                            className="delete-button"
                            onClick={() => cartStore.clearCart()}
                        >
                            <img src={closeCross} alt="close cross"/>
                            <p>Удалить все</p>
                        </button>
                    }

                    {selectedIds.size > 1 && selectedIds.size < uniqueItems.length &&
                        <button
                            className="delete-button"
                            onClick={() => selectedIds.forEach(() => {
                                selectedIds.forEach((id) => cartStore.removeItem(id));
                                setSelectedIds(new Set());
                            })}
                        >
                            <img src={closeCross} alt="close cross"/>
                            <p>Удалить отмеченные</p>
                        </button>
                    }
                </div>

                {uniqueItems.map((item) => {
                    const card = cards.find(p => p.id === item.id);

                    if (!card) return null;

                    return <CartItem
                        key={item.id}
                        card={card}
                        item={item}
                        selected={selectedIds.has(item.id)}
                        onSelect={() => toggleSelect(item.id)}
                    />
                })}

                <h2>{countGoods} {itemText(countGoods)} на {finalPrice} ₽</h2>
            </div>

            <h1>Оформление заказа</h1>

            <div className="cart-content">
                <CartForm
                    cards={cards}
                    setThanks={setThanks}
                    cartItems={selectedItems}
                />
            </div>
        </div>
    )

    const history = (orders.length === 0 ?
        <div className="emptyCart">
            <h2>История пуста</h2>
            <p>Вы ещё не совершали покупок</p>
        </div>
        :
        <div className="history-cart-content">
            {orders.map(order => {
                const totalCount = (order.items as any[]).reduce(
                    (sum, item: any) => sum + item.quantity, 0
                );

                return <div key={order.id} className="order-item">
                    <p>№{order.id} от {order.date}</p>
                    <p>{totalCount} {itemText(totalCount)}</p>
                    <p>{order.total} ₽</p>
                </div>
            })}
        </div>
    );

    return <div className="cart-wrapper">
        {thanks !== "" &&
            <Gratitude
                thanks={thanks}
                setThanks={setThanks}
                loadOrders={loadOrders}
            />
        }

        <div className="cart">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === "cart" ? "active" : ""}`}
                    onClick={() => setActiveTab("cart")}
                >
                    <span>Корзина</span>
                </button>
                <button
                    className={`tab ${activeTab === "history" ? "active" : ""}`}
                    onClick={() => setActiveTab("history")}
                >
                    <span>История заказов</span>
                </button>
            </div>

            {activeTab === "cart" && cart}

            {activeTab === "history" && history}
        </div>
    </div>
};

export const CartPage = observer(CartPageComponent);