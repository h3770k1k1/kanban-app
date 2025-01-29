import { auth, firestore } from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
    updateProfile,
    onAuthStateChanged,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

export class FirebaseAccountManager {

    async signUp(email, password, displayName) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });
        return user;
    }

    async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error('Incorrect email or password');
        }
    }

    async signOut() {
        await signOut(auth);
    }

        async deleteAccount(password) {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently logged in.");
            }

            try {
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);

                await deleteDoc(doc(firestore, "users", user.uid));
                await deleteUser(user);
            } catch (error) {
                if (error.code === 'auth/wrong-password') {
                    throw new Error("Incorrect password. Please try again.");
                } else if (error.code === 'auth/network-request-failed') {
                    throw new Error("Network error. Please check your connection.");
                } else {
                    throw new Error(error.message || "Failed to delete account.");
                }
            }
        }

    observeUser(callback) {
        return onAuthStateChanged(auth, callback);
    }
}
