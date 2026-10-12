import styles from './Footer.module.scss'

import mobileLogo from '../../../assets/images/icons/mobile.svg'

import vkLogo from '../../../assets/images/social icons/vk.svg'
import telegramLogo from '../../../assets/images/social icons/telegram.svg'
import whatsappLogo from '../../../assets/images/social icons/whatsapp.svg'

export function Footer() {
    const year = new Date().getFullYear();

    return <footer>
        <div className={styles.wrapper}>
            <div className={styles.aboutCompany}>
                <div>
                    <h2>Gadget Hub</h2>
                    <p>Магазин надежных товаров</p>
                </div>
                <div>&copy; {year} ООО "Гаджет Хаб". Все права защищены</div>
            </div>
            
            <div className={styles.phone}>
                <a href="tel:+79218619844" rel='noreferrer' target='_blank'>
                    <img src={mobileLogo} alt="mobile-logo"/>
                    <h2>+7 (921) 861-98-44</h2>
                </a>
            </div>

            <div className={styles.socialMedia}>
                <a href="https://vk.com/examplay_youtube" rel='noreferrer' target='_blank'>
                    <img src={vkLogo} alt='vkontakte'/>
                </a>
                <a href="https://t.me/examplay_youtube" rel='noreferrer' target='_blank'>
                    <img src={telegramLogo} alt='telegram'/>
                </a>
                <a href="https://wa.me/79218619844" rel='noreferrer' target='_blank'>
                    <img src={whatsappLogo} alt='whatsapp'/>
                </a>
            </div>
        </div>    
    </footer>
}