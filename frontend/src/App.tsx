import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";

import Footer from './components/Footer';

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage';

import type { Product } from './utils/structures';
import { observer } from 'mobx-react-lite';
import { Header } from './components/Header';

import './stores/RootStore';
import { API_URL } from './utils/api';

function AppComponent() {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/goods`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((data: Product[]) => setCards(data))
        .catch(error => console.error('Ошибка:', error))
        .finally(() => setIsLoading(false));
    }, []);

    if (!["/", "/catalog", "/cart", "/profile"].includes(location.pathname)) {
        return <NotFoundPage />;
    }

    return (
        <>
            <Header />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage
                            data={cards}
                            isLoading={isLoading}
                        />}
                    />

                    <Route
                        path="/catalog"
                        element={
                            <CatalogPage 
                                cards={cards} 
                                setCards={setCards} 
                                isLoading={isLoading}
                            />
                        }
                    />

                    <Route
                        path="/cart"
                        element={<CartPage
                            cards={cards}
                        />}
                    />

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />
                </Routes>
            </main>
            
            <Footer />
        </>
    );
}

export const App = observer(AppComponent);