import { useState, useEffect } from "react";

import styles from './CartItem.module.scss'

import closeCross from '../../../assets/images/icons/cross_pink.svg'

import { PlusMinus } from "../../ui/PlusMinus";
import { CheckBox } from "../../ui/CheckBox";
import { DeleteProductModalWindow } from "../ModalWindows";

import type { Product } from '../../../utils/structures.ts';
import type { ProductCart } from "../../../utils/structures.ts";
import { cartStore } from "../../../stores/CartStore.ts";

import { getImageUrl } from "../../../utils/functions.ts";

interface CartItemProps {
    item: ProductCart,
    card: Product,
    selected: boolean,
    onSelect: () => void
}

export function CartItem({ item, card, selected, onSelect }: CartItemProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const productQuantity = cartStore.cartItems.find(cartItem => cartItem.id === item.id)?.quantity ?? 0;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowConfirm(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return <div className={styles.cartItem}>
        <div className={styles.checkWithImg}>
            <CheckBox
                transition={false}
                checked={selected}
                onChange={onSelect}
            />
            
            <div className={`img-wrapper ${styles.imgWrapper}`}>
                <img
                    src={getImageUrl(item.id)}
                    alt='product img'
                />
            </div>

            <p className={styles.name}>{item.name}</p>
        </div>

        <div>
            <PlusMinus
                item={card}
                productQuantity={productQuantity}
            />
        </div>

        <h2>{card.price * productQuantity} ₽</h2>

        <button className='delete-button'
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