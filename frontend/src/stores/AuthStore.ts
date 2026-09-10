import { makeAutoObservable, runInAction } from "mobx"

class Auth {
    username;
    isLoggedIn;

    constructor() {
        this.username = localStorage.getItem('username') || '';
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        makeAutoObservable(this);
    }

    login(username: string) {
        this.username = username;
        this.isLoggedIn = true;

        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');
    }

    async logout() {
        try {
            await fetch("http://127.0.0.1:8080/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            runInAction(() => {
                this.username = '';
                this.isLoggedIn = false;
                
                localStorage.removeItem('username');
                localStorage.removeItem('isLoggedIn');
            });
        }
    }
}

export const authStore = new Auth();