import { reaction } from "mobx";

import { authStore } from "./AuthStore";
import { cartStore } from "./CartStore";

class RootStore {
    authStore = authStore;
    cartStore = cartStore;

    constructor() {
        reaction(
            () => this.authStore.username,
            (username) => {
                if (username) this.cartStore.loadCart(username);
                else this.cartStore.clearCart();
            },
            { name: "SyncCartWithAuth" }
        );
    }
}

export const rootStore = new RootStore();