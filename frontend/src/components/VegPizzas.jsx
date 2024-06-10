import React, { useState, useEffect, useContext } from 'react';
import Item from './Item';
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';
const VegPizzas = () => {

    const { vegPizzaRef, all_pizzas } = useContext(PizzaContext);
    return (
        <div className='flex flex-col items-center gap-2.5 px-10' ref={vegPizzaRef}>
            <h1 className='text-[#171717] text-[50px] font-[600]'>Veg Pizza</h1>
            <hr className='w-[200px] h-[6px] rounded-full bg-[#252525]' />
            <div className='mt-[50px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
                {all_pizzas?.map((item, i) => {
                    return <Item key={i} id={item._id} name={item.name} image={item.image} description={item.description} price={item.price} />
                })}
            </div>
        </div>
    )
}

export default VegPizzas;