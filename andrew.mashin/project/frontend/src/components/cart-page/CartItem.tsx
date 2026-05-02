import PlusMinus from "../catalog-page/PlusMinus";
import closeCross from '../../assets/images/icons/cross_pink.svg'

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    isBestseller: boolean;
    isNovelty: boolean;
    description: string;
    characteristics: {
        label: string;
        value: string
    }[];
}

function CartItem({
    item,
    cartItems,
    addToCart,
    removeFromCart,
    selected,
    onSelect
}:{
    item: Product,
    cartItems: Product[],
    addToCart: (item: Product) => void,
    removeFromCart: (id: number) => void,
    selected: boolean,
    onSelect: () => void
}) {
    const productQuantity = cartItems.filter(cartItem => cartItem.id === item.id).length;

    return <div className="cart-item">
        <div className="check-with-img">
            <label className="check-item" tabIndex={0}>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onSelect}
                />
                <div className="checkmark"/>
            </label>
            
            <div className="img-wrapper">
                <img
                    src={require(`../../assets/images/goods/image_${item.id}.png`)}
                    alt='product img'
                />
            </div>

            <p className="name">{item.name}</p>
        </div>

        <div className='add-more'>
            <PlusMinus
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                productQuantity={productQuantity}
            />
        </div>

        <h2>{item.price * productQuantity} ₽</h2>

        <button
            className="delete-button"
            onClick={() => {
                const count = cartItems.filter(i => i.id === item.id).length;
                for (let i = 0; i < count; i++) {
                    removeFromCart(item.id);
                }
            }}
        >
            <img src={closeCross} alt="close cross"/>
            <p>Удалить</p>
        </button>
    </div>
}

export default CartItem;