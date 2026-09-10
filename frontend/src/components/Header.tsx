import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cartLogo from '../assets/images/icons/cart.svg'

import Title from './Title';
import { authStore } from '../stores/AuthStore';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../stores/CartStore';

function HeaderComponent({
    activeItem,
    setActiveItem,
    cartCount
}:{
    activeItem: string,
    setActiveItem: (v:string)=>void,
    cartCount: number
}){
    function clickLogout() {
        cartStore.saveCart(authStore.username).finally(() => {
            authStore.logout();
            cartStore.clearCart();
        });
        setActiveItem('home');
    }

    const homeLink = (activeItem !== "" ?
        <Link to="/" onClick={() => setActiveItem('home')}>
            <Title />
        </Link>
        : <Title />
    )

    return <header>
        <div className='wrapper'>
            {homeLink}

            <div className='items'>
                <Link
                    to="/catalog"
                    className={(activeItem === 'catalog' && authStore.isLoggedIn) ? 'active' : ''}
                    onClick={() => authStore.isLoggedIn ? setActiveItem('catalog') : setActiveItem('profile')}
                >
                    <div className='item'>
                        <img src={catalogLogo} alt='catalog-logo'/>
                        <p>Каталог</p>
                    </div>    
                </Link>

                {authStore.isLoggedIn &&
                <Link
                    to="/cart" 
                    className={activeItem === 'cart' ? 'active' : ''}
                    onClick={() => setActiveItem('cart')}
                >
                    <div className='item'>
                        <img src={cartLogo} alt='cart-logo'/>
                        <p>Корзина</p>
                        {authStore.isLoggedIn && cartCount !== 0 &&
                            <div className='amount-goods'>
                                {cartCount}
                            </div>
                        }
                    </div>    
                </Link>
                }

                <Link
                    to={authStore.isLoggedIn ? "/" : "/profile"}
                    className={activeItem === 'profile' ? 'active' : ''}
                    onClick={() => {
                        if (authStore.isLoggedIn) {
                            clickLogout();
                        } else {
                            setActiveItem('profile');
                        }
                    }}
                >
                    <div className='item'>
                        <img src={profileLogo} alt='profile-logo'/>
                        <p>{authStore.isLoggedIn ? "Выйти" : "Войти"}</p>
                    </div>
                </Link>
            </div>
        </div>
    </header>
}

export const Header = observer(HeaderComponent);