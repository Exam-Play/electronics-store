import { useState } from 'react';

import ratingIcon from '../../assets/images/icons/rating.svg'

import type { Product } from '../Structures';

function ProductCard({
    type,
    dataImage
}:{
    type : string,
    dataImage: Product
}){
    const [loaded, setLoaded] = useState(false);

    const isBestsellers = (type === 'Хиты продаж');
    const isNovelty = (type === 'Новинки');

    const ratingBlock = (dataImage.rating !== 0.0) ? 
        <div className="rating-wrapper">
            <img src={ratingIcon} alt='rating icon'/>
            <span>{dataImage.rating}</span>
        </div>
    : null;

    const backgroundStyle = {
        background: `${isBestsellers ? '#FF60C3' : (isNovelty) ? '#00E398' : 'white'}`
    };

    const getImageUrl = (id: number) => {
        return new URL(`../../assets/images/goods/image_${id}.png`, import.meta.url).href;
    };

    return <div className="product-card">
        <div className="img-wrapper">
            <div className="text-wrapper" style={backgroundStyle}>
                <p>{isBestsellers ? 'Хит' : isNovelty ? 'Новинка' : ''}</p>
            </div>
            <img
                src={getImageUrl(dataImage.id)}
                alt='product img'
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                onLoad={() => setLoaded(true)}
            />
        </div>
        <h2>{dataImage.price} ₽</h2>
        <p>{dataImage.name}</p>
        {ratingBlock}
    </div>
}

export default ProductCard;