import { observer } from 'mobx-react-lite';

import Plus from '../../../assets/images/icons/plus.svg'
import Minus from '../../../assets/images/icons/minus.svg'

import styles from './PlusMinus.module.scss'

import type { Product } from '../../../utils/structures.ts';
import { cartStore } from '../../../stores/CartStore.ts';


interface PlusMinusComponentProps {
    item: Product,
    productQuantity: number
}

function PlusMinusComponent({ item, productQuantity }: PlusMinusComponentProps) {
    return <div className={styles.plusMinusWrapper}>
        <button
            className={styles.plusMinus}
            onClick={() => cartStore.removeFromCart(item.id)}
        >
            <img src={Minus} alt='minus'/>
        </button>
        <p>{productQuantity}</p>
        <button
            className={styles.plusMinus}
            onClick={() => cartStore.addToCart(item)}
        >
            <img src={Plus} alt='plus'/>
        </button>
    </div>
}

export const PlusMinus = observer(PlusMinusComponent);