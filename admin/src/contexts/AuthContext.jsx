import axios from "axios";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { toast } from 'react-toastify';
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [allUsers, setAllUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token') ? true : false);
    const handleLogout = async () => {
        try {
            await axios.get(`${ConnString}/auth/logout`, {
                withCredentials: true,
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                const { data } = response;
                if (data.success) {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    window.location.assign('/')
                    toast.success("Successfully Logout")
                }
                else {
                    throw new Error(data.error);
                }
            }).catch((error) => {
                throw new Error(error.message);
            })
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const fetch_all_users = async () => {
            await axios.get(`${ConnString}/admin/get-all-users`).then((response) => {
                setAllUsers(response.data.users)
            }).catch((error) => {
                toast.error(error.message);
            })
        }

        fetch_all_users();
    }, [])

    const contextValue = { handleLogout, isLoggedIn, setIsLoggedIn,allUsers };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}