import closeCross from '../../assets/images/icons/cross.svg'
import ThanksImage from '../../assets/images/backgrounds/thanks_image.svg'
import { cartStore } from '../../stores/CartStore';
import { observer } from 'mobx-react-lite';

function GratitudeComponent({
    thanks,
    setThanks,
    loadOrders
}:{
    thanks: string,
    setThanks: (v:string) => void,
    loadOrders: () => void
}) {
    return <div className="delete-product-window">
        <div className="delete-wrapper thanks-wrapper">
            <button className="close-button"
                onClick={() => {
                    setThanks("");
                    cartStore.clearCart();
                    loadOrders();
                }}
            >
                <img src={closeCross} alt="close cross"/>
            </button>

            <div className='content'>
                <img src={ThanksImage} alt='thanks img'/>
                <h1>Спасибо за заказ!</h1>
                <p>Номер заказа {thanks}.</p>
                <p>Мы свяжемся с вами в течение 10 минут, чтобы уточнить удобное для вас время доставки</p>

                <div className='buttons'>
                    <button className="button-blue-template"
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