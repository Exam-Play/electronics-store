import { Routes, Route, Outlet } from 'react-router-dom'
import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';

import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RegisterPage, LoginPage } from './pages/AuthPages';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import './stores/RootStore';

import { API_URL } from './utils/api';
import type { Product } from './utils/structures';

function MainLayout() {
    return (
        <>
            <Header />
            <main><Outlet /></main>
            <Footer />
        </>
    );
}

function AppComponent() {
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

    return (
        <Routes>
            <Route element={<MainLayout />}>
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

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export const App = observer(AppComponent);