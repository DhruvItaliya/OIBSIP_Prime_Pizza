import React from 'react'
import { useContext } from 'react'
import { OrderContext } from '../contexts/OrderContext'
import OrderItem from '../components/OrderItem'

const Order = () => {
    const { pendingOrders, deliveredOrders,outFordeliveryOrders } = useContext(OrderContext)
    console.log(pendingOrders);
    console.log(deliveredOrders);
    return (
        <div className='absolute left-24 w-full-minus-left-24 p-3'>
            <div className='text-2xl font-[600]'>ALL ORDERS</div>
            <div>
                {pendingOrders.map((order) => {
                    return (
                        <OrderItem key={order._id} order={order} />
                    )
                })}
                {outFordeliveryOrders.map((order) => {
                    return (
                        <OrderItem key={order._id} order={order} />
                    )
                })}
                {deliveredOrders.map((order) => {
                    return (
                        <OrderItem key={order._id} order={order} />
                    )
                })}
            </div>
        </div>
    )
}

export default Order