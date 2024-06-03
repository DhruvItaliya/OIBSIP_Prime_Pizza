import React from 'react'
import { useContext } from 'react'
import { OrderContext } from '../contexts/OrderContext'
import MyOrderItem from '../components/MyOrderItem'
import { AuthContext } from '../contexts/AuthContext'

const MyOrder = () => {
  const { pendingOrders, deliveredOrders, outFordeliveryOrders } = useContext(OrderContext)
  const { isLoggedIn } = useContext(AuthContext);
  console.log(pendingOrders);
  console.log(deliveredOrders);
  return (
    <>
      {isLoggedIn && (pendingOrders.length>0 || deliveredOrders.length>0 || outFordeliveryOrders.length>0 ) ? <div className='flex flex-col p-3 mx-20'>
        <div className='text-2xl font-[600]'>MY ORDERS</div>
        <div>
          {pendingOrders.map((order) => {
            return (
              <MyOrderItem key={order._id} order={order} />
            )
          })}
          {outFordeliveryOrders.map((order) => {
            return (
              <MyOrderItem key={order._id} order={order} />
            )
          })}
          {deliveredOrders.map((order) => {
            return (
              <MyOrderItem key={order._id} order={order} />
            )
          })}
        </div>
      </div> : <div className='flex justify-center items-center h-[550px]'>
        <div className='text-4xl text-gray-500'>You haven't ordered any pizza</div>
        </div>}
    </>
  )
}

export default MyOrder