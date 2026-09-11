import { makeAutoObservable } from "mobx"

class ActivePageStore {
    activeItem = "home";

    constructor() {
        const activeItem = localStorage.getItem('activeItem');

        if (activeItem) this.activeItem = activeItem;

        makeAutoObservable(this);
    }

    syncWithPath(pathname: string) {
        const activeItem = pathname === "" ? "home" : pathname;

        localStorage.setItem('activeItem', activeItem);
        this.activeItem = activeItem;
    }
}

export const activePageStore = new ActivePageStore();