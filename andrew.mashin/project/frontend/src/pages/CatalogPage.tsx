import { useState, useEffect } from "react";
import ProductCard from "../components/catalog-page/ProductCard";

import leftArrowIcon from '../assets/images/home-page/left-arrow.svg'
import rightArrowIcon from '../assets/images/home-page/right-arrow.svg'

import '../styles/catalogStyle.scss';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    isBestseller: boolean;
    isNovelty: boolean;
}

function getPages(current: number, total: number): (number | '...')[] {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
        return [1, 2, 3, '...', total];
    }

    if (current >= total - 2) {
        return [1, '...', total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
}

function CatalogPage() {
    const [active, setActive] = useState("Новые");
    const [cards, setCards] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const countOfPages = Math.ceil(cards.length / 9);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = getPages(currentPage, countOfPages);

    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const currentCards = cards.slice(startIndex, endIndex);

    useEffect(() => {
        fetch("http://127.0.0.1:8080/goods", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data: Product[]) => {
            setCards(data.map((item) => item));
        })
        .catch(error => console.error('Ошибка:', error))
        .finally(() => setIsLoading(false));
    }, []);

    return <div className="catalog">
        <h1>Каталог товаров</h1>

        <div className="sorting">
            {["Новые","Популярные","Подешевле","Подороже"].map(item => (
                <div
                    key={item}
                    className={active === item ? "active" : ""}
                    onClick={() => setActive(item)}
                >
                    <span>{item}</span>
                </div>
            ))}
        </div>

        <div className="wrapper">
            <div className="catalog-goods">
                {isLoading
                    ? Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="product-card"></div>
                    ))
                    : currentCards.map(item => <ProductCard key={item.id} item={item} />)
                }
            </div>

            <div className="filter">
                
            </div>
        </div>

        <div className="pagination">
            {currentPage > 1 && (
                <img
                    src={leftArrowIcon}
                    className="arrow"
                    alt="arrow left icon"
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            )}

            {pages.map((page, i) =>
                page === '...'
                ? <div key={`dots-${i}`} className="pagination-item dots" onClick={
                    () => setCurrentPage(i === 1 ? 1 : countOfPages)
                }><span>…</span></div>
                : <div
                    key={page}
                    className={`pagination-item ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    <span>{page}</span>
                </div>
            )}

            {currentPage < countOfPages && (
                <img
                    src={rightArrowIcon}
                    className="arrow"
                    alt="arrow right icon"
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            )}
        </div>
    </div>
}

export default CatalogPage;