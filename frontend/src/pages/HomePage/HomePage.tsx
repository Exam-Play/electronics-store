import { useMemo } from 'react';

import HomeBanner from '../../assets/images/backgrounds/banner.svg'

import { Slider } from '../../components/home-page/Slider'

import styles from './HomePage.module.scss'

import type { Product } from '../../utils/structures.ts';
import { Advantages } from "../../components/home-page/Advantages";
import { Contacts } from "../../components/home-page/Contacts";

interface HomePageProps {
    data: Product[],
    isLoading: boolean
}

export function HomePage({ data, isLoading }: HomePageProps){
    const bestsellers = useMemo(
        () => data.filter((item) => item.isBestseller),
        [data]
    );
    const novelty = useMemo(
        () => data.filter((item) => item.isNovelty),
        [data]
    );

    return <div className={styles.home}>
        <div className={styles.banner}>
            <img src={HomeBanner} alt='home-banner'/>
        </div>

        <Slider
            nameClass="bestsellers"
            title="Хиты продаж"
            description="Тысячи покупателей уже одобрили эти товары. Самые популярные, проверенные и надежные гаджеты!"
            data={bestsellers}
            isLoading={isLoading}
        />

        <Slider
            nameClass="novelties"
            title="Новинки"
            description="Их только произвели - они уже у нас! Все самое новое и свежее на рынке электроники."
            data={novelty}
            isLoading={isLoading}
        />

        <Advantages />

        <Contacts />
    </div>
}