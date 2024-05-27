import axios from "axios";
import { useState, createContext, useContext } from "react";
import { toast } from 'react-toastify';
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token') ? true : false);
    const handleLogout = async () => {
        try {
            await axios.get(`${ConnString}/auth/logout`, {
                withCredentials: true,
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            }).then((response)=>{
                const {data} = response;
                if (data.success) {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    window.location.assign('/')
                    toast.success("Successfully Logout")
                }
                else {
                    throw new Error(data.error);
                }
            }).catch((error)=>{
                throw new Error(error.message);
            })
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const contextValue = { handleLogout, isLoggedIn, setIsLoggedIn };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}