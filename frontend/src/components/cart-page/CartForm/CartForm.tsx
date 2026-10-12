import { useState } from "react";
import type React from "react";

import styles from "./CartForm.module.scss";

import { CheckBox } from "../../ui/CheckBox";
import { SelectItem } from "../SelectItem";
import type { ProductCart } from "../../../utils/structures.ts";
import type { Product } from "../../../utils/structures.ts";
import { authStore } from "../../../stores/AuthStore.ts";
import { API_URL } from "../../../utils/api.ts";
import { observer } from "mobx-react-lite";

import { InputMask } from "@react-input/mask";

interface CartFormProps {
    cards: Product[],
    setThanks: (v:string) => void,
    cartItems: ProductCart[]
}

function CartFormComponent({ cards, setThanks, cartItems }: CartFormProps) {
    const [delivery, setDelivery] = useState("pickup");
    const [isError, setIsError] = useState('');

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const order_id = new Date().toISOString().replace(/\D/g, '').slice(6, 12);

        const tel = formData.get('tel')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const address = formData.get('address')?.toString() || '';
        const payment = formData.get('payment')?.toString() || '';
        const packaging = formData.get('packaging') === 'on';

        if (cartItems.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' }); return;
        }
        if (!tel) {
            setIsError('empty-tel');
            return;
        }
        if (tel.replace(/\D/g, '').length !== 11) {
            setIsError('invalid-tel');
            return;
        }
        if (!email) {
            setIsError('empty-email');
            return;
        }
        if (delivery === 'delivery' && !address) {
            setIsError('empty-address');
            return;
        }
        if (!payment) {
            setIsError('empty-payment');
            return;
        }
        
        fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id,
                username: authStore.username,
                tel,
                email,
                address: delivery === 'delivery' ? address : null,
                cart: cartItems.map(i => ({
                    id: i.id,
                    name: i.name,
                    quantity: i.quantity,
                    price: cards.find(c => c.id === i.id)?.price ?? 0
                })),
                delivery,
                payment,
                packaging
            })
        })
        .then(res => {
            if (!res.ok) { setIsError('server'); return; }
            return res.json();
        })
        .then(data => {
            if (data?.success) {
                setIsError('');
                setThanks(order_id);
            }
        })
        .catch(() => setIsError('server'));
    }
    
    return <form className={styles.orderForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
            <div className="input-template">
                <label htmlFor='tel' className='star'>Телефон</label>
                <InputMask
                    id='tel'
                    name='tel'
                    autoComplete="tel"
                    type="tel"
                    mask="+_ (___) ___-__-__"
                    replacement={{ _: /\d/ }}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    style={isError === 'empty-tel' || isError === 'invalid-tel'
                         ? { outline: '1px #FF60C3 solid' } : {}}
                />
            </div>

            <div className="input-template">
                <label htmlFor='email' className='star'>E-mail</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete="email"
                    placeholder="example@mail.com"
                    style={isError === 'empty-email' ? { outline: '1px #FF60C3 solid' } : {}}
                />
            </div>
        </div>

        <div className={styles.deliveryGroup}>
            <label className={styles.radioItem}>
                <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={delivery === "pickup"}
                    onChange={() => setDelivery("pickup")}
                />
                Самовывоз
            </label>
            <label className={styles.radioItem}>
                <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={delivery === "delivery"}
                    onChange={() => setDelivery("delivery")}
                />
                Доставка
            </label>
        </div>

        {delivery === "delivery" && (
            <div className={`input-template ${styles.delivery}`}>
                <label htmlFor="address" className='star'>Адрес доставки</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    style={isError === 'empty-address' ? { outline: '1px #FF60C3 solid' } : {}}
                />
            </div>
        )}

        <SelectItem label="Способ оплаты" name="payment" isError={isError}/>

        <CheckBox title="Нужна упаковка" name="packaging" transition={false}/>

        <button className={`button-blue-template ${styles.buttonBlueTemplate}`}>
            <span>Оформить заказ</span>
        </button>
    </form>
}

export const CartForm = observer(CartFormComponent);