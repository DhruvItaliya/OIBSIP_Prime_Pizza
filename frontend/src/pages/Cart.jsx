import React, { useContext } from 'react'
import { PizzaContext } from '../contexts/PizzaContext'
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import delivery_image from '../assets/delivery-bike.png'
import empty_cart from '../assets/shopping-bag.png'

const Cart = () => {
    const { cartItems } = useContext(PizzaContext);
    return (
        <>
            {cartItems.quantity > 0 ? <div className='mx-20'>
                <div className='text-3xl mb-4 mt-2'>
                    {cartItems.quantity} Items in your cart
                </div>
                <div className='bg-[#1da81b]/20 border border-[#1da81b] flex items-center px-3 gap-3 my-2'>
                    <img src={delivery_image} className='w-8' alt="delivery image" /><p>Congratulations Free delivery unlocked!</p>
                </div>
                <div>
                    {cartItems?.items?.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}
                </div>
                <hr className='bg-black' />
                <div className='flex flex-col items-end m-2'>
                    <div className='border border-black p-2'>
                        <div className='text-lg mb-2'>Total You Pay : ₹{cartItems.totalPrice}</div>
                        <hr />
                        <div className='flex justify-end mt-2'>
                            <Link to='/order'><button className='text-lg border-2 bg-[#1da81b] px-2 py-1 rounded-sm text-white shadow-lg'>Proceed</button></Link>
                        </div>
                    </div>
                </div>
            </div> :
                <div className='flex h-[500px] justify-center items-center'>
                    <img src={empty_cart} className='w-[80px]' alt="" />
                    <div className='flex items-center flex-col text-gray-500 text-5xl'>
                        <div>Cart is  Empty</div>
                        <div className='text-gray-500 text-3xl'>Add Something</div>
                    </div>
                </div>
            }

        </>
    )
}

export default Cart