import React, { useContext, useState } from 'react'
import { PizzaContext } from '../contexts/PizzaContext'
import BaseItem from '../components/BaseItem';
import ToppingsItem from '../components/ToppingsItem';
import AddBaseModal from '../components/AddBaseModal';
import AddToppingsModal from '../components/AddToppingsModal';

const BaseToppings = () => {
    const { bases, toppings } = useContext(PizzaContext)
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    console.log(bases);
    return (
        <>
            <div className={`${!visible1 ? 'hidden' : ''}`}>
                <AddBaseModal setVisible1={setVisible1} visible1={visible1} />
            </div>
            <div className={`${!visible2 ? 'hidden' : ''}`}>
                <AddToppingsModal setVisible2={setVisible2} visible2={visible2} />
            </div>
            <div className='relative left-24 w-full-minus-left-24 p-3'>
                <div className=''>
                    <div className='flex justify-between'>
                        <div className='text-3xl font-[600] mb-2'>ALL CRUST</div>
                        <button className='mr-4 shadow-lg bg-red-500 text-white mb-2 px-2' onClick={() => setVisible1(true)}>ADD CRUST</button>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
                        {bases?.map((base) => {
                            return (
                                <BaseItem item={base} />
                            )
                        })}
                    </div>
                </div>
                <hr className='my-5' />
                <div className=''>
                    <div className='flex justify-between'>
                        <div className='text-3xl font-[600] mb-2'>ALL TOPPINGS</div>
                        <button className='mr-4 shadow-lg bg-red-500 text-white mb-2 px-2' onClick={() => setVisible2(true)}>ADD TOPPING</button>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
                        {toppings?.map((topping) => {
                            return (
                                <ToppingsItem item={topping} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BaseToppings