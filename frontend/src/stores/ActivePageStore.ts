import { makeAutoObservable } from "mobx"

class ActivePageStore {
    activeItem = "home";

    constructor() {
        makeAutoObservable(this);
    }

    syncWithPath(pathname: string) {
        this.activeItem = pathname === "" ? "home" : pathname;
    }
}

export const activePageStore = new ActivePageStore();