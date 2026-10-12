import { useState } from 'react';

import styles from './Slider.module.scss'

import bestsellersIcon from '../../../assets/images/home-page/bestsellers.svg'
import noveltyIcon from '../../../assets/images/home-page/novelty.svg'

import leftArrowIcon from '../../../assets/images/home-page/left-arrow.svg'
import rightArrowIcon from '../../../assets/images/home-page/right-arrow.svg'

import { ProductCard } from '../../ui/ProductCard';
import { ProductModalWindow } from '../../catalog-page/ProductModalWindow';

import type { Product } from '../../../utils/structures.ts';

interface SliderProps {
    nameClass: string,
    title: string,
    description: string,
    data: Product[],
    isLoading: boolean
}

export function Slider({
    nameClass,
    title,
    description,
    data,
    isLoading
}: SliderProps) {
    const isBestsellers = (title === 'Хиты продаж');
    const isNovelties = (title === 'Новинки');

    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    const getCard = (i: number) => data[i % data.length];

    const [leftIndex, setLeftIndex] = useState(0);

    const slideLeft = () => {
        setLeftIndex((leftIndex - 1 + data.length) % data.length);
    };

    const slideRight = () => {
        setLeftIndex((leftIndex + 1) % data.length);
    };

    return <div className={nameClass === 'bestsellers'
        ? styles.bestsellers
        : styles.novelties
    }>
        <div className={styles.description}>
            <img src={isBestsellers ? bestsellersIcon : isNovelties ? noveltyIcon : ''} alt='description-icon'/>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
        <div className={styles.cardsWrapper}>
            <img src={leftArrowIcon} className={styles.arrow} onClick={slideLeft} alt='arrow left icon'/>
            <div className={styles.cards}>
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={styles.productCard}></div>
                    ))
                ) : (
                    [leftIndex, leftIndex + 1, leftIndex + 2].map((i) => {
                        const card = getCard(i);
                        return card ? (
                            <ProductCard
                                key={card.id}
                                item={card}
                                setActiveProduct={setActiveProduct}
                                showButton={false}
                            />
                        ) : null;
                    })
                )}
            </div>
            <img src={rightArrowIcon} className={styles.arrow} onClick={slideRight} alt='arrow right icon'/>
        </div>

        {activeProduct && (
            <ProductModalWindow
                activeProduct={activeProduct}
                setActiveProduct={setActiveProduct}
            />
        )}
    </div>
}