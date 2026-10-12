import styles from './Advantages.module.scss'

import rocketIcon from '../../../assets/images/home-page/rocket.svg'
import moneyBackIcon from '../../../assets/images/home-page/money-back.svg'
import certificateIcon from '../../../assets/images/home-page/certificate.svg'

export function Advantages() {
	return (
		<div className={`${styles.section} ${styles.advantages}`}>
			<h1>Преимущества</h1>
			<div className={styles.items}>
				<div className={styles.item}>
					<img src={rocketIcon} alt='rocket-icon'/>
					<h2>Утром заказали, вечером получили</h2>
				</div>
				<div className={styles.item}>
					<img src={moneyBackIcon} alt='money-back-icon'/>
					<h2>С товаром что-то не так? Вернем деньги</h2>
				</div>
				<div className={styles.item}>
					<img src={certificateIcon} alt='certificate-icon'/>
					<h2>Только оригинальные товары</h2>
				</div>
			</div>
		</div>
	)
}