import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from "react";

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage';

function App() {
	const location = useLocation();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeItem, setActiveItem] = useState(location.pathname.slice(1));

	if (!["/", "/catalog", "/cart", "/profile"].includes(location.pathname)) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				activeItem={activeItem}
				setActiveItem={setActiveItem}
			/>

			<Routes>
				<Route path="/" element={<HomePage />}/>
				<Route path="/catalog" element={<CatalogPage />}/>
				<Route path="/cart" element={<CartPage />}/>
				<Route path="/profile" element={<ProfilePage
					setIsLoggedIn={setIsLoggedIn}
					setActiveItem={setActiveItem}
				/>}/>
			</Routes>

			<Footer />
		</>
	);
}

export default App;