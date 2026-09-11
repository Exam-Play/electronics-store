import { makeAutoObservable, reaction, runInAction } from "mobx"
import type { Product, ProductCart } from "../utils/structures";
import { API_URL } from "../utils/api";

class CartStore {
    cartItems: ProductCart[] = [];
    username: string = "";

    constructor() {
        this.username = localStorage.getItem('username') ?? "";

        if (this.username) {
            const saved = localStorage.getItem(`cart_${this.username}`);
            try {
                this.cartItems = saved ? JSON.parse(saved) : [];
            } catch {
                this.cartItems = [];
            }
        }

        makeAutoObservable(this);

        reaction(
            () => this.cartItems,
            (items) => {
                if (this.username) {
                    localStorage.setItem(`cart_${this.username}`, JSON.stringify(items));
                }
            }
        );
    }

    get cartCount() {
        return this.cartItems.reduce((a, b) => a + b.quantity, 0)
    }

    addToCart(item: Product) {
        const existing = this.cartItems.find(i => i.id === item.id);
        if (existing) {
            this.cartItems = this.cartItems.map(i => i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
            return;
        }
        this.cartItems = [...this.cartItems, { id: item.id, name: item.name, quantity: 1 }]
            .sort((a, b) => a.id - b.id);
    }

    removeFromCart(id: number) {
        const existing = this.cartItems.find(i => i.id === id);

        if (!existing) return;
        if (existing.quantity === 1) {
            const resultCart = this.cartItems.filter(i => i.id !== id);

            this.cartItems = resultCart;
            return;
        }

        this.cartItems = this.cartItems.map(i => i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
    }

    removeItem(id: number) {
        this.cartItems = this.cartItems.filter(i => i.id !== id);
    }

    async loadCart(username: string) {
        this.username = username;
        localStorage.setItem('username', username);
        
        try {
            const r = await fetch(`${API_URL}/users/${username}/cart`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await r.json();

            runInAction(() => {
                this.cartItems = data.cart ?? [];
            });
        } catch {
            runInAction(() => this.cartItems = []);
        }
    }

    async saveCart(username: string) {
        try {
            await fetch(`${API_URL}/cart/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, cart: this.cartItems })
            });
            
            runInAction(() => {
                localStorage.removeItem(`cart_${username}`);
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    clearCart() {
        if (this.username) {
            localStorage.removeItem(`cart_${this.username}`);
        }

        this.cartItems = [];
        this.username = "";
    }
}

export const cartStore = new CartStore();