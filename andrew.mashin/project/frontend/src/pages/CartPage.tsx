import { useState } from "react";

import "../styles/cartStyle.scss";
import EmptyCart from "../components/cart-page/EmptyCart";
import CheckBox from "../components/catalog-page/CheckBox";
import CartItem from "../components/cart-page/CartItem";

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
    cartItems,
    addToCart,
    removeFromCart,
    onOrderComplete
}:{
    cartItems: Product[],
    addToCart: (item: Product) => void,
    removeFromCart: (id: number) => void,
    onOrderComplete: () => void
}) {
    const [activeTab, setActiveTab] = useState<"cart" | "history">("cart");
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const selectedItems = cartItems.filter(i => selectedIds.has(i.id));
    const finalPrice = selectedItems.reduce((sum, i) => sum + i.price, 0);
    const countGoods = selectedItems.length;

    const itemText = (countGoods === 1) ? "товар" : (countGoods >= 2 && countGoods <= 4) ? "товара" : "товаров";
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
        <div className="goods-wrapper">
            <CheckBox
                title={"Выбрать все"}
                checked={selectedIds.size === uniqueItems.length && uniqueItems.length > 0}
                onChange={toggleSelectAll}
            />

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

            <h2>{countGoods} {itemText} на {finalPrice} ₽</h2>
        </div>
    )

    return <div className="cart-wrapper">
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

            {activeTab === "history" && (
                <div className="emptyCart">
                    <h2>История пуста</h2>
                    <p>Вы ещё не совершали покупок</p>
                </div>
            )}
        </div>
    </div>
};

export default CartPage;
