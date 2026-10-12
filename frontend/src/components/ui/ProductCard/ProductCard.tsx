import { useState } from 'react';

import styles from './ProductCard.module.scss'

import ratingIcon from '../../../assets/images/icons/rating.svg';
import { ButtonCard } from '../../catalog-page/ButtonCard';

import type { Product } from '../../../utils/structures.ts';
import { getImageUrl } from '../../../utils/functions.ts';

interface ProductCardProps {
    item: Product;
    setActiveProduct: (product: Product | null) => void;
    showButton?: boolean;
}

export function ProductCard({
    item,
    setActiveProduct,
    showButton = true,
}: ProductCardProps) {
    const [loaded, setLoaded] = useState(false);

    const showRating = item.rating !== 0;

    return (
        <div className={styles.productCard} style={!showButton ? { height: "auto" } : undefined}>
            <div onClick={() => setActiveProduct(item)}
                style={{ cursor: 'pointer' }}
            >
                <div className="img-wrapper">
                    <div className={styles.textWrapper}>
                        {item.isNovelty && (
                            <div className={`${styles.label} ${styles.novelty}`}>
                                <p>Новинка</p>
                            </div>
                        )}

                        {item.isBestseller && (
                            <div className={`${styles.label} ${styles.bestseller}`}>
                                <p>Хит</p>
                            </div>
                        )}
                    </div>

                    <img
                        src={getImageUrl(item.id)}
                        alt={item.name}
                        style={{
                            opacity: loaded ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                        onLoad={() => setLoaded(true)}
                    />
                </div>

                <h2>{item.price} ₽</h2>
                <p>{item.name}</p>

                {showRating && (
                    <div className={styles.ratingWrapper}>
                        <img src={ratingIcon} alt="Рейтинг" />
                        <span>{item.rating}</span>
                    </div>
                )}
            </div>

            {showButton && <ButtonCard item={item} />}
        </div>
    );
}