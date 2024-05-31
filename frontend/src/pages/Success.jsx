import React from 'react'
import check_image from '../assets/check.png';
const Success = () => {
    return (
        <div className='flex w-full h-[600px] justify-center items-center'>
            <div className='border p-5 bg-gray-100 shadow-lg'>
                <div className='text-2xl flex justify-center items-center gap-3'>
                    <div><img src={check_image} alt="" /></div>
                    <div className='text-gray-600'>Order Placed Successfully</div>
                </div>
                <div className='flex justify-between mt-4 mx-4 text-xl'>
                    <button className='bg-red-500 text-white py-1 px-2 rounded-sm shadow-md'>Home</button>
                    <button className='bg-yellow-500 text-white py-1 px-2 rounded-sm shadow-md'>Track Order</button>
                </div>
            </div>
        </div>
    )
}

export default Success