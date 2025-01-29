import { FirebaseAccountManager } from "./FirebaseAccountManager";

export class AccountManager {
    constructor() {
        this.firebaseAccountManager = new FirebaseAccountManager();
    }

    async deleteAccount(password) {
        return this.firebaseAccountManager.deleteAccount(password);
    }

    async signUp(email, password, displayName) {
        return this.firebaseAccountManager.signUp(email, password, displayName);
    }

    async signIn(email, password) {
        return this.firebaseAccountManager.signIn(email, password);
    }

    async signOut() {
        return this.firebaseAccountManager.signOut();
    }

    observeUser(callback) {
        return this.firebaseAccountManager.observeUser(callback);
    }
}
