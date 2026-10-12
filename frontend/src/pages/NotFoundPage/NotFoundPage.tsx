import { Link } from 'react-router-dom';

import Title from '../../components/ui/Title.tsx';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
    return <div className={styles.notFoundPage}>
        <Title />

        <h1>404</h1>
        <h2>Такой страницы нет 😥</h2>

        <Link to='/' className={styles.homeLink}>
            Вернуться на главную
        </Link>
    </div>
}