import React, { createContext, useState, useEffect } from "react";
import { FirebaseAccountManager } from "../FirebaseAccountManager";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = FirebaseAccountManager.observeUser(setUser);
        return () => unsubscribe();
    }, []);

    const signUp = async (email, password, displayName) =>
        await FirebaseAccountManager.signUp(email, password, displayName);

    const signIn = async (email, password) =>
        await FirebaseAccountManager.signIn(email, password);

    const signOut = async () => await FirebaseAccountManager.signOut();

    const deleteAccount = async (password) => await FirebaseAccountManager.deleteAccount(password);

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
