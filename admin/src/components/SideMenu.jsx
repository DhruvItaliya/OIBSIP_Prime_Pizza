import React from 'react'
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { TbReport } from 'react-icons/tb';
import axios from "axios";
import { toast } from 'react-toastify';
import dashboard_image from '../assets/icons8-dashboard-48.png'
import cart_image from '../assets/shopping-cart.png';
import items_image from '../assets/spoon-and-fork.png';
import logout_image from '../assets/exit.png';

const ConnString = import.meta.env.VITE_ConnString;
const SideMenu = () => {
    const logOut = async () => {
        sessionStorage.clear();
        //database part
        try {
            const response = await axios.get(`${ConnString}user/logout`,
                {
                    withCredentials: true
                });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        window.location.assign("home");
    }
    return (
        <div className='h-full min-h-screen absolute top-0'>
            <div className="flex w-24 min-h-screen z-20 h-full flex-col justify-between border-e border-gray-400 bg-white">
                <div>
                    <div className="border-t border-gray-300">
                        <div className="px-2">
                            <ul className="flex flex-col space-y-1 mt-36 pt-4">
                                <li className='py-2'>
                                    <Link
                                        to="/"
                                        className="group relative flex flex-col justify-center items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <img src={dashboard_image} className='w-9' alt="" />
                                        <span className="">
                                            Dashboard
                                        </span>
                                    </Link>
                                </li>
                                <hr className='border border-gray-400' />
                                <li className='py-2'>
                                    <Link
                                        to="/orders"
                                        className="group relative flex flex-col justify-center items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <img src={cart_image} className='w-9' alt="" />
                                        <span className="">
                                            Orders
                                        </span>
                                    </Link>
                                </li>
                                <hr className='border border-gray-400' />
                                <li className='py-2'>
                                    <Link
                                        to=''
                                        className="group relative flex flex-col justify-center items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <img src={items_image} className='w-9' alt="" />
                                        <span className="">
                                            Items
                                        </span>
                                    </Link>
                                </li>
                                <hr className='border border-gray-400' />
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                    <button
                        type="button"
                        onClick={logOut}
                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                        <img src={logout_image} className='w-7' alt="" />
                        <span
                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default SideMenu
