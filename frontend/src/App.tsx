import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";

import Footer from './components/Footer';

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage';

import type { Product } from './utils/structures';
import { authStore } from './stores/AuthStore';
import { observer } from 'mobx-react-lite';
import { Header } from './components/Header';

import './stores/RootStore';
import { API_URL } from './utils/api';

function AppComponent() {
    const location = useLocation();

    const [activeItem, setActiveItem] = useState(location.pathname.slice(1));
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
            <Header
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />

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
                        element={authStore.isLoggedIn ?
                            <CatalogPage
                                cards={cards}
                                setCards={setCards}
                                isLoading={isLoading}
                            /> : <Navigate to="/profile" />
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
                        element={<ProfilePage
                            setActiveItem={setActiveItem}
                        />}
                    />
                </Routes>
            </main>
            
            <Footer />
        </>
    );
}

export const App = observer(AppComponent);