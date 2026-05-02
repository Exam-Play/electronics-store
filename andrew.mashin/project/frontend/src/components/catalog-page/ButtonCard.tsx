import { useNavigate } from 'react-router-dom';

import CartIcon from '../../assets/images/icons/cart_white.svg'
import PlusMinus from './PlusMinus';

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

function ButtonCard({
    item,
    cartItems,
    addToCart,
    removeFromCart
}:{
    item: Product,
    cartItems: Product[],
    addToCart: (item: Product) => void,
    removeFromCart: (id: number) => void
}){
    const navigate = useNavigate();
    const productQuantity = cartItems.filter(cartItem => cartItem.id === item.id).length;

    let buttonCard = (
        <button
            className="button-blue-template add-to-cart"
            onClick={() => addToCart(item)}
        >
            <img src={CartIcon} alt="cart icon"/>
            <span>В корзину</span>
        </button>
    );

    if (cartItems.some(cartItem => cartItem.id === item.id)) {
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
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    productQuantity={productQuantity}
                />
            </div>
        );
    }

    return buttonCard
}

export default ButtonCard;