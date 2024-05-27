import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PizzaContext } from '../contexts/PizzaContext';
const Item = (props) => {

    const { bases } = useContext(PizzaContext);
    console.log(bases);

    const [base, setBase] = useState({
        size: 'regular',
        crust: 'new_hand_tossed'
    });
    const [price, setPrice] = useState(0);
    useEffect(() => {
        const calculatePrice = () => {
            console.log(base.size);
            console.log(base.crust);
            const tempBase = bases.find((item) => item.size === base.size && item.name === base.crust);
            console.log(tempBase);
            if (base.size === 'regular') {
                setPrice(props.price[0] + tempBase.price);
            }
            else if (base.size === 'medium') {
                setPrice(props.price[1] + tempBase.price);
            }
            else {
                setPrice(props.price[2] + tempBase.price);
            }
        }
        calculatePrice();
    }, [base]);

    const handleChange = (e) => {
        setBase({ ...base, [e.target.name]: e.target.value })
    }
    return (
        <div className='border shadow-lg mb-5'>
            {/* <Link to={`/product/${props.id}`}> <img src={props.image} alt="" onClick={window.scrollTo({ top: 0, behavior: "smooth" })} /></Link> */}
            <Link to={`/product/${props.id}`} className='flex items-center justify-center'> <img src={props.image} alt="" className='h-52' /></Link>
            <div className='flex justify-end px-2'>
                <button className='bg-[#8c8c8c]/20 rounded-full px-2 mb-1 shadow-sm hover:bg-[#6b6b6b]/20'>Customize</button>
            </div>
            <hr />
            <div className='px-1'>
                <div className='h-[85px] text-[#8c8c8c] flex justify-center items-center'>
                    <p>{props.description}</p>
                </div>
                <hr />
                <div className='flex justify-between px-1 py-2'>
                    <p className='text-[18px]' >{props.name}</p>
                    <div className='text-[#374151] text-[18px] font-[600]'>
                        ₹{price}
                    </div>
                </div>
                <div className='flex mx-1 gap-5'>
                    <div className='flex justify-between items-center w-full text-black text-[13px] font-[500]'>
                        <select name="size" id="size" onChange={handleChange} className='border p-1'>
                            <option value="regular">Regular(Serves 1) </option>
                            <option value="medium">Medium(Serves 2)</option>
                            <option value="large">Large(Serves 4)</option>
                        </select>
                        <select name="crust" id="crust" onChange={handleChange} className='border p-1'>
                            <option value="new_hand_tossed">New Hand Tossed</option>
                            <option value="wheat_thin_crust">100% Wheat Thin Crust</option>
                            <option value="cheese_burst">Cheese Burst</option>
                            <option value="fresh_pan_pizza">Fresh Pan Pizza</option>
                            <option value="ragi_crust">Ragi Crust</option>
                        </select>
                    </div>
                </div>
                <div className='w-full flex justify-end mt-2 px-3 mb-2'>
                    <button className='border-2 border-green-400 px-2 py-1'>ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default Item