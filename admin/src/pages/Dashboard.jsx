import React from 'react'
import { useContext } from 'react'
import { OrderContext } from '../contexts/OrderContext'
import { AuthContext } from '../contexts/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const { allOrders, pendingOrders, deliveredOrders } = useContext(OrderContext);
    const { allUsers } = useContext(AuthContext);

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [todayOrders, setTodayOrders] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [todaysSales, setTodaysSales] = useState(0);

    useEffect(() => {

        const getTotalOrders = () => {
            setTotalOrders(allOrders.length);
        };

        const getTotalUsers = () => {
            setTotalCustomer(allUsers.length);
        };
        const getTotalTodaysOrders = () => {
            const today = new Date().toISOString().split('T')[0];
            setTodayOrders(allOrders.filter(order => new Date(order.createdAt).toISOString().split('T')[0] === today).length);
        };

        const getTotalRevenue = () => {
            setTotalRevenue(allOrders.reduce((total, order) => total + order.totalAmount, 0));
        };

        const getTodaysSales = () => {
            const today = new Date().toISOString().split('T')[0];
            const todaysSale = allOrders
                .filter(order => new Date(order.createdAt).toISOString().split('T')[0] === today)
                .reduce((total, order) => total + order.totalAmount, 0);
            setTodaysSales(todaysSale);
        };

        getTodaysSales();
        getTotalRevenue();
        getTotalTodaysOrders();
        getTotalOrders();
        getTotalUsers();
    }, [allOrders, allUsers])

    useEffect(() => {
       
    }, [todayOrders, totalCustomer, totalOrders, totalRevenue])
    return (
        <div className='absolute left-24 w-full-minus-left-24 p-3'>
            <div className='text-3xl mb-3'>
                Total Summary
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col p-4 w-[240px] text-white rounded-md bg-green-500 gap-3'>
                    <div className='text-3xl font-[600]'>Today's Order</div>
                    <div className='text-2xl font-[600]'>{todayOrders}</div>
                </div>
                <div className='flex flex-col p-4 w-[240px] text-white rounded-md bg-purple-500 gap-3'>
                    <div className='text-3xl font-[600]'>Total Orders</div>
                    <div className='text-2xl font-[600]'>{totalOrders}</div>
                </div>
                <div className='flex flex-col p-4 w-[240px] text-white rounded-md bg-yellow-500 gap-3'>
                    <div className='text-3xl font-[600]'>Total Customer</div>
                    <div className='text-2xl font-[600]'>{totalCustomer - 1}</div>
                </div>
                <div className='flex flex-col p-4 w-[240px] text-white rounded-md bg-red-500 gap-3'>
                    <div className='text-3xl font-[600]'>Total Turnover</div>
                    <div className='text-2xl font-[600]'>₹{totalRevenue}.00</div>
                </div>
            </div>
            <hr className='my-6' />
            <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                    <div className='text-2xl mb-2 text-gray-600'>Today's Summary</div>
                    <div className='border border-black p-2 bg-orange-400/20'>
                        <div className='flex flex-col gap-2 border border-black bg-orange-400/30 p-4'>
                            <div className='flex w-[400px] text-xl justify-between'>
                                <div>Today's Orders</div>
                                <div>{todayOrders}</div>
                            </div>
                            <hr className='' />
                            <div className='flex w-[400px] text-xl justify-between'>
                                <div>Total Sales</div>
                                <div>₹{todaysSales}.00</div>
                            </div>
                            <hr />
                            <div className='flex w-[400px] text-xl justify-between'>
                                <div>Pending Orders</div>
                                <div>{pendingOrders?.length}</div>
                            </div>
                            <hr />
                            <div className='flex w-[400px] text-xl justify-between'>
                                <div>Delivered Orders</div>
                                <div>{deliveredOrders?.length}</div>
                            </div>
                            <hr />
                            <div className='flex w-[400px] text-xl justify-between'>
                                <div>Rejected Orders</div>
                                <div>{0}</div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full justify-center px-5'>
                    <div className='flex justify-between w-full mb-2'>
                        <div className='text-2xl mb-2 text-gray-600'>Pending Orders</div>
                        <Link to='/orders'><button className='text-xl rounded-sm text-white shadow-lg bg-green-500 px-2 py-1'>All Orders</button></Link>
                    </div>
                    <div className='grid grid-cols-5 gap-4 w-full bg-gray-100 py-2'>
                        <div className='col-span-2 text-center'>Order Id</div>
                        <div className='text-center'>Status</div>
                        <div className='text-center'>Qty</div>
                        <div className='text-center'>Amount</div>
                    </div>
                    <div className='w-full px-5'>
                        {pendingOrders?.map((order) => {
                            return (
                                <div className='grid grid-cols-5 gap-4 w-full py-2 border-b' key={order._id}>
                                    <div className='col-span-2 text-center'>{order._id}</div>
                                    <div className='text-center'>{order.orderStatus}</div>
                                    <div className='text-center'>{order.totalItem}</div>
                                    <div className='text-center'>{order.totalAmount}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard