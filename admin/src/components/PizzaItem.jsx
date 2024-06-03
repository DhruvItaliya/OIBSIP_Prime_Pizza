import React from 'react'
import { Link } from 'react-router-dom'

const PizzaItem = (props) => {
    return (
        <div className='border shadow-lg p-1'>
            <div className='flex justify-center'><img src={props.image} alt="" className='h-52' /></div>
            <hr />
            <div className='px-1'>
                <p className='text-[18px] pt-2' >{props.name}</p>
                <div className='h-[75px] text-[#8c8c8c] flex justify-center items-start'>
                    <p>{props.description}</p>
                </div>
                <hr />
                <div className='flex justify-between text-[#374151] text-sm px-1 py-2'>
                    <div><span className='font-[600]'>Regular :</span> ₹ {props.price[0]}</div>
                    <div><span className='font-[600]'>Medium :</span> ₹ {props.price[1]}</div>
                    <div><span className='font-[600]'>Large :</span> ₹ {props.price[2]}</div>
                </div>
            </div>
        </div>
    )
}

export default PizzaItem