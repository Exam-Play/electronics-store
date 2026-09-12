import closeCross from '../../assets/images/icons/cross_pink.svg';
import EmptyCart from './EmptyCart';
import CheckBox from '../catalog-page/CheckBox';
import CartItem from './CartItem';
import { CartForm } from './CartForm';
import { cartStore } from '../../stores/CartStore';
import { itemText } from '../../utils/functions';
import type { Product } from '../../utils/structures';

type CartTabProps = {
    cards: Product[];
    uniqueItems: { id: number; name: string; quantity: number }[];
    selectedIds: Set<number>;
    setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
    toggleSelect: (id: number) => void;
    toggleSelectAll: () => void;
    setThanks: (value: string) => void;
};

export function CartTab({
    cards,
    uniqueItems,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    toggleSelectAll,
    setThanks
}: CartTabProps) {
    const selectedItems = cartStore.cartItems.filter(i => selectedIds.has(i.id));
    const finalPrice = selectedItems.reduce((sum, i) => {
        const product = cards.find(c => c.id === i.id);
        return sum + (product?.price ?? 0) * i.quantity;
    }, 0);
    const countGoods = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    if (cartStore.cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div>
            <div className="cart-content">
                <div className="all-buttons">
                    <CheckBox
                        title={"Выбрать все"}
                        checked={selectedIds.size === uniqueItems.length && uniqueItems.length > 0}
                        onChange={toggleSelectAll}
                    />

                    {selectedIds.size === uniqueItems.length &&
                        <button
                            className="delete-button"
                            onClick={() => cartStore.clearCart()}
                        >
                            <img src={closeCross} alt="close cross" />
                            <p>Удалить все</p>
                        </button>
                    }

                    {selectedIds.size > 1 && selectedIds.size < uniqueItems.length &&
                        <button
                            className="delete-button"
                            onClick={() => {
                                selectedIds.forEach((id) => cartStore.removeItem(id));
                                setSelectedIds(new Set());
                            }}
                        >
                            <img src={closeCross} alt="close cross" />
                            <p>Удалить отмеченные</p>
                        </button>
                    }
                </div>

                {uniqueItems.map((item) => {
                    const card = cards.find(p => p.id === item.id);
                    if (!card) return null;

                    return <CartItem
                        key={item.id}
                        card={card}
                        item={item}
                        selected={selectedIds.has(item.id)}
                        onSelect={() => toggleSelect(item.id)}
                    />
                })}

                <h2>{countGoods} {itemText(countGoods)} на {finalPrice} ₽</h2>
            </div>

            <h1>Оформление заказа</h1>

            <div className="cart-content">
                <CartForm
                    cards={cards}
                    setThanks={setThanks}
                    cartItems={selectedItems}
                />
            </div>
        </div>
    );
}