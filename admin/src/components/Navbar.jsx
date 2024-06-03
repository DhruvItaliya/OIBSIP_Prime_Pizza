import React, { useContext, useState, useEffect } from 'react'
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdLogin, MdLogout, MdOutlineToys } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { IoWoman, IoManSharp } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import navProfile from '../assets/profile-user.png';


const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [menu, setMenu] = useState("home");
    const { handleLogout, isLoggedIn } = useContext(AuthContext);
    return (
        <div className='sticky z-10 top-0 max-w-[1640px] bg-white mx-auto p-4 lg:px-24 flex justify-between items-center shadow-md'>
            <div className='flex justify-center items-center'>
                <div className='flext md:hidden mr-2' onClick={() => setNav(!nav)}>
                    <AiOutlineMenu size={25} />
                </div>
                <Link to='/' className='flex flex-col' onClick={() => setMenu('home')}>
                    <p className='text-3xl font-bold pl-4'>Prime Pizza</p>
                    <p className='text-lg pl-4'>Admin Panel</p>
                </Link>
            </div>
            <div className='flex items-center gap-11'>
                {/* login button */}
                {!isLoggedIn ? <Link to='/login'><button onClick={() => setMenu("")} className='hidden md:flex justify-center items-center text-lg bg-black active:bg-slate-800 text-white rounded-full px-4 py-1'><MdLogin size={25} className='mr-3' />Login</button></Link>
                    : <button onClick={() => { handleLogout(); setMenu("") }} className='hidden md:flex justify-center items-center text-lg bg-black active:bg-slate-800 text-white rounded-full px-4 py-1'><MdLogout size={25} className='mr-3' />Logout</button>}

                {isLoggedIn ? <img className='w-[2.5rem]' src={navProfile} alt="" /> : null}

            </div>


            {/* overlays(for mobile) */}
            {nav && <div className='h-screen w-full bg-black/80 fixed z-10 top-0 left-0 duration-300'></div>}

            {/* side menu */}
            <div className={nav ? 'z-10 bg-white h-screen w-[280px] fixed top-0 left-0 duration-300' : 'z-10 bg-white h-screen left-[-100%] w-[280px] fixed top-0 duration-300'}>
                <div className='flex justify-start p-4 items-center'>
                    <p className='text-2xl font-bold'>Prime Pizza</p>
                </div>
                <AiOutlineClose className='absolute top-4 right-4' size={25} onClick={() => setNav(!nav)} />
                <nav>
                    <ul className='flex flex-col justify-around p-4'>
                        <Link to='/'><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100' onClick={() => setNav(!nav)}><GiShoppingBag size={25} className='mr-3' />Shop</li><hr /></Link>
                        <Link to='/'><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100' onClick={() => setNav(!nav)}><IoManSharp size={25} className='mr-3' />Men</li><hr /></Link>
                        <Link to='/'><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100' onClick={() => setNav(!nav)}><IoWoman size={25} className='mr-3' />Women</li><hr /></Link>
                        <Link to='/'><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100' onClick={() => setNav(!nav)}><MdOutlineToys size={25} className='mr-3' />Kids</li><hr /></Link>
                        {!isLoggedIn ? <Link to='/login'><li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100' onClick={() => setNav(!nav)}><MdLogin size={25} className='mr-3' />Login</li></Link>
                            : <li className='flex py-3 px-2 text-gray-700 hover:bg-gray-100' onClick={() => { setNav(!nav); handleLogout() }}><MdLogin size={25} className='mr-3' />Logout</li>}
                    </ul>
                </nav>
            </div>

        </div >
    )
}

export default Navbar