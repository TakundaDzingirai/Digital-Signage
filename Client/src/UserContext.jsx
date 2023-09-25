import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ user: { username: null, show: false }, role: null });

    const clearUser = () => {
        // Perform any necessary cleanup when the user logs out
        setUser({ user: { username: null, show: false }, role: null });
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// Export clearUser directly without destructuring

