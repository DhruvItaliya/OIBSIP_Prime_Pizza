import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';

const AddBaseModal = (props) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { visible1, setVisible1 } = props;
    const { fetch_pizza_bases } = useContext(PizzaContext);
    const [baseData, setBaseData] = useState({
        name: '',
        price: [0, 0, 0], // Array to store prices: [regular, medium, large]
        description: '',
        veg: '',
        image: null
    })
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;
        console.log();
        if (type === 'file') {
            setBaseData({
                ...baseData,
                image: files[0]
            });
        } else if (name === 'regular' || name === 'medium' || name === 'large') {
            const priceIndex = { regular: 0, medium: 1, large: 2 };
            const updatedPrices = [...baseData.price];
            updatedPrices[priceIndex[name]] = value;
            setBaseData({
                ...baseData,
                price: updatedPrices
            });
        } else {
            setBaseData({
                ...baseData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(baseData);
        try {
            console.log(baseData);
            const { data } = await axios.post(`${ConnString}/admin/add-pizza`, {
                name: baseData.name,
                price: baseData.price,
                description: baseData.description,
                veg: baseData.veg === 'veg' ? true : false,
                pizza_image: baseData.image
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(data);
            if (data.success) {
                setVisible1(!visible1);
                setBaseData({
                    name: '',
                    price: [0, 0, 0], // Array to store prices: [regular, medium, large]
                    description: '',
                    veg: '',
                    image: null
                })
                fetch_pizza_bases();
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
                <div className='p-5 bg-white w-[45%]'>
                    <div className='flex justify-between text-2xl mb-2 font-[600]'>
                        <h1>ADD TOPPING</h1>
                        <button1 className='border px-1' onClick={() => setVisible1(!visible1)}>X</button1>
                    </div>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={baseData.name} type="text" name='name' className='px-2 py-1 border border-black' placeholder='Name' />
                        <div className='flex flex-wrap justify-between gap-2'>
                            <input onChange={handleChange} value={baseData.price} type="number" name='regular' className='px-2 py-1 border border-black' placeholder='Regular Price' />
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

export default AddBaseModal