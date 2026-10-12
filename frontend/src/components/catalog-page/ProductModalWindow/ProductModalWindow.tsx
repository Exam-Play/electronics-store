import { useState } from 'react';

import styles from './ProductModalWindow.module.scss'
import cardStyles from '../../ui/ProductCard/ProductCard.module.scss'

import closeCross from '../../../assets/images/icons/cross.svg'
import ratingIcon from '../../../assets/images/icons/rating.svg'

import { ButtonCard } from '../ButtonCard';

import type { Product } from '../../../utils/structures.ts';

interface ProductModalWindowProps {
    activeProduct: Product,
    setActiveProduct: (product: Product | null) => void
}

export function ProductModalWindow({ activeProduct, setActiveProduct }: ProductModalWindowProps){
    const [loadedId, setLoadedId] = useState<number | null>(null);
    const loaded = loadedId === activeProduct?.id;

    const ratingBlock = (activeProduct?.rating !== 0.0) ? 
        <div className={cardStyles.ratingWrapper} style={{ margin: "10px 0" }}>
            <img src={ratingIcon} alt='rating icon'/>
            <span>{activeProduct?.rating}</span>
        </div>
    : null;

    const getImageUrl = (id: number) => {
        return new URL(`../../../assets/images/goods_increased/image_${id}.png`, import.meta.url).href;
    };
    
    return <div className={styles.productWindow}>
        <div className={styles.wrapper}>
            <button className={styles.closeButton} onClick={() => setActiveProduct(null)}>
                <img src={closeCross} alt="close cross"/>
            </button>

            <div className={styles.content}>
                <div className={styles.infoWrapper}>
                    <div className={styles.imgWrapper}>
                        <div className={cardStyles.textWrapper}>
                            {activeProduct?.isNovelty ?
                            <div className={`${cardStyles.label} ${cardStyles.novelty}`}>
                                <p>Новинка</p>
                            </div>
                            : null}

                            {activeProduct?.isBestseller ?
                            <div className={`${cardStyles.label} ${cardStyles.bestseller}`}>
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
                            onLoad={() => setLoadedId(activeProduct?.id ?? null)}
                        />
                    </div>
                    <div className={styles.info}>
                        <h1>{activeProduct?.name}</h1>
                        {ratingBlock}
                        <p>{activeProduct?.description}</p>
                        <h2>Характеристики:</h2>
                        <ul>
                            {activeProduct?.characteristics.map((item, index) => (
                                <li key={index}>
                                    <span className={styles.label}>{item.label}</span>
                                    <hr/>
                                    <span className={styles.value}>{item.value}</span>
                                </li>
                            ))}
                        </ul>
                        <h1 className={styles.price}>{activeProduct?.price} ₽</h1>
                    </div>
                </div>

                <ButtonCard item={activeProduct} />
            </div>
        </div>
    </div>
}