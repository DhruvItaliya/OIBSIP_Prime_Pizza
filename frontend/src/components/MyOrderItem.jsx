import React from 'react'
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format, isToday, parseISO } from 'date-fns';
import MyOrderSubItem from './MyOrderSubItem';

const MyOrderItem = (props) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { order } = props;
    const [toggle, setToggle] = useState(false);
    const { statusMap, fetch_all_orders } = useContext(OrderContext);
    const [status, setStatus] = useState('PENDING');
    const borderClass = `border-${statusMap[order.orderStatus]}-500`;
    const bgClass1 = `bg-${statusMap[order.orderStatus]}-500/20`;
    const bgClass2 = `bg-${statusMap[order.orderStatus]}-500`;

    console.log(statusMap[order.orderStatus]);
    const handleCancel = async (e) => {
        e.stopPropagation();
        try {
            const agree = confirm("Are you sure you want to cancel the order?")
            if (agree) {
                const { data } = await axios.delete(`${ConnString}/order/delete-order/${order._id}`, { withCredentials: true });
                if (data.success) {
                    fetch_all_orders();
                    toast.success("Status Updated");
                }
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went Wrong");
        }

    }


    const formatDateTime = (dateString) => {
        const date = parseISO(dateString);
        if (isToday(date)) {
            return format(date, 'HH:mm:ss');
        } else {
            return format(date, 'EEE, MMM d, yyyy HH:mm:ss');
        }
    };

    return (
        <div className={`border-2 ${borderClass} ${bgClass1} my-2`} onClick={() => setToggle(!toggle)}>
            <div className='p-2 text-gray-600'>{formatDateTime(order.createdAt)}</div>
            <div className='px-2 text-xl text-gray-600'>Name : {order.customer.name}</div>
            <div className={`w-full grid grid-cols-7 p-2 rounded-lg`}>
                <div className='col-span-3 text-lg'>
                    OrderId : {order._id}
                </div>
                <div>
                    Qty : {order.totalItem}
                </div>
                <div className='pr-4'>
                    <span className={`${bgClass2} py-1 px-1.5 text-white`}>{order.orderStatus}</span>
                </div>
                <div>
                    Amount : ₹{order.totalAmount}
                </div>
                {order.orderStatus == 'PENDING' ? <div className='flex justify-center items-center'>
                    <button className='bg-red-500 py-1 px-2 text-white' onClick={(e) => { handleCancel(e) }}>Cancel</button>
                </div> : null}
            </div>
            <div className={`${!toggle ? 'hidden' : ''}`}>
                {order.items.map((item, i) => {
                    return (
                        <MyOrderSubItem key={i} item={item} />
                    )
                })}
            </div>
            <div className={`${!toggle ? 'hidden' : ''} flex flex-col px-2 py-2`}>
                <div className='text-xl font-[600]'>Delivery Address</div>
                <div className='w-[300px]'>{order.deliveryAddress.fullName}, {order.deliveryAddress.streetAddress}, {order.deliveryAddress.city}, {order.deliveryAddress.state}, {order.deliveryAddress.country} - {order.deliveryAddress.postalCode}</div>
            </div>
        </div>
    )
}

export default MyOrderItem;