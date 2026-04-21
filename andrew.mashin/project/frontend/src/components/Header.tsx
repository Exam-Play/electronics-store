import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cartLogo from '../assets/images/icons/cart.svg'

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
    function clickLogout() {
        fetch("http://127.0.0.1:8080/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data && isLoggedIn) {
                console.log("Сессия завершена");
                setIsLoggedIn(false);
                setActiveItem('home');
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }

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
                    <img src={cartLogo} alt='cart-logo'/>
                    <p>Корзина</p>
                </Link>
                }

                <Link
                    to={isLoggedIn ? "/" : "/profile"}
                    className={activeItem === 'profile' ? 'active' : ''}
                    onClick={() => (isLoggedIn) ? clickLogout() : null}
                >
                    <img src={profileLogo} alt='profile-logo'/>
                    <p>{isLoggedIn ? "Выйти" : "Войти"}</p>
                </Link>
            </div>
        </div>
    </header>
}

export default Header;