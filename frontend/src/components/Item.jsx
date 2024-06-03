import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PizzaContext } from '../contexts/PizzaContext';
const Item = (props) => {

    const { bases, addToCart, updateCartFromItem, cartItems } = useContext(PizzaContext);
    const [pizzaData, setPizzaData] = useState({
        menuItemId: props.id,
        base_name: "",
        base_size: "",
        toppings: [],
        price: 0
    })
    const [base, setBase] = useState({
        size: 'regular',
        crust: 'new_hand_tossed'
    });

    // for change total items of pizza on add and remove
    const [cartItem, setCartItem] = useState();

    const [price, setPrice] = useState(0);
    useEffect(() => {
        const calculatePrice = () => {
            const tempBase = bases?.find((item) => item.size === base.size && item.name === base.crust);
            if (base.size === 'regular') {
                setPrice(props?.price[0] + tempBase?.price);
            }
            else if (base.size === 'medium') {
                setPrice(props?.price[1] + tempBase?.price);
            }
            else {
                setPrice(props.price[2] + tempBase?.price);
            }
        }
        calculatePrice();
    }, [base, bases]);

    useEffect(() => {
        setPizzaData({
            ...pizzaData,
            base_name: base.crust,
            base_size: base.size,
            price: price
        })
    }, [price])

    useEffect(() => {
        getPizzaFromCart();
    }, [cartItems])

    const getPizzaFromCart = () => {
        const item = cartItems?.items?.find((item) => item.pizza._id === props.id);
        setCartItem(item);
    }
    const handleChange = (e) => {
        setBase({ ...base, [e.target.name]: e.target.value })
    }
    return (
        <div className='border shadow-lg mb-5 relative'>
            {/* <Link to={`/product/${props.id}`}> <img src={props.image} alt="" onClick={window.scrollTo({ top: 0, behavior: "smooth" })} /></Link> */}
            <Link to={`/pizza/${props.id}`} className='flex items-center justify-center'> <img src={props.image} alt="" className='h-52' /></Link>
            <div className='flex justify-end px-2 absolute top-[42%] right-0'>
                <button className='bg-[#8c8c8c] text-white rounded-full px-2 mb-1 shadow-sm hover:bg-[#6b6b6b]'>Customize</button>
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
                        ₹ {price}
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
                    {!cartItem ? <button className='border-2 bg-[#1da81b] text-white px-2 py-1' onClick={() => addToCart(pizzaData)}>ADD TO CART</button>
                        : <div>
                            <button className='border-t-2 border-l-2 border-b-2 border-1 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => updateCartFromItem(props.id, -1)}>-</button>
                            <button className='border-2 px-3 py-1 shadow-md'>{cartItem.quantity}</button>
                            <button className='border-t-2 border-r-2 border-b-2 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => updateCartFromItem(props.id, 1)}>+</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Item