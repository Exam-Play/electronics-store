import { useState, useEffect, useMemo } from "react";

import styles from './CatalogPage.module.scss'

import { Pagination } from "../../components/catalog-page/Pagination";
import { Filter } from "../../components/catalog-page/Filter";
import { ProductCard } from "../../components/ui/ProductCard";
import { ProductModalWindow } from "../../components/catalog-page/ProductModalWindow";

import type { Product, FilterState } from '../../utils/structures.ts';
import { filterProducts, getMaxPrice, getMinPrice, getPages, sortProducts } from "../../utils/functions.ts";

interface CatalogPageProps {
    cards: Product[],
    isLoading: boolean
}

export function CatalogPage({ cards, isLoading }: CatalogPageProps){
    const [filters, setFilters] = useState<FilterState>({
        priceMin: 0,
        priceMax: 999999,
        categories: new Set(),
        colors: new Set()
    });

    const [activeSort, setActiveSort] = useState("");
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const processedCards = useMemo(() => {
        const filtered = filterProducts(cards, filters);
        return sortProducts(activeSort, filtered);
    }, [cards, filters, activeSort]);

    const countOfPages = Math.ceil(processedCards.length / 9);
    const pages = getPages(currentPage, countOfPages);

    const minPrice = useMemo(() => getMinPrice(cards), [cards]);
    const maxPrice = useMemo(() => getMaxPrice(cards), [cards]);

    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const currentCards = processedCards.slice(startIndex, endIndex);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveProduct(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return <div className={styles.catalog}>
        <h1>Каталог товаров</h1>

        <div className={styles.sorting}>
            {["Новые", "Популярные", "Подешевле", "Подороже"].map(item => (
                <div
                    key={item}
                    className={activeSort === item ? styles.active : ""}
                    onClick={() => {
                        setActiveSort(prev => prev === item ? "" : item);
                    }}
                >
                    <span>{item}</span>
                </div>
            ))}
        </div>

        <div className={styles.wrapper}>
            <div className={styles.catalogGoods}>
                {currentCards.length === 0 ?
                    <h1 style={{position: "absolute", left: "33%", top: "33%"}}>Товары не найдены</h1>
                : null}
                {isLoading
                    ? Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className={styles.productCard}></div>
                    ))
                    : currentCards.map(item => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            setActiveProduct={setActiveProduct}
                        />
                    ))
                }
            </div>

            <Filter
                MIN={minPrice}
                MAX={maxPrice}
                onFilter={setFilters}
            />
        </div>

        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            countOfPages={countOfPages}
            pages={pages}
        />

        {activeProduct && (
            <ProductModalWindow
                activeProduct={activeProduct}
                setActiveProduct={setActiveProduct}
            />
        )}
    </div>
}