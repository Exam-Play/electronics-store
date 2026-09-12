import { itemText } from '../../utils/functions';

type Order = {
    id: string | number;
    date: string;
    total: number;
    items: { quantity: number }[];
};

export function HistoryTab({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <div className="emptyCart">
                <h2>История пуста</h2>
                <p>Вы ещё не совершали покупок</p>
            </div>
        );
    }

    return (
        <div className="history-cart-content">
            {orders.map(order => {
                const totalCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                return <div key={order.id} className="order-item">
                    <p>№{order.id} от {order.date}</p>
                    <p>{totalCount} {itemText(totalCount)}</p>
                    <p>{order.total} ₽</p>
                </div>
            })}
        </div>
    );
}