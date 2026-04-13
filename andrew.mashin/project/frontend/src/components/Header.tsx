import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cardLogo from '../assets/images/icons/card.svg'

import Title from './Title';

function Header() {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname.slice(1));

    return <header>
        <div className='wrapper'>
            <Link to="/" onClick={() => setActive('home')}>
                <Title />
            </Link>

            <div className='items'>
                <Link
                    to="/catalog"
                    className={active === 'catalog' ? 'active' : ''}
                    onClick={() => setActive('catalog')}
                >
                    <img src={catalogLogo} alt='catalog-logo'/>
                    <p>Каталог</p>
                </Link>

                {true && // Здесь условие для отображения корзины, например, если пользователь авторизован
                <Link
                    to="/cart" 
                    className={active === 'cart' ? 'active' : ''}
                    onClick={() => setActive('cart')}
                >
                    <img src={cardLogo} alt='cart-logo'/>
                    <p>Корзина</p>
                </Link>
                }

                <Link
                    to="/profile"
                    className={active === 'profile' ? 'active' : ''}
                    onClick={() => setActive('profile')}
                >
                    <img src={profileLogo} alt='profile-logo'/>
                    <p>Войти</p>
                </Link>
            </div>
        </div>
    </header>
}

export default Header;