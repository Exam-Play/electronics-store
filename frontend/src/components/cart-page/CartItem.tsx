import { useState, useEffect } from "react";

import closeCross from '../../assets/images/icons/cross_pink.svg'

import { PlusMinus } from "../catalog-page/PlusMinus";
import DeleteProductModalWindow from "./DeleteProductModalWindow";
import type { Product } from '../../utils/structures';
import type { ProductCart } from "../../utils/structures";
import { cartStore } from "../../stores/CartStore";

function CartItem({
    item,
    card,
    selected,
    onSelect
}:{
    item: ProductCart,
    card: Product,
    selected: boolean,
    onSelect: () => void
}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const productQuantity = cartStore.cartItems.find(cartItem => cartItem.id === item.id)?.quantity ?? 0;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowConfirm(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const getImageUrl = (id: number) => {
        return new URL(`../../assets/images/goods/image_${id}.png`, import.meta.url).href;
    };

    return <div className="cart-item">
        <div className="check-with-img">
            <label className="check-item" tabIndex={0}>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onSelect}
                />
                <div className="checkmark"/>
            </label>
            
            <div className="img-wrapper">
                <img
                    src={getImageUrl(item.id)}
                    alt='product img'
                />
            </div>

            <p className="name">{item.name}</p>
        </div>

        <div className='add-more'>
            <PlusMinus
                item={card}
                productQuantity={productQuantity}
            />
        </div>

        <h2>{card.price * productQuantity} ₽</h2>

        <button
            className="delete-button"
            onClick={() => setShowConfirm(true)}
        >
            <img src={closeCross} alt="close cross"/>
            <p>Удалить</p>
        </button>

        {showConfirm && (
            <DeleteProductModalWindow
                item={item}
                onConfirm={() => {
                    cartStore.removeItem(item.id);
                    if (selected) onSelect();
                    setShowConfirm(false);
                }}
                onCancel={() => setShowConfirm(false)}
            />
        )}
    </div>
}

export default CartItem;