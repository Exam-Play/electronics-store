import { useState, useEffect } from "react";

import closeCross from '../assets/images/icons/cross.svg'
import CartIcon from '../assets/images/icons/cart_white.svg';
import ratingIcon from '../assets/images/icons/rating.svg'

import '../styles/catalogStyle.scss';
import Pagination from "../components/catalog-page/Pagination";
import Filter from "../components/catalog-page/Filter";
import ProductCard from "../components/catalog-page/ProductCard";

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    isBestseller: boolean;
    isNovelty: boolean;
    description: string;
    characteristics: {
        label: string;
        value: string
    }[];
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
    const [activeSort, setActiveSort] = useState("");
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [cards, setCards] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [activeProduct]);

    const countOfPages = Math.ceil(cards.length / 9);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = getPages(currentPage, countOfPages);

    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const currentCards = cards.slice(startIndex, endIndex);

    const ratingBlock = (activeProduct?.rating !== 0.0) ? 
        <div className="rating-wrapper">
            <img src={ratingIcon} alt='rating icon'/>
            <span>{activeProduct?.rating}</span>
        </div>
    : null;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveProduct(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
                    className={activeSort === item ? "active" : ""}
                    onClick={() => {
                            item === activeSort ? setActiveSort("") : setActiveSort(item)
                        }
                    }
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
                    : currentCards.map(item => {
                        return <ProductCard
                            key={item.id}
                            item={item}
                            setActiveProduct={setActiveProduct}
                        />;
                    })
                }
            </div>

            <Filter/>
        </div>

        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            countOfPages={countOfPages}
            pages={pages}
        />

        {activeProduct && (
        <div className="product-window">
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
                                    ? require(`../assets/images/goods_increased/image_${activeProduct.id}.png`)
                                    : null}
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
                    <button className="button-blue-template add-to-cart">
                        <img src={CartIcon} alt="cart icon"/>
                        <span>В корзину</span>
                    </button>
                </div>
            </div>
        </div>
        )}
    </div>
}

export default CatalogPage;