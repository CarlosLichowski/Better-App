// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Assuming correct path for backend_url
import { BACKEND_URL } from '../pages/Login/backend_url'; // Or adjust to your actual path

// 1. Interfaz definition - ADD getToken()
interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    getToken: () => string | null; // <--- ADD THIS LINE
}

// 2. Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create custom hook to use the context easily
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// 4. Create provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    // Helper function to get the token (can be internal or exposed)
    const getToken = () => { // <--- ADD THIS FUNCTION
        return localStorage.getItem('access_token');
    };

    // useEffect to verify the token on component mount
    useEffect(() => {
        const token = getToken(); // Use the internal getToken function
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        navigate('/Login');
    };

    // Define contextValue here, outside of the logout function - INCLUDE getToken
    const contextValue = {
        isLoggedIn,
        login,
        logout,
        getToken, // <--- INCLUDE getToken HERE
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};