import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import styles from "./Header.module.scss"

import catalogLogo from '../../../assets/images/icons/catalog.svg'
import profileLogo from '../../../assets/images/icons/profile.svg'
import cartLogo from '../../../assets/images/icons/cart.svg'

import Title from '../../ui/Title.tsx';
import { ProfileDropdown } from '../../auth/ProfileDropdown';

import { authStore } from '../../../stores/AuthStore.ts';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../../stores/CartStore.ts';
import { activePageStore } from '../../../stores/ActivePageStore.ts';



function HeaderComponent(){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const triggerRef = useRef<HTMLAnchorElement>(null);

    function clickLogout() {
        cartStore.saveCart(authStore.username).finally(() => {
            void authStore.logout();
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
        <div className={styles.wrapper}>
            {homeLink}

            <div className={styles.items}>
                <Link
                    to="/catalog"
                    className={activePageStore.activeItem === 'catalog' ? styles.active : ''}
                    onClick={() => activePageStore.syncWithPath('catalog')}
                >
                    <div className={styles.item}>
                        <img src={catalogLogo} alt='catalog-logo'/>
                        <p>Каталог</p>
                    </div>
                </Link>

                {authStore.isLoggedIn &&
                <Link
                    to="/cart" 
                    className={activePageStore.activeItem === 'cart' ? styles.active : ''}
                    onClick={() => activePageStore.syncWithPath('cart')}
                >
                    <div className={styles.item}>
                        <img src={cartLogo} alt='cart-logo'/>
                        <p>Корзина</p>
                        {authStore.isLoggedIn && cartStore.cartCount !== 0 &&
                            <div className={styles.amountGoods}>
                                {cartStore.cartCount}
                            </div>
                        }
                    </div>    
                </Link>
                }

                <div className={`${styles.profileWrapper}
                    ${(activePageStore.activeItem === 'login' || isDropdownOpen) ? styles.active : ''}`}
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
                        <div className={styles.item}>
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