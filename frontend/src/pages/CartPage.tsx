import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import "../styles/cartStyle.scss";

import { Gratitude } from "../components/cart-page/Gratitude";
import { CartTab } from "../components/cart-page/CartTab";
import { HistoryTab } from "../components/cart-page/HistoryTab";

import type { Product } from "../utils/structures";

import { authStore } from "../stores/AuthStore";
import { cartStore } from "../stores/CartStore";

import { useTabFromQuery } from "../hooks/useTabFromQuery";
import { useOrderHistory } from "../hooks/useOrderHistory";
import { useCartSelection } from "../hooks/useCartSelection";

function CartPageComponent({ cards }: { cards: Product[] }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.username === "") navigate("/");
    }, [authStore.username, navigate]);

    const [activeTab, setActiveTab] = useTabFromQuery<"cart" | "history">("cart", "history");
    const { orders, loadOrders } = useOrderHistory();
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
    }, [loadOrders]);

    const uniqueItems = cartStore.cartItems.filter(
        (item, index, self) => self.findIndex(i => i.id === item.id) === index
    );
    const { selectedIds, setSelectedIds, toggleSelect, toggleSelectAll } = useCartSelection(uniqueItems);

    return <div className="cart-wrapper">
        {thanks !== "" &&
            <Gratitude thanks={thanks} setThanks={setThanks} loadOrders={loadOrders} />
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

            {activeTab === "cart" &&
                <CartTab
                    cards={cards}
                    uniqueItems={uniqueItems}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    toggleSelect={toggleSelect}
                    toggleSelectAll={toggleSelectAll}
                    setThanks={setThanks}
                />
            }

            {activeTab === "history" && <HistoryTab orders={orders} />}
        </div>
    </div>
};

export const CartPage = observer(CartPageComponent);