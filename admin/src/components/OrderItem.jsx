import React from 'react'
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { useState } from 'react';
import Item from './Item';
import { toast } from 'react-toastify';
import axios from 'axios';

const OrderItem = (props) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { order } = props;
    const [toggle, setToggle] = useState(false);
    const { statusMap,fetch_all_orders } = useContext(OrderContext);
    const [status, setStatus] = useState('PENDING');
    const borderClass = `border-${statusMap[order.orderStatus]}-500`;
    const bgClass1 = `bg-${statusMap[order.orderStatus]}-500/20`;
    const bgClass2 = `bg-${statusMap[order.orderStatus]}-500`;

    const handelUpdate = async (e) => {
        e.stopPropagation();
        try {
            const { data } = await axios.put(`${ConnString}/order/update-order/${order._id}/${status}`,{ withCredentials: true });
            if (data.success) {
                fetch_all_orders();
                toast.success("Status Updated");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Something went Wrong");
        }

    }

    return (
        <div className={`border-2 ${borderClass} ${bgClass1} my-2`} onClick={() => setToggle(!toggle)}>
            <div className={`w-full grid grid-cols-7 my-3 p-2 rounded-lg`}>
                <div className='col-span-2 text-lg'>
                    OrderId : {order._id}
                </div>
                <div>
                    Qty : {order.totalItem}
                </div>
                <div>
                    <span className={`${bgClass2} py-1 px-1.5 text-white`}>{order.orderStatus}</span>
                </div>
                <div>
                    Amt : ₹{order.totalAmount}
                </div>
                <div className=''>
                    <div>Update Status</div>
                    <div className=''>
                        <select
                            className='border border-gray-300 rounded p-1'
                            defaultValue={order.orderStatus}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="PENDING">PENDING</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <button className='bg-green-500 py-1 px-2 text-white' onClick={(e) => { handelUpdate(e) }}>Update</button>
                </div>
            </div>
            <div className={`${!toggle ? 'hidden' : ''}`}>
                {order.items.map((item) => {
                    return (
                        <Item item={item} />
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

export default OrderItem;