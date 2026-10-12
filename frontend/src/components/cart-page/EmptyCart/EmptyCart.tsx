import { useNavigate } from 'react-router-dom';

import styles from './EmptyCart.module.scss'

import EmptyCartImage from "../../../assets/images/backgrounds/empty-cart.svg"

export function EmptyCart() {
    const navigate = useNavigate();

    return <div className={styles.emptyCart}>
        <div className={styles.illustration}>
            <img src={EmptyCartImage} alt="empty cart"/>
        </div>
        <h1>Пока пусто</h1>
        <p>Ознакомьтесь с новинками и хитами на главной<br />или найдите нужное в каталоге</p>
        <div className={styles.buttons}>
            <button
                className={`button-blue-template ${styles.buttonBlueTemplate}`}
                onClick={() => navigate('/catalog')}
            >
                <span>Перейти в каталог</span>
            </button>
            <button
                className={`button-blue-template ${styles.buttonBlueTemplate} ${styles.btnLink}`}
                onClick={() => navigate('/')}
            >
                <span>Главная страница</span>
            </button>
        </div>
    </div>
}