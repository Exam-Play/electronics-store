import { useState, useEffect, useMemo } from "react";

import '../styles/catalogStyle.scss';

import Pagination from "../components/catalog-page/Pagination";
import Filter from "../components/catalog-page/Filter";
import ProductCard from "../components/catalog-page/ProductCard";
import ProductModalWindow from "../components/catalog-page/ProductModalWindow";

import type { Product } from '../utils/structures';
import type { FilterState } from "../utils/structures";

import { filterProducts, getMaxPrice, getMinPrice, getPages, sortProducts } from "../utils/functions";

function CatalogPage({
    cards,
    setCards,
    isLoading
}:{
    cards: Product[],
    setCards: React.Dispatch<React.SetStateAction<Product[]>>,
    isLoading: boolean
}){
    const [filters, setFilters] = useState<FilterState>({
        priceMin: 0,
        priceMax: 999999,
        categories: new Set(),
        colors: new Set()
    });

    const filteredCards = useMemo(
        () => filterProducts(cards, filters),
        [cards, filters]
    );

    const [originalCards, setOriginalCards] = useState<Product[]>([]);
    useEffect(() => {
        if (cards.length > 0 && originalCards.length === 0) {
            setOriginalCards([...cards]);
        }
    }, [cards, originalCards]);

    const [activeSort, setActiveSort] = useState("");
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const countOfPages = Math.ceil(filteredCards.length / 9);
    const pages = getPages(currentPage, countOfPages);

    const minPrice = useMemo(() => getMinPrice(cards), [cards]);
    const maxPrice = useMemo(() => getMaxPrice(cards), [cards]);

    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const currentCards = filteredCards.slice(startIndex, endIndex);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveProduct(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return <div className="catalog">
        <h1>Каталог товаров</h1>

        <div className="sorting">
            {["Новые", "Популярные", "Подешевле", "Подороже"].map(item => (
                <div
                    key={item}
                    className={activeSort === item ? "active" : ""}
                    onClick={() => {
                        setCards(sortProducts(activeSort === item ? "" : item, originalCards));
                        setActiveSort(prev => prev === item ? "" : item);
                    }}
                >
                    <span>{item}</span>
                </div>
            ))}
        </div>

        <div className="wrapper">
            <div className="catalog-goods">
                {currentCards.length === 0 ?
                    <h1 style={{position: "absolute", left: "33%", top: "33%"}}>Товары не найдены</h1>
                : null}
                {isLoading
                    ? Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="product-card"></div>
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

export default CatalogPage;