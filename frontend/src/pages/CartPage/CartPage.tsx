import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import styles from "./CartPage.module.scss";

import { Gratitude } from "../../components/cart-page/ModalWindows";
import { CartTab } from "../../components/cart-page/CartTab";
import { HistoryTab } from "../../components/cart-page/HistoryTab";

import type { Product } from "../../utils/structures.ts";

import { authStore } from "../../stores/AuthStore.ts";
import { cartStore } from "../../stores/CartStore.ts";

import { useTabFromQuery } from "../../hooks/useTabFromQuery.ts";
import { useOrderHistory } from "../../hooks/useOrderHistory.ts";
import { useCartSelection } from "../../hooks/useCartSelection.ts";

function CartPageComponent({ cards }: { cards: Product[] }) {
    const username = authStore.username;
    const navigate = useNavigate();

    useEffect(() => {
        if (username === "") navigate("/");
    }, [username, navigate]);

    const [activeTab, setActiveTab] = useTabFromQuery<"cart" | "history">("cart", "history");
    const { orders, loadOrders } = useOrderHistory(username);
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

    return <div className={styles.cartWrapper}>
        {thanks !== "" &&
            <Gratitude thanks={thanks} setThanks={setThanks} loadOrders={loadOrders} />
        }

        <div className={styles.cart}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "cart" ? styles.active : ""}`}
                    onClick={() => setActiveTab("cart")}
                >
                    <span>Корзина</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "history" ? styles.active : ""}`}
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
}

export const CartPage = observer(CartPageComponent);