import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import styles from './ButtonCard.module.scss'

import CartIcon from '../../../assets/images/icons/cart_white.svg'
import { PlusMinus } from '../../ui/PlusMinus';

import type { Product } from '../../../utils/structures.ts';

import { cartStore } from '../../../stores/CartStore.ts';
import { authStore } from '../../../stores/AuthStore.ts';
import { activePageStore } from '../../../stores/ActivePageStore.ts';

function ButtonCardComponent({ item }:{ item: Product }){
    const navigate = useNavigate();
    const productQuantity = cartStore.cartItems.find(cartItem => cartItem.id === item.id)?.quantity ?? 0;

    let buttonCard = (
        <button
            className={`button-blue-template ${styles.addToCart}`}
            onClick={() => {
                if (authStore.isLoggedIn) {
                    cartStore.addToCart(item);
                } else {
                    navigate('/login');
                    activePageStore.syncWithPath("login");
                }
            }}
        >
            <img src={CartIcon} alt="cart icon"/>
            <span>В корзину</span>
        </button>
    );

    if (cartStore.cartItems.some(cartItem => cartItem.id === item.id)) {
        buttonCard = (
            <div className={styles.addMore}>
                <button
                    className={`button-pink-template ${styles.availability}`}
                    onClick={() => {
                        navigate('/cart');
                        activePageStore.syncWithPath('cart');
                    }}
                >
                    <img src={CartIcon} alt="cart icon"/>
                    <span>{productQuantity} шт.</span>
                </button>
                <PlusMinus
                    item={item}
                    productQuantity={productQuantity}
                />
            </div>
        );
    }

    return buttonCard;
}

export const ButtonCard = observer(ButtonCardComponent);