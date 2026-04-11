import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'

import Title from './Title';


function Header() {
    const [active, setActive] = useState('home');

    return <header>
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

            <Link
                to="/profile"
                className={active === 'profile' ? 'active' : ''}
                onClick={() => setActive('profile')}
            >
                <img src={profileLogo} alt='profile-logo'/>
                <p>Войти</p>
            </Link>
        </div>    
    </header>
}

export default Header;