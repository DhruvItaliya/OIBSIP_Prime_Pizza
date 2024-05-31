import React from 'react'
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { AiOutlineDelete } from 'react-icons/ai';

const Item = (props) => {
    const { item } = props;
    const {baseMapping,sizeMapping} = useContext(OrderContext);
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

                    </div>
                    <div className='w-1/3 sm:w-1/3 flex justify-center items-center'><p>₹{item.unitPrice}/Unit</p></div>
                </div>
                <div className='flex flex-1 justify-between py-2'>
                    <div className='w-1/6 sm:w-1/3 flex justify-center items-center'>
                        <button className='border-2 px-3 py-1 shadow-md'>Qty : {item.quantity}</button>
                    </div>
                    <div className='w-1/6 sm:w-1/3 flex justify-center items-center'><span className='sm'>Total : </span><p>&nbsp; ₹{item.totalPrice}</p></div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Item