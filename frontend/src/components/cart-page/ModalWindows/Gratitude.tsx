import { observer } from 'mobx-react-lite';

import styles from './ModalWindows.module.scss'

import closeCross from '../../../assets/images/icons/cross.svg'
import ThanksImage from '../../../assets/images/backgrounds/thanks_image.svg'

import { cartStore } from '../../../stores/CartStore.ts';

interface GratitudeComponentProps {
    thanks: string,
    setThanks: (v:string) => void,
    loadOrders: () => void
}

function GratitudeComponent({ thanks, setThanks, loadOrders }: GratitudeComponentProps) {
    return <div className={styles.deleteProductWindow}>
        <div className={`${styles.deleteWrapper} ${styles.thanksWrapper}`}>
            <button className={styles.closeButton}
                onClick={() => {
                    setThanks("");
                    cartStore.clearCart();
                    loadOrders();
                }}
            >
                <img src={closeCross} alt="close cross"/>
            </button>

            <div className={styles.content}>
                <img src={ThanksImage} alt='thanks img'/>
                <h1>Спасибо за заказ!</h1>
                <p>Номер заказа {thanks}.</p>
                <p>Мы свяжемся с вами в течение 10 минут, чтобы уточнить удобное для вас время доставки</p>

                <div className={styles.buttons}>
                    <button className={`button-blue-template ${styles.buttonBlueTemplate}`}
                        onClick={() => {
                            setThanks("");
                            cartStore.clearCart();
                            loadOrders();
                        }
                    }>
                        <span>Ок</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export const Gratitude = observer(GratitudeComponent);