import React, { createContext, useState, useEffect } from "react";
import { AccountManager } from "../lib/AccountManager";

const accountManager = new AccountManager(); // Use a different name for the instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = accountManager.observeUser(setUser); // Use the instance here
        return () => unsubscribe();
    }, []);

    const signUp = async (email, password, displayName) =>
        await accountManager.signUp(email, password, displayName);

    const signIn = async (email, password) =>
        await accountManager.signIn(email, password);

    const signOut = async () => await accountManager.signOut();

    const deleteAccount = async (password) => await accountManager.deleteAccount(password);

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);