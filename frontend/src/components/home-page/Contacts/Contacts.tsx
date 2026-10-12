import styles from './Contacts.module.scss'

import phoneIcon from '../../../assets/images/home-page/phone.svg'
import emailIcon from '../../../assets/images/home-page/email.svg'
import locationIcon from '../../../assets/images/home-page/location.svg'

export function Contacts() {
	return (
		<div className={`${styles.section} ${styles.contacts}`}>
			<h1>Работаем 24/7</h1>
			<div className={styles.items}>
				<div className={styles.item}>
					<img src={phoneIcon} alt='phone-icon'/>
					<h2>+7 (921) 861-98-44</h2>
				</div>
				<div className={styles.item}>
					<img src={emailIcon} alt='email-icon'/>
					<h2>gadget@hub.ru</h2>
				</div>
				<div className={styles.item}>
					<img src={locationIcon} alt='location-icon'/>
					<h2>Санкт-Петербург, ул. Барочная, д.7, корпус 2</h2>
				</div>
			</div>
		</div>
	)
}