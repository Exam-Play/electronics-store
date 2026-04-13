import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
	const location = useLocation();

	if (!["/", "/catalog", "/cart", "/profile"].includes(location.pathname)) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/catalog" element={<CatalogPage />}></Route>
				<Route path="/cart" element={<CartPage />}></Route>
				<Route path="/profile" element={<LoginPage />}></Route>
			</Routes>

			<Footer />
		</>
	);
}

export default App;