import { useState } from "react";

import ratingIcon from '../../assets/images/icons/rating.svg'
import CartIcon from '../../assets/images/icons/cart_white.svg'


interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    isBestseller: boolean;
    isNovelty: boolean;
}


function ProductCard({
    item
}:{
    item: Product
}){
    const [loaded, setLoaded] = useState(false);

    const ratingBlock = (item.rating !== 0.0) ? 
        <div className="rating-wrapper">
            <img src={ratingIcon} alt='rating icon'/>
            <span>{item.rating}</span>
        </div>
    : null;

    const backgroundStyle = {
        background: `${item.isBestseller ? '#FF60C3' : (item.isNovelty) ? '#00E398' : 'white'}`
    };

    return <div className="product-card">
        <div className="img-wrapper">
            <div className="text-wrapper">
                {item.isNovelty ?
                <div className="label novelty">
                    <p>Новинка</p>
                </div>
                : null}

                {item.isBestseller ?
                <div className="label bestseller">
                    <p>Хит</p>
                </div>
                : null}
            </div>
            <img
                src={require(`../../assets/images/goods/image_${item.id}.png`)}
                alt='product img'
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                onLoad={() => setLoaded(true)}
            />
        </div>
        <h2>{item.price} ₽</h2>
        <p>{item.name}</p>
        {ratingBlock}

        <button className="add-to-cart">
            <img src={CartIcon} alt="cart icon"/>
            <span>В корзину</span>
        </button>
    </div>
}

export default ProductCard;