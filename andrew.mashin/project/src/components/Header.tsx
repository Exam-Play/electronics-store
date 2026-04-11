import { Link, useLocation } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cardLogo from '../assets/images/icons/card.svg'

import Title from './Title';

function Header() {
    const location = useLocation();

    const showCart = location.pathname === '/catalog' || location.pathname === '/cart';

    return <header>
        <div className='wrapper'>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <Title />
            </Link>

            <div className='items'>
                <Link to="/catalog" className={location.pathname === '/catalog' ? 'active' : ''}>
                    <img src={catalogLogo} alt='catalog-logo'/>
                    <p>Каталог</p>
                </Link>

                {showCart && 
                <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
                    <img src={cardLogo} alt='cart-logo'/>
                    <p>Корзина</p>
                </Link>
                }

                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                    <img src={profileLogo} alt='profile-logo'/>
                    <p>Войти</p>
                </Link>
            </div>   
        </div>
    </header>
}

export default Header;