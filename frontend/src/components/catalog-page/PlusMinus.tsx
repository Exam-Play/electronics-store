import Plus from '../../assets/images/icons/plus.svg'
import Minus from '../../assets/images/icons/minus.svg'

import type { Product } from '../../utils/structures';
import { cartStore } from '../../stores/CartStore';
import { observer } from 'mobx-react-lite';

interface PlusMinusComponentProps {
    item: Product,
    productQuantity: number
}

function PlusMinusComponent({ item, productQuantity }: PlusMinusComponentProps) {
    return <div>
        <button
            className='plus-minus'
            onClick={() => cartStore.removeFromCart(item.id)}
        >
            <img src={Minus} alt='minus'/>
        </button>
        <p>{productQuantity}</p>
        <button
            className='plus-minus'
            onClick={() => cartStore.addToCart(item)}
        >
            <img src={Plus} alt='plus'/>
        </button>
    </div>
}

export const PlusMinus = observer(PlusMinusComponent);