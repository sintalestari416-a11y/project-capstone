import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // 🔥 LOAD DARI LOCALSTORAGE (AUTO LOGIN)
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 🔥 LOGIN
    const login = (email, password) => {
        if (!email || !password) return false;

        const userData = {
            email,
            role: "admin", // sementara semua dianggap admin
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        return true;
    };

    // 🔥 LOGOUT
    const logout = () => {
        setUser(null);

        // 🔥 HAPUS STORAGE
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);