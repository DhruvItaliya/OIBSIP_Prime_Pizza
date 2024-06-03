import React, { useContext } from 'react'
import { PizzaContext } from '../contexts/PizzaContext'

const BaseToppingsItem = (props) => {
    const { item } = props;
    const { baseMapping, sizeMapping} = useContext(PizzaContext);
    console.log(item);
    return (
        <div className='border shadow-lg p-1'>
            <div className='px-1'>
                <div className='text-[18px] pt-2' >{baseMapping[item.name]} | {sizeMapping[item.size]}</div>
                <div className='flex justify-between px-3 pb-2'>
                    <div className='text-[15px] pt-1' >Price : ₹{item.price}.00</div>
                    <div className='text-[15px] pt-1' >Quantity : {item.quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default BaseToppingsItem