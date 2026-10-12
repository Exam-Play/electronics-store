import { useNavigate, Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import styles from './RegisterPage.module.scss';

import { authStore } from "../../stores/AuthStore.ts";
import { activePageStore } from "../../stores/ActivePageStore.ts";
import { API_URL } from "../../utils/api.ts";

import { AuthForm } from '../../components/auth/AuthForm'

function LoginPageComponent() {
    const navigate = useNavigate();

    async function handleLogin(values: Record<string, string>) {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: values.login, password: values.password })
            });

            if (!res.ok) return 'incorrect-data' as const;

            const data = await res.json();
            if (data === true) {
                authStore.login(values.login);
                navigate('/');
                activePageStore.syncWithPath('home');
                return null;
            }
            return 'incorrect-data' as const;
        } catch {
            return 'incorrect-data' as const;
        }
    }

    return <div className={styles.profile}>
        <h1>Добро пожаловать!</h1>
        <div className={styles.loginBlock}>
            <AuthForm
                fields={[
                    { name: 'login', label: 'Логин', type: 'text', minLength: 4 },
                    { name: 'password', label: 'Пароль', type: 'password', minLength: 6 },
                ]}
                submitLabel="Войти"
                onSubmit={handleLogin}
                footer={<Link to="/register" className={styles.registration}>Нет аккаунта? Зарегистрироваться</Link>}
            />
        </div>
    </div>
}

export const LoginPage = observer(LoginPageComponent);