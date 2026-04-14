function ProfilePage() {
    return <main className='profile'>
        <h1>Добро пожаловать!</h1>
        <div className='login_block'>
            <form>
                <label htmlFor='login'>Логин</label>
                <input id='login' name='login' type='text'/>

                <label htmlFor='password'>Пароль</label>
                <input id='password' name='password' type='password'/>

                <button type='submit'>Войти</button>
            </form>
        </div>
    </main>
}

export default ProfilePage;