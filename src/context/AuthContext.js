import React, { createContext, useState, useEffect } from "react";
import { AccountManager } from "../lib/AccountManager";

const accountManager = new AccountManager();
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stopListening = accountManager.observeUser(setUser);
        return () => stopListening();
    }, []);

    return (
        <AuthContext.Provider value={{ user, accountManager }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
