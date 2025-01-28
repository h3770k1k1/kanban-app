import { FirebaseAccountManager } from "./FirebaseAccountManager";

export const AccountManager = {
    async deleteAccount(password) {
        return FirebaseAccountManager.deleteAccount(password);
    },
    async signUp(email, password, displayName) {
        return FirebaseAccountManager.signUp(email, password, displayName);
    },
    async signIn(email, password) {
        return FirebaseAccountManager.signIn(email, password);
    },
    async signOut() {
        return FirebaseAccountManager.signOut();
    },
    observeUser(callback) {
        return FirebaseAccountManager.observeUser(callback);
    },
};
