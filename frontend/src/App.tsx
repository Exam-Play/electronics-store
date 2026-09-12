import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";

import Footer from './components/Footer';

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import { LoginPage } from './pages/LoginPage';

import type { Product } from './utils/structures';
import { observer } from 'mobx-react-lite';
import { Header } from './components/Header';

import './stores/RootStore';
import { API_URL } from './utils/api';
import { RegisterPage } from './pages/RegisterPage';

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

    if (!["/", "/catalog", "/cart", "/login", "/register"].includes(location.pathname)) {
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
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />
                </Routes>
            </main>
            
            <Footer />
        </>
    );
}

export const App = observer(AppComponent);