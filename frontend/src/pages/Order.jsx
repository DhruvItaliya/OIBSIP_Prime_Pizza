import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';
import OrderItem from '../components/OrderItem';
import { toast } from 'react-toastify';

const Order = () => {
    const { cartItems } = useContext(PizzaContext);
    const ConnString = import.meta.env.VITE_ConnString;
    const [allAddress, setAllAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [select, setSelect] = useState(false);
    useEffect(() => {
        const fetch_user_address = async () => {
            await axios.get(`${ConnString}/auth/fetch-user-addresses`, { withCredentials: true }).then((response) => {
                console.log(response);
                setAllAddress(response.data.user.addresses)
            }).catch((error) => {
                toast.error(error.message);
            })
        }
        fetch_user_address();
    }, [])

    useEffect(() => {
        setSelectedAddress(allAddress[0]);
    }, [allAddress])

    const makeOrder = async () => {
        try {
            const { data } = await axios.post(`${ConnString}/order/checkout-order`, {
                deliveryAddress: selectedAddress
            }, { withCredentials: true });
            if (data.success) {
                window.location = data.url;
                const { data2 } = await axios.post(`${ConnString}/order/create-order`, {
                    deliveryAddress: selectedAddress
                }, { withCredentials: true });
                if (data2.success) {
                    toast.success("Order placed successfully");
                }
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error("Somthing went wrong!");
        }
    }

    useEffect(() => {
        console.log(allAddress[0]);
    }, [allAddress])
    return (
        <div>
            <div className='text-4xl my-2 mx-4'>Order Summary</div>
            <div className='flex justify-between m-2'>
                <div className='w-[55%]'>
                    {cartItems?.items?.map((item) => (
                        <OrderItem key={item._id} item={item} />
                    ))}
                    <div className='flex justify-end'>
                        <button className='bg-red-500 text-white px-2 py-1 my-2 shadow-md' onClick={() => makeOrder()}>Make Payment</button>
                    </div>
                </div>
                <div className='flex flex-col w-[40%]'>
                    <div>
                        <div className='text-3xl'>
                            Choose Address
                        </div>
                        <div className='flex'>
                            {allAddress.map((address) => {
                                return (
                                    <div className='flex m-2 w-[370px]'>
                                        <div className='px-4 cursor-pointer py-5 border border-red-500 bg-red-500/15'>{address.fullName}, {address.streetAddress}, {address.city}, {address.state}, {address.country} - {address.postalCode}</div>
                                    </div>
                                )
                            })}
                            <div className='flex m-2 w-[370px]'>
                                <div className='flex items-center justify-center px-4 cursor-pointer py-5 border text-red-500 text-5xl border-red-500 bg-red-500/15'><p>+</p></div>
                            </div>
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
        </div>
    )
}

export default Order