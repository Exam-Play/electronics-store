import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'
import cartLogo from '../assets/images/icons/cart.svg'

import Title from './Title';
import { ProfileDropdown } from './ProfileDropdown';

import { authStore } from '../stores/AuthStore';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../stores/CartStore';
import { activePageStore } from '../stores/ActivePageStore';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

function HeaderComponent(){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const triggerRef = useRef<HTMLAnchorElement>(null);

    function clickLogout() {
        cartStore.saveCart(authStore.username).finally(() => {
            authStore.logout();
            cartStore.clearCart();
        });
        setDropdownOpen(false);
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

                <div style={{ position: 'relative', borderRadius: '8px' }}
                    className={(activePageStore.activeItem === 'login' || isDropdownOpen) ? 'active' : ''}
                >
                    <Link
                        ref={triggerRef}
                        to={authStore.isLoggedIn ? "#" : "/login"}
                        onClick={(e) => {
                            if (authStore.isLoggedIn) {
                                e.preventDefault();
                                setDropdownOpen(prev => !prev);
                            } else {
                                activePageStore.syncWithPath('login');
                            }
                        }}
                    >
                        <div className='item'>
                            <img src={profileLogo} alt='profile-logo'/>
                            <p>
                                {authStore.isLoggedIn ? authStore.username : "Войти"}
                                {authStore.isLoggedIn && <ChevronDown size={19} />}
                            </p>
                        </div>
                    </Link>

                    {isDropdownOpen && (
                        <ProfileDropdown
                            onClose={() => setDropdownOpen(false)}
                            onLogout={clickLogout}
                            excludeRef={triggerRef}
                        />
                    )}
                </div>
            </div>
        </div>
    </header>
}

export const Header = observer(HeaderComponent);