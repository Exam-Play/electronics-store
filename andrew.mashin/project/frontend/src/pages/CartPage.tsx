import { useState, useEffect, useCallback } from "react";

import closeCross from '../assets/images/icons/cross_pink.svg'

import "../styles/cartStyle.scss";
import EmptyCart from "../components/cart-page/EmptyCart";
import CheckBox from "../components/catalog-page/CheckBox";
import CartItem from "../components/cart-page/CartItem";
import CartForm from "../components/cart-page/CartForm";
import Gratitude from "../components/cart-page/Gratitude";

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    isBestseller: boolean;
    isNovelty: boolean;
    description: string;
    characteristics: {
        label: string;
        value: string
    }[];
}

function CartPage({
    username,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    onOrderComplete
}:{
    username: string
    cartItems: Product[],
    setCartItems: React.Dispatch<React.SetStateAction<Product[]>>,
    addToCart: (item: Product) => void,
    removeFromCart: (id: number) => void,
    onOrderComplete: () => void
}) {
    const [orders, setOrders] = useState<any[]>([]);

    const loadOrders = useCallback(() => {
        if (!username) return;
        fetch(`http://127.0.0.1:8080/orders/${username}`)
            .then(r => r.json())
            .then(data => setOrders(data.orders ?? []));
    }, [username]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const [thanks, setThanks] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setThanks("");
                onOrderComplete();
                loadOrders();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onOrderComplete, loadOrders]);

    const [activeTab, setActiveTab] = useState<"cart" | "history">("cart");
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const selectedItems = cartItems.filter(i => selectedIds.has(i.id));
    const finalPrice = selectedItems.reduce((sum, i) => sum + i.price, 0);
    const countGoods = selectedItems.length;

    const itemText = (count: number) => (count === 1) ? "товар" : (count >= 2 && count <= 4) ? "товара" : "товаров";
    const uniqueItems = cartItems.filter(
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

    const cart = cartItems.length === 0 ? <EmptyCart/> : (
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
                            onClick={() => setCartItems([])}
                        >
                            <img src={closeCross} alt="close cross"/>
                            <p>Удалить все</p>
                        </button>
                    }

                    {selectedIds.size > 1 && selectedIds.size < uniqueItems.length &&
                        <button
                            className="delete-button"
                            onClick={() => selectedIds.forEach((item) => {
                                const count = cartItems.filter(i => i.id === item).length;
                                for (let i = 0; i < count; i++) {
                                    removeFromCart(item);
                                }
                                toggleSelect(item);
                            })}
                        >
                            <img src={closeCross} alt="close cross"/>
                            <p>Удалить отмеченные</p>
                        </button>
                    }
                </div>

                {uniqueItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        cartItems={cartItems}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        selected={selectedIds.has(item.id)}
                        onSelect={() => toggleSelect(item.id)}
                    />
                ))}

                <h2>{countGoods} {itemText(countGoods)} на {finalPrice} ₽</h2>
            </div>

            <h1>Оформление заказа</h1>

            <div className="cart-content">
                <CartForm
                    setThanks={setThanks}
                    cartItems={selectedItems}
                    username={username}
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
            {orders.map(order => (
                <div key={order.id} className="order-item">
                    <p>№{order.id} от {order.date}</p>
                    <p>{order.items.length} {itemText(order.items.length)}</p>
                    <p>{order.total} ₽</p>
                </div>
            ))}
        </div>
    );

    return <div className="cart-wrapper">
        {thanks !== "" &&
            <Gratitude
                thanks={thanks}
                setThanks={setThanks}
                onOrderComplete={onOrderComplete}
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

export default CartPage;
