import { useNavigate } from 'react-router-dom';

import CartIcon from '../../assets/images/icons/cart_white.svg'
import { PlusMinus } from './PlusMinus';

import type { Product } from '../../utils/structures';
import { cartStore } from '../../stores/CartStore';
import { observer } from 'mobx-react-lite';

function ButtonCardComponent({
    item,
}:{
    item: Product,
}){
    const navigate = useNavigate();
    const productQuantity = cartStore.cartItems.find(cartItem => cartItem.id === item.id)?.quantity ?? 0;

    let buttonCard = (
        <button
            className="button-blue-template add-to-cart"
            onClick={() => cartStore.addToCart(item)}
        >
            <img src={CartIcon} alt="cart icon"/>
            <span>В корзину</span>
        </button>
    );

    if (cartStore.cartItems.some(cartItem => cartItem.id === item.id)) {
        buttonCard = (
            <div className='add-more'>
                <button
                    className="button-pink-template availability"
                    onClick={() => navigate('/cart')}
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