import { Link } from 'react-router-dom';

import catalogLogo from '../assets/images/icons/catalog.svg'
import profileLogo from '../assets/images/icons/profile.svg'

import Title from './Title';

function Header() {
    return <header>
        <Link to="/">
            <Title />
        </Link>
        <div className='items'>
            <Link to="/catalog">
                <img src={catalogLogo} alt='catalog-logo'/>
                <p>Каталог</p>
            </Link>

            <Link to="/profile">
                <img src={profileLogo} alt='profile-logo'/>
                <p>Войти</p>
            </Link>
        </div>    
    </header>
}

export default Header;