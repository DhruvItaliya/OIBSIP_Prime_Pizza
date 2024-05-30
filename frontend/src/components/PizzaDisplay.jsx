import React, { useContext, useEffect, useState } from 'react';
import red_papper from '../assets/red_papper.jpg'
import olives from '../assets/black_olives.jpg'
import capsicum from '../assets/capsicum.jpg'
import jalapeno from '../assets/jalapeno.jpg'
import tomato from '../assets/tomato.jpg'
import onion from '../assets/onion.jpg'
import mushroom from '../assets/mushroom.jpg'
import paneer from '../assets/paneer.jpg'
import veg_icon from '../assets/veg-48.png'
import { PizzaContext } from '../contexts/PizzaContext';

const PizzaDisplay = (props) => {
    const { pizza } = props;
    const { addToCart, bases, cartItems,updateCartFromItem } = useContext(PizzaContext);
    const [pizzaData, setPizzaData] = useState({
        menuItemId: pizza._id,
        base_name: "",
        base_size: "",
        toppings: {
            red_papper: false,
            mushroom: false,
            onion: false,
            tomato: false,
            capsicum: false,
            paneer: false,
            jalapeno: false,
            olives: false
        },
        price: 0
    })

    const [newPizzaData, setNewPizzaData] = useState(pizzaData);

    const [base, setBase] = useState({
        size: 'regular',
        crust: 'new_hand_tossed'
    });
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [price, setPrice] = useState(0);


    useEffect(() => {
        const calculatePrice = () => {
            const tempBase = bases?.find((item) => item.size === base.size && item.name === base.crust);
            if (base.size === 'regular') {
                setDefaultPrice(pizza.price[0] + tempBase?.price);
            }
            else if (base.size === 'medium') {
                setDefaultPrice(pizza.price[1] + tempBase?.price);
            }
            else {
                setDefaultPrice(pizza.price[2] + tempBase?.price);
            }
        }
        calculatePrice();
    }, [base]);

    const transformToppings = (toppings) => {
        return Object.keys(toppings).filter(topping => toppings[topping]);
    };

    useEffect(() => {
        const selectedToppingsCount = Object.values(pizzaData.toppings).filter(value => value).length;
        setPrice(defaultPrice + selectedToppingsCount * 60);
    }, [pizzaData, defaultPrice]);

    useEffect(() => {
        setNewPizzaData({ menuItemId: pizza._id, base_name: base.crust, base_size: base.size, toppings: transformToppings(pizzaData.toppings), price: price })
    }, [price])

    const handleChange1 = (e) => {
        setBase({ ...base, [e.target.name]: e.target.value })
    }
    const handleToppingChange = (topping) => {
        setPizzaData((prevData) => ({
            ...prevData,
            toppings: {
                ...prevData.toppings,
                [topping]: !prevData.toppings[topping]
            }
        }));

    };

    useEffect(() => {
        console.log(newPizzaData);
    }, [newPizzaData])

    // for change total items of pizza on add and remove
    const [cartItem, setCartItem] = useState();

    const getPizzaFromCart = () => {
        const item = cartItems?.items?.find((item) => item.pizza._id === pizza._id);
        setCartItem(item);
    }

    useEffect(() => {
        getPizzaFromCart();
    }, [cartItems]);

    return (
        <div className='flex max-w-full my-5 mx-5 shadow-sm'>
            <div className='w-[40%] flex justify-center items-center border-l border-t border-b'>
                <img className='w-[400px]' src={pizza.image} alt="" />
            </div>
            <div className='w-[60%] border p-5'>
                <div>
                    <div className='text-2xl font-[600]'>{pizza.name}</div>
                </div>
                <div className='flex justify-between px-5 pb-4'>
                    <p className='text-xl text-gray-600'>{pizza.description}</p>
                </div>
                <div className='flex justify-between px-5 pb-2'>
                    <div className='text-2xl'>₹ {price}</div>
                </div>
                <div className='flex justify-between px-5 py-3'>
                    <select name="size" id="size" onChange={handleChange1} className='border p-2'>
                        <option value="regular">Regular(Serves 1) </option>
                        <option value="medium">Medium(Serves 2)</option>
                        <option value="large">Large(Serves 4)</option>
                    </select>
                    <select name="crust" id="crust" onChange={handleChange1} className='border p-1'>
                        <option value="new_hand_tossed">New Hand Tossed</option>
                        <option value="wheat_thin_crust">100% Wheat Thin Crust</option>
                        <option value="cheese_burst">Cheese Burst</option>
                        <option value="fresh_pan_pizza">Fresh Pan Pizza</option>
                        <option value="ragi_crust">Ragi Crust</option>
                    </select>
                </div>
                <div className='flex flex-col pt-5 pb-3'>
                    <p>Add toppings</p>
                    <p className='text-sm text-gray-500'>You can add more toppings</p>
                </div>
                <hr />
                <div className='flex py-4 items-center gap-1'>
                    <img src={veg_icon} className='w-6' alt="" />
                    <p>Add veg toppings @ ₹ 60.0 each</p>
                </div>
                <div className='flex gap-2'>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('red_papper')}>
                        <img src={red_papper} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="red_papper" id="red_papper" onChange={() => handleToppingChange('red_papper')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.red_papper} />
                            <p className='text-sm'>Red Papper</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('capsicum')}>
                        <img src={capsicum} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="capsicum" id="capsicum" onChange={() => handleToppingChange('capsicum')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.capsicum} />
                            <p className='text-sm'>Capsicum</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('tomato')}>
                        <img src={tomato} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="tomato" id="tomato" onChange={() => handleToppingChange('tomato')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.tomato} />
                            <p className='text-sm'>Tomato</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('olives')}>
                        <img src={olives} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="olives" id="olives" onChange={() => handleToppingChange('olives')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.olives} />
                            <p className='text-sm'>Olives</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('jalapeno')}>
                        <img src={jalapeno} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="jalapeno" id="jalapeno" onChange={() => handleToppingChange('jalapeno')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.jalapeno} />
                            <p className='text-sm'>Jalapeno</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('onion')}>
                        <img src={onion} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="onion" id="onion" onChange={() => handleToppingChange('onion')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.onion} />
                            <p className='text-sm'>Onion</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('mushroom')}>
                        <img src={mushroom} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="mushroom" id="mushroom" onChange={() => handleToppingChange('mushroom')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.mushroom} />
                            <p className='text-sm'>Mushroom</p>
                        </div>
                    </div>
                    <div className='border p-1 w-[175px]' onClick={() => handleToppingChange('paneer')}>
                        <img src={paneer} alt="" />
                        <div className='flex justify-between items-center'>
                            <input type="checkbox" name="paneer" id="paneer" onChange={() => handleToppingChange('paneer')} onClick={(e) => e.stopPropagation()} checked={pizzaData.toppings.paneer} />
                            <p className='text-sm'>Paneer</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-4'>
                    {!cartItem ? <button className='border-2 bg-[#1da81b] text-white px-2 py-1' onClick={() => addToCart(newPizzaData)}>ADD TO CART</button>
                        : <div>
                            <button className='border-t-2 border-l-2 border-b-2 border-1 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => updateCartFromItem(pizza._id, -1)}>-</button>
                            <button className='border-2 px-3 py-1 shadow-md'>{cartItem.quantity}</button>
                            <button className='border-t-2 border-r-2 border-b-2 px-3 py-1 hover:bg-gray-200 active:scale-95 shadow-md' onClick={() => updateCartFromItem(pizza._id, 1)}>+</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default PizzaDisplay