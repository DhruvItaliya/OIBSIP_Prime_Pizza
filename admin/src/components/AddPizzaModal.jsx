import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { PizzaContext } from '../contexts/PizzaContext';

const AddPizzaModal = (props) => {
    const ConnString = import.meta.env.VITE_ConnString;
    const { visible, setVisible } = props;
    const {fetch_all_pizzas} = useContext(PizzaContext);
    const [pizzaData, setPizzaData] = useState({
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
            setPizzaData({
                ...pizzaData,
                image: files[0]
            });
        } else if (name === 'regular' || name === 'medium' || name === 'large') {
            const priceIndex = { regular: 0, medium: 1, large: 2 };
            const updatedPrices = [...pizzaData.price];
            updatedPrices[priceIndex[name]] = value;
            setPizzaData({
                ...pizzaData,
                price: updatedPrices
            });
        } else {
            setPizzaData({
                ...pizzaData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(pizzaData);
        try {
            console.log(pizzaData);
            const { data } = await axios.post(`${ConnString}/admin/add-pizza`, {
                name: pizzaData.name,
                price: pizzaData.price,
                description: pizzaData.description,
                veg: pizzaData.veg === 'veg' ? true : false,
                pizza_image: pizzaData.image
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
                setVisible(!visible);
                setPizzaData({
                    name: '',
                    price: [0, 0, 0], // Array to store prices: [regular, medium, large]
                    description: '',
                    veg: '',
                    image: null
                })
                fetch_all_pizzas();
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
                        <h1>ADD PIZZA</h1>
                        <button className='border px-1' onClick={() => setVisible(!visible)}>X</button>
                    </div>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={pizzaData.name} type="text" name='name' className='px-2 py-1 border border-black' placeholder='Name' />
                        <div className='flex flex-wrap justify-between gap-2'>
                            <input onChange={handleChange} value={pizzaData.price[0]} type="number" name='regular' className='px-2 py-1 border border-black' placeholder='Regular Price' />
                            <input onChange={handleChange} value={pizzaData.price[1]} type="number" name='medium' className='px-2 py-1 border border-black' placeholder='Medium Price' />
                            <input onChange={handleChange} value={pizzaData.price[2]} type="number" name='large' className='px-2 py-1 border border-black' placeholder='Large Price' />
                        </div>
                        <textarea onChange={handleChange} value={pizzaData.description} name='description' type="text" className='px-2 py-1 border border-black' placeholder='Description' />
                        <div className='flex gap-4 border  border-black w-fit py-1 px-2'>
                            <div className='flex items-center gap-1'><label htmlFor="veg">Veg</label><input onChange={handleChange} value='veg' checked={pizzaData.veg === 'veg'} type="radio" name="veg" id="veg" /></div>
                            <div className='flex items-center gap-1'><label htmlFor="non-veg">Non-Veg</label><input onChange={handleChange} value='non-veg' checked={pizzaData.veg === 'non-veg'} type="radio" name="veg" id="non-veg" /></div>
                        </div>
                        <div>
                            <p>Upload Image</p>
                            <input onChange={handleChange} type="file" name="image" id="image" />
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

export default AddPizzaModal