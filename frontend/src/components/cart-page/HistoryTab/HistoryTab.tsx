import styles from './HistoryTab.module.scss'

import { itemText } from '../../../utils/functions.ts';
import type { Order } from "../../../utils/structures.ts";

export function HistoryTab({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <>
                <h2>История пуста</h2>
                <p>Вы ещё не совершали покупок</p>
            </>
        );
    }

    return (
        <div className={styles.historyCartContent}>
            {orders.map(order => {
                const totalCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                return <div key={order.id} className={styles.orderItem}>
                    <p>№{order.id} от {order.date}</p>
                    <p>{totalCount} {itemText(totalCount)}</p>
                    <p>{order.total} ₽</p>
                </div>
            })}
        </div>
    )
}