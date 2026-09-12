import { useNavigate, Link } from 'react-router-dom';
import '../styles/profileStyle.scss';
import { authStore } from "../stores/AuthStore";
import { observer } from "mobx-react-lite";
import { API_URL } from "../utils/api";
import { activePageStore } from "../stores/ActivePageStore";
import { AuthForm } from "../components/AuthForm";

function RegisterPageComponent() {
    const navigate = useNavigate();

    async function handleRegister(values: Record<string, string>) {
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: values.login, password: values.password })
            });

            if (res.status === 409) return 'conflict' as const;
            if (!res.ok) return 'incorrect-data' as const;

            authStore.login(values.login);
            navigate('/');
            activePageStore.syncWithPath('home');
            return null;
        } catch {
            return 'incorrect-data' as const;
        }
    }

    return <div className='profile'>
        <h1>Регистрация</h1>
        <div className='login_block'>
            <AuthForm
                fields={[
                    { name: 'login', label: 'Логин', type: 'text', minLength: 4 },
                    { name: 'password', label: 'Пароль', type: 'password', minLength: 6 },
                    { name: 'confirmPassword', label: 'Повторите пароль', type: 'password', minLength: 6 },
                ]}
                submitLabel="Зарегистрироваться"
                onSubmit={handleRegister}
                footer={<Link to="/login" className="registration">Уже есть аккаунт?</Link>}
            />
        </div>
    </div>
}

export const RegisterPage = observer(RegisterPageComponent);