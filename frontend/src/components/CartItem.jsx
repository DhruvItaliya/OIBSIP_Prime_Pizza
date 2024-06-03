import React, { useContext, useState } from 'react'
import { PizzaContext } from '../contexts/PizzaContext';
import { AiOutlineDelete } from 'react-icons/ai';

const CartItem = (props) => {
    const { item } = props;
    console.log(item);
    const { updateCart, sizeMapping, baseMapping,toppingsMap,removeItemFromCart } = useContext(PizzaContext);
    return (
        <div>
            <div className='flex flex-col sm:flex-row w-full py-2 justify-center items-center'>
                <div className='flex flex-1 justify-between'>
                    <div className='w-1/3 sm:w-1/6 flex justify-center items-center'>
                        <img src={item.pizza.image} className='w-[90px] sm:w-[65px]' alt="" />
                    </div>
                    <div className='w-1/3 sm:w-2/3 flex flex-col justify-center items-center'>
                        <p>{item.pizza.name}</p>
                        <div className='flex justify-center text-sm'>
                            <p>{baseMapping[item.base.name]} |&nbsp;</p>
                            <p>{sizeMapping[item.base.size]}</p>
                        </div>
                        <div className='flex flex-wrap gap-2 justify-center items-center'>
                            {item.toppings.map((topping,i) => {
                                return (
                                    <div key={i} className='bg-red-300 text-sm px-1 rounded-md'>
                                        {toppingsMap[topping.name]}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-1/3 sm:w-1/3 flex justify-center items-center'><p>₹{item.unitPrice}/Unit</p></div>
                </div>
                <div className='flex flex-1 justify-between py-2'>
                    <div className='w-1/6 sm:w-1/3 flex justify-center items-center'>
                        <button className='border-t-2 border-l-2 border-b-2 border-1 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => updateCart(item._id, -1)}>-</button>
                        <button className='border-2 px-3 py-1 shadow-md'>{item.quantity}</button>
                        <button className='border-t-2 border-r-2 border-b-2 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => updateCart(item._id, 1)}>+</button>
                    </div>
                    <div className='w-1/6 sm:w-1/3 flex justify-center items-center'><span className='sm'>Total : </span><p>&nbsp; ₹{item.totalPrice}</p></div>
                    <div className='w-1/12 sm:w-1/6 flex justify-center items-center'>
                        <div className='hover:bg-red-500 hover:text-white p-1 rounded-md active:scale-90 duration-100'><AiOutlineDelete className='' size={30} onClick={() => removeItemFromCart(item._id)} /></div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default CartItem