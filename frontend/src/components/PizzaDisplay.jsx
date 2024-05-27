import React from 'react';
import red_papper from '../assets/red_papper.jpg'
import { PizzaContext } from '../contexts/PizzaContext';

const PizzaDisplay = (props) => {
    const {pizza} = props;
    const { addToCart,cartItems, removeFromCart } = useContext(PizzaContext);
    
    return (
        <div>
            <div></div>
            <div>
                <div>

                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
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
                <div>
                    <div>
                        <img src={red_papper} alt="" />
                        <input type="checkbox" name="red_papper" id="red_papper" />
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default PizzaDisplay