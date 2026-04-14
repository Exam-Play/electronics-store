import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProfilePage({
    setIsLoggedIn,
    setActiveItem
}:{
    setIsLoggedIn: (v:boolean)=>void,
    setActiveItem: (v:string)=>void
}){
    const [isErrorLogin, setErrorLogin] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData : FormData = new FormData(e.target);

        fetch("http://127.0.0.1:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formData.get('login'),
                password: formData.get('password')
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data === true) {
                setIsLoggedIn(true);
                navigate('/');
                setActiveItem('home');
                setErrorLogin(false);
            } else {
                setErrorLogin(true);
                setIsLoggedIn(false);
            }
        });
    }

    return <main className='profile'>
        <h1>Добро пожаловать!</h1>
        <div className='login_block'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='login'>Логин</label>
                <input id='login' name='login' type='text'
                    style={(isErrorLogin === true) ? {
                        border: '1px #E6626A solid'
                    } : {border: 'none'}
                }/>

                <label htmlFor='password'>Пароль</label>
                <input id='password' name='password' type='password'
                    style={(isErrorLogin === true) ? {
                        marginBottom: '0',
                        border: '1px #E6626A solid'
                    } : {marginBottom: '30px'}
                }/>

                {(isErrorLogin === true) ? <p>{"Неправильный логин или пароль"}</p> : null}

                <button type='submit'>Войти</button>
            </form>
        </div>
    </main>
}

export default ProfilePage;