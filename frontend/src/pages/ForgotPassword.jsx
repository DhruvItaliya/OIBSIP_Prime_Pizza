import React, { useEffect, useState, useContext } from 'react';
import { MdLock, MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const ForgotPassword = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [userData, setUserData] = useState({ email: "" });
    const [isEmailSent, setIsEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        setIsEmailSent(true);
        const { data } = await axios.post(`${ConnString}/auth/forgot-password`,
            { email: userData.email },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (data.success) {
            toast.success(`Email sent to the ${userData.email} for reset password`);
            setIsEmailSent(false);
            navigate('/');
        }
        else {
            toast.error(data.error);
        }
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className='flex bg-[#fdefe9]'>
                <div className='flex justify-center items-center mx-auto w-full md:w-[60%] my-20'>
                    <div className='flex flex-col justify-center items-center w-[80%] sm:w-[60%] bg-white rounded-md h-[300px] shadow-md'>
                        <h1 className='text-3xl text-[#164043] my-2 justify-start'>Forgot Password</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
                            <div className='flex items-center  bg-gray-200 my-2 rounded-md w-full'>
                                <MdEmail className='m-2 text-[#ff3f6c] w-[5%]' /><input id="email" name="email" type="email" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[70%]' placeholder='Email Address' value={userData.email} onChange={handleChange} required />
                            </div>
                            <button type='submit' className='bg-[#ff3f6c] text-lg text-white py-1 my-2 rounded-md' disabled={isEmailSent}>Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword