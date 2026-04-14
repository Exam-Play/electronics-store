import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cardLogo from '../assets/images/icons/card.svg'

import Title from './Title';

function Header({
    isLoggedIn,
    setIsLoggedIn,
    activeItem,
    setActiveItem
}:{
    isLoggedIn: boolean,
    setIsLoggedIn: (v:boolean)=>void,
    activeItem: string,
    setActiveItem: (v:string)=>void
}){
    return <header>
        <div className='wrapper'>
            <Link to="/" onClick={() => setActiveItem('home')}>
                <Title />
            </Link>

            <div className='items'>
                <Link
                    to="/catalog"
                    className={activeItem === 'catalog' ? 'active' : ''}
                    onClick={() => setActiveItem('catalog')}
                >
                    <img src={catalogLogo} alt='catalog-logo'/>
                    <p>Каталог</p>
                </Link>

                {isLoggedIn &&
                <Link
                    to="/cart" 
                    className={activeItem === 'cart' ? 'active' : ''}
                    onClick={() => setActiveItem('cart')}
                >
                    <img src={cardLogo} alt='cart-logo'/>
                    <p>Корзина</p>
                </Link>
                }

                <Link
                    to={isLoggedIn ? "/" : "/profile"}
                    className={activeItem === 'profile' ? 'active' : ''}
                    onClick={() => {
                        (!isLoggedIn) ? setActiveItem('profile') : setActiveItem('home');
                        setIsLoggedIn(false);
                    }
                }>
                    <img src={profileLogo} alt='profile-logo'/>
                    <p>{isLoggedIn ? "Выйти" : "Войти"}</p>
                </Link>
            </div>
        </div>
    </header>
}

export default Header;