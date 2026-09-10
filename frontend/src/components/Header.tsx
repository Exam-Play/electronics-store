import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cartLogo from '../assets/images/icons/cart.svg'

import Title from './Title';
import { authStore } from '../stores/AuthStore';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../stores/CartStore';
import { activePageStore } from '../stores/ActivePageStore';

function HeaderComponent(){
    function clickLogout() {
        cartStore.saveCart(authStore.username).finally(() => {
            authStore.logout();
            cartStore.clearCart();
        });
        activePageStore.syncWithPath('');
    }

    const homeLink = (activePageStore.activeItem !== "" ?
        <Link to="/" onClick={() => activePageStore.syncWithPath('home')}>
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
                    className={activePageStore.activeItem === 'catalog' ? 'active' : ''}
                    onClick={() => activePageStore.syncWithPath('catalog')}
                >
                    <div className='item'>
                        <img src={catalogLogo} alt='catalog-logo'/>
                        <p>Каталог</p>
                    </div>
                </Link>

                {authStore.isLoggedIn &&
                <Link
                    to="/cart" 
                    className={activePageStore.activeItem === 'cart' ? 'active' : ''}
                    onClick={() => activePageStore.syncWithPath('cart')}
                >
                    <div className='item'>
                        <img src={cartLogo} alt='cart-logo'/>
                        <p>Корзина</p>
                        {authStore.isLoggedIn && cartStore.cartCount !== 0 &&
                            <div className='amount-goods'>
                                {cartStore.cartCount}
                            </div>
                        }
                    </div>    
                </Link>
                }

                <Link
                    to={authStore.isLoggedIn ? "/" : "/profile"}
                    className={activePageStore.activeItem === 'profile' ? 'active' : ''}
                    onClick={() => {
                        if (authStore.isLoggedIn) {
                            clickLogout();
                        } else {
                            activePageStore.syncWithPath('profile');
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