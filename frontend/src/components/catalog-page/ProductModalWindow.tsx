import { useState, useEffect } from 'react';

import closeCross from '../../assets/images/icons/cross.svg'
import ratingIcon from '../../assets/images/icons/rating.svg'
import { ButtonCard } from './ButtonCard';
import type { Product } from '../../utils/structures';

function ProductModalWindow({
    activeProduct,
    setActiveProduct
}:{
    activeProduct: Product,
    setActiveProduct: (product: Product | null) => void
}){
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [activeProduct]);

    const ratingBlock = (activeProduct?.rating !== 0.0) ? 
        <div className="rating-wrapper">
            <img src={ratingIcon} alt='rating icon'/>
            <span>{activeProduct?.rating}</span>
        </div>
    : null;

    const getImageUrl = (id: number) => {
        return new URL(`../../assets/images/goods_increased/image_${id}.png`, import.meta.url).href;
    };
    
    return <div className="product-window">
        <div className="wrapper">
            <button className="close-button" onClick={() => setActiveProduct(null)}>
                <img src={closeCross} alt="close cross"/>
            </button>

            <div className="content">
                <div className="info-wrapper">
                    <div className="img-wrapper">
                        <div className="text-wrapper">
                            {activeProduct?.isNovelty ?
                            <div className="label novelty">
                                <p>Новинка</p>
                            </div>
                            : null}

                            {activeProduct?.isBestseller ?
                            <div className="label bestseller">
                                <p>Хит</p>
                            </div>
                            : null}
                        </div>
                        <img
                            src={activeProduct?.id
                                ? getImageUrl(activeProduct.id)
                                : undefined}
                            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                            alt='product img'
                            onLoad={() => setLoaded(true)}
                        />
                    </div>
                    <div className="info">
                        <h1>{activeProduct?.name}</h1>
                        {ratingBlock}
                        <p>{activeProduct?.description}</p>
                        <h2>Характеристики:</h2>
                        <ul>
                            {activeProduct?.characteristics.map((item, index) => (
                                <li key={index}>
                                    <span className="label">{item.label}</span>
                                    <hr/>
                                    <span className="value">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                        <h1 className="price">{activeProduct?.price} ₽</h1>
                    </div>
                </div>

                <ButtonCard
                    item={activeProduct}
                />
            </div>
        </div>
    </div>
}

export default ProductModalWindow;