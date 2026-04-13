import profileBackground from '../assets/images/backgrounds/background-login.svg'
import { CSSProperties } from 'react'

function ProfilePage() {
    const styles: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',

        height: '960px',
        backgroundColor: '#E5EEFF',
        backgroundImage: `url(${profileBackground})`,
        backgroundPosition: '0 35px',
        backgroundRepeat: 'no-repeat'
    };

    return <main style={styles}>
        <h1>Добро пожаловать!</h1>
        <div className='login_block'>
            <form>
                <label htmlFor='login'>Логин</label>
                <input id='login' type='text'/>

                <label htmlFor='password'>Пароль</label>
                <input id='password' type='password'/>

                <button type='submit'>Войти</button>
            </form>
        </div>
    </main>
}

export default ProfilePage;