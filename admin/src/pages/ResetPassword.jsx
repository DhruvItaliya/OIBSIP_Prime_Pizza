import React, { useState } from 'react';
import { MdLock } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
    const ConnString = import.meta.env.VITE_ConnString;
    const [userData, setUserData] = useState({ password: "", cpassword: "" });
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        const { data } = await axios.patch(`${ConnString}/auth/reset-password/${token}`,
            { password: userData.password, cpassword: userData.cpassword },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (data.success) {
            toast.success(`Password Updated successfully`);
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
                        <h1 className='text-3xl text-[#164043] my-2 justify-start'>Reset Password</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col w-[90%] sm:w-[70%]'>
                            <div className='flex items-center  bg-gray-200 my-2 rounded-md w-full'>
                                <MdLock className='m-2 text-[#ff3f6c] w-[5%]' /><input id="password" name="password" type="password" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[70%]' placeholder='New Password' value={userData.password} onChange={handleChange} required />
                            </div>
                            <div className='flex items-center  bg-gray-200 my-2 rounded-md w-full'>
                                <MdLock className='m-2 text-[#ff3f6c] w-[5%]' /><input id="cpassword" name="cpassword" type="password" className='bg-transparent border-l-2 border-gray-300 p-2 outline-none w-[70%]' placeholder='Confirm Password' value={userData.cpassword} onChange={handleChange} required />
                            </div>
                            <button type='submit' className='bg-[#ff3f6c] text-lg text-white py-1 my-2 rounded-md'>Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword