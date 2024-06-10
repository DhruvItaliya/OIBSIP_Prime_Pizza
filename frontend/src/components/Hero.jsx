import React, { useContext } from 'react';
import hero_image from '../assets/hero1.jpg';
import { PizzaContext } from '../contexts/PizzaContext';

const Hero = () => {
    const { homeRef } = useContext(PizzaContext)
    return (
        <>
            <div className='flex flex-col sm:flex-row' ref={homeRef}>
                <img src={hero_image} className='object-cover w-full h-[635px] absolute z-[-1]' alt="" />
                <div className='absolute w-full h-[635px] bg-black/50 z-[-1]'></div>
                <div className='flex flex-1 flex-col h-[635px] items-center justify-center gap-5 p-5'>
                    <h2 className='text-white text-[40px] sm:text-[60px] font-[700] leading-none'>PRIME PIZZA brings</h2>
                    <div>
                        <p className='text-white text-[40px] font-[500] leading-none'>Delicious and Hot Pizzas Just for You.</p>
                        <p className='text-white text-[40px] sm:text-[80px] font-[700] leading-none'>MORE <span className='text-[#ff4141]'>Toppings!</span></p>
                    </div>
                    <div className='flex w-64 justify-center items-center gap-2 py-4 px-3 rounded-full mt-[30px] bg-[#ff4141] text-white text-[22px]'>
                        <div>OEDER NOW</div>
                    </div>
                </div>
                <div className='sm:flex flex-1 flex-col w-full items-start justify-start'>
                    <div className='w-full flex gap-2 my-3 relative'>
                        <input className='px-4 py-3 rounded-full absolute right-0 w-[50%]' type="text" placeholder='Search' />
                        <div className='absolute right-1 top-[6px] flex justify-center items-center'>
                            <button className='text-white bg-red-500 rounded-full px-4 py-1.5'>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero