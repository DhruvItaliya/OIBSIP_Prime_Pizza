import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';
import { AuthContext } from '../contexts/AuthContext';
import OrderItem from '../components/OrderItem';
import { toast } from 'react-toastify';

const Order = () => {
    const { cartItems } = useContext(PizzaContext);
    const {isLoggedIn} = useContext(AuthContext);
    const ConnString = import.meta.env.VITE_ConnString;
    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState(0);
    const [allAddress, setAllAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [addressData, setAddressData] = useState({
        fullName: JSON.parse(localStorage.getItem('user')).name,
        streetAddress: "",
        city: "",
        state: "",
        postalCode: ""
    })
    useEffect(() => {
        fetch_user_address();
    }, [])

    useEffect(() => {
        setSelectedAddress(allAddress[select]);
    }, [select])

    const fetch_user_address = async () => {
        await axios.get(`${ConnString}/auth/fetch-user-addresses`, { withCredentials: true }).then((response) => {
            console.log(response);
            setAllAddress(response.data.user.addresses)
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    const makeOrder = async () => {
        try {
            console.log(select);
            console.log(allAddress);
            console.log(selectedAddress);
            const { data } = await axios.post(`${ConnString}/order/create-order`, {
                deliveryAddress: selectedAddress
            }, { withCredentials: true });
            if (data.success) {
                window.location = data.paymentResponse;
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error("Somthing went wrong!");
        }
    }

    useEffect(() => {
        console.log(allAddress);
        setSelectedAddress(allAddress[select]);
    }, [allAddress])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(addressData);
        try {
            const { data } = await axios.post(`${ConnString}/user/add-address`, {
                address: addressData
            }, { withCredentials: true });
            if (data.success) {
                fetch_user_address();
                toast.success("Address Added");
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error("Somthing went wrong!");
        }
    }

    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    }
    return (
        <>
            {cartItems.quantity>0 && isLoggedIn ? <div className='mx-4'>
                <div className='text-4xl my-2 mx-4'>Order Summary</div>
                <div className='flex justify-between m-2'>
                    <div className='w-[55%]'>
                        {cartItems?.items?.map((item) => (
                            <OrderItem key={item._id} item={item} />
                        ))}
                        <div className='flex justify-end'>
                            <button className='bg-red-500 text-white px-2 py-1 my-2 shadow-md' onClick={() => { makeOrder()}}>Make Payment</button>
                        </div>
                    </div>
                    <div className='flex flex-col w-[40%]'>
                        <div>
                            <div className='text-3xl'>
                                Choose Address
                            </div>
                            <div className='flex'>
                                {allAddress.map((address, i) => {
                                    return (
                                        <div className='flex m-2 w-[370px]'>
                                            <div className={`px-4 cursor-pointer py-5 border border-red-500  ${i === select ? 'bg-blue-500/15 border-blue-500' : 'bg-red-500/15 border-red-500'}`} onClick={() => setSelect(i)}>{address.fullName}, {address.streetAddress}, {address.city}, {address.state}, {address.country} - {address.postalCode}</div>
                                        </div>
                                    )
                                })}
                                <div className='flex m-2 w-[370px]' onClick={() => setToggle(!toggle)}>
                                    <div className='flex items-center justify-center px-4 cursor-pointer py-5 border hover:bg-red-500/20 text-red-500 text-5xl border-red-500 bg-red-500/15'><p>+</p></div>
                                </div>
                            </div>
                            <div className={`${!toggle ? 'hidden' : ''}`}>
                                <div className='text-2xl my-2'>Add Address</div>
                                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                                    <div className='flex'>
                                        <input type="text" name='streetAddress' className='py-1 px-2 border w-full' onChange={handleChange} placeholder='Street Address' />
                                    </div>
                                    <div className='flex flex-1 gap-2'>
                                        <div className='flex'>
                                            <input type="text" name='city' className='py-1 px-2 border' onChange={handleChange} placeholder='City' />
                                        </div>
                                        <div>
                                            <input type="text" name='state' className='py-1 px-2 border' onChange={handleChange} placeholder='State' />
                                        </div>
                                        <div>
                                            <input type="text" name='postalCode' className='py-1 px-2 border' onChange={handleChange} placeholder='Pincode' />
                                        </div>
                                    </div>
                                    <div>
                                        <button type='submit' className='bg-red-500 text-white px-2 py-1 rounded-sm shadow-md'>ADD</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='flex flex-col m-2 my-4 w-[300px] gap-2'>
                            <div className='flex justify-between'>
                                <div>Sub Total</div>
                                <div>{cartItems.totalPrice}.00</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Discount</div>
                                <div>0.00</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Delivery Charges</div>
                                <div className='text-[#1da81b]'>FREE</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Texes and Charges</div>
                                <div>0.00</div>
                            </div>
                            <hr />
                            <div className='flex justify-between font-[600]'>
                                <div>Grand Total</div>
                                <div>{cartItems.totalPrice}.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : window.location.assign('/')}
        </>
    )
}

export default Order