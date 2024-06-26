import React, { useState, useEffect, useContext } from 'react';
import Item from './Item';
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';
const PizzaMania = () => {

    const [new_launches, setNew_Launches] = useState([]);
    const ConnString = import.meta.env.VITE_ConnString;
    const { pizzaManiaRef } = useContext(PizzaContext);

    useEffect(() => {
        const fetch_all_pizzas = async () => {
            await axios.get(`${ConnString}/user/pizza-mania`).then((response) => {
                console.log(response.data);
                setNew_Launches(response.data.mania)
            })
        }
        fetch_all_pizzas();
    }, [])
    return (
        <div className='flex flex-col items-center gap-2.5 px-10' ref={pizzaManiaRef}>
            <h1 className='text-[#171717] text-[50px] font-[600]'>Pizza Mania</h1>
            <hr className='w-[200px] h-[6px] rounded-full bg-[#252525]' />
            <div className='mt-[50px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
                {new_launches?.map((item, i) => {
                    return <Item key={i} id={item._id} name={item.name} image={item.image} description={item.description} price={item.price} />
                })}
            </div>
        </div>
    )
}

export default PizzaMania;