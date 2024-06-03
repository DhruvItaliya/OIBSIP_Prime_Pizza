import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';

const AddToppingsModal = (props) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { visible2, setVisible2 } = props;
    const { fetch_toppings } = useContext(PizzaContext);
    const [toppingsData, setToppingsData] = useState({
        name: '',
        quantity: null,
        price: null
    })
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setToppingsData({
            ...toppingsData, [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(toppingsData);
        try {
            console.log(toppingsData);
            const { data } = await axios.post(`${ConnString}/admin/add-toppings`, {
                name: toppingsData.name,
                quantity: toppingsData.quantity,
                price: toppingsData.price,
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(data);
            if (data.success) {
                setVisible2(!visible2);
                setToppingsData({
                    name: '',
                    quantity: '',
                    price: 0
                })
                fetch_toppings();
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error("Failed to add pizza!");
        }
    }
    return (
        <div className='z-10 fixed w-full h-full top-0 flex justify-center items-center'>
            {/* Overlay */}
            <div className='z-10 fixed h-screen bg-black/50 w-full'></div>
            <div className='flex justify-center items-center z-10 w-full'>
                <div className='p-5 bg-white w-[30%]'>
                    <div className='flex justify-between text-2xl mb-2 font-[600]'>
                        <h1>ADD TOPPING</h1>
                        <button1 className='border px-1' onClick={() => setVisible2(!visible2)}>X</button1>
                    </div>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={toppingsData.name} type="text" name='name' className='px-2 py-1 border border-black' placeholder='Name' />
                        <div className='flex justify-between'>
                            <input onChange={handleChange} value={toppingsData.price} type="number" name='price' className='px-2 py-1 border border-black' placeholder='Price' />
                            <input onChange={handleChange} value={toppingsData.quantity} type="number" name='quantity' className='px-2 py-1 border border-black' placeholder='Quantity' />
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='shadow-lg bg-red-500 text-white px-3 py-1'>ADD</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddToppingsModal