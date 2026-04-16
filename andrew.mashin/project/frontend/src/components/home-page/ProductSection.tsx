import { useState } from 'react';

import bestsellersIcon from '../../assets/images/home-page/bestsellers.svg'
import noveltyIcon from '../../assets/images/home-page/novelty.svg'

import leftArrowIcon from '../../assets/images/home-page/left-arrow.svg'
import rightArrowIcon from '../../assets/images/home-page/right-arrow.svg'

import ProductCard from './ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    isBestseller: boolean;
    isNovelty: boolean;
}

function ProductSection({
    nameClass,
    title,
    description,
    data
}:{
    nameClass: string,
    title: string,
    description: string,
    data: Product[]
}){
    const isBestsellers = (title === 'Хиты продаж');
    const isNovelty = (title === 'Новинки');

    const getCard = (i: number) => data[i % data.length];

    const [leftIndex, setLeftIndex] = useState(0);

    const slideLeft = () => {
        setLeftIndex((leftIndex - 1 + data.length) % data.length);
    };

    const slideRight = () => {
        setLeftIndex((leftIndex + 1) % data.length);
    };

    return <div className={nameClass}>
        <div className='description'>
            <img src={isBestsellers ? bestsellersIcon : isNovelty ? noveltyIcon : ''} alt='description-icon'/>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
        <div className='cards-wrapper'>
            <img src={leftArrowIcon} className='arrow' onClick={slideLeft} alt='arrow left icon'/>
            <div className='cards'>
                <ProductCard type={title} dataImage={getCard(leftIndex)}/>
                <ProductCard type={title} dataImage={getCard(leftIndex + 1)}/>
                <ProductCard type={title} dataImage={getCard(leftIndex + 2)}/>
            </div>
            <img src={rightArrowIcon} className='arrow' onClick={slideRight} alt='arrow right icon'/>
        </div>
    </div>
}

export default ProductSection;