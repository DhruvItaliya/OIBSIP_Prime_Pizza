import React from 'react'
import AddPizzaModal from '../components/AddPizzaModal'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { PizzaContext } from '../contexts/PizzaContext';
import PizzaItem from '../components/PizzaItem';

const Pizza = () => {
    const { all_pizzas } = useContext(PizzaContext);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        console.log(visible);
        console.log(all_pizzas);
    }, [visible, all_pizzas])
    return (
        <>
            <div className={`${!visible ? 'hidden' : ''}`}>
                <AddPizzaModal setVisible={setVisible} visible={visible} />
            </div>
            <div className='relative left-24 w-full-minus-left-24 p-3'>
                <div className='flex justify-between'>
                    <div className='text-3xl font-[600]'>
                        ALL PIZZAS
                    </div>
                    <button className='mr-4 shadow-lg bg-red-500 text-white px-2' onClick={() => setVisible(true)}>ADD PIZZA</button>
                </div>

                <div>
                <div className='mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
                {all_pizzas?.map((item, i) => {
                    return <PizzaItem key={i} id={item._id} name={item.name} image={item.image} description={item.description}  price={item.price} />
                })}
            </div>
                </div>
            </div>
        </>
    )
}

export default Pizza