import { populate } from 'dotenv';
import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js'
import PizzaBase from '../models/pizzaBase.model.js';
import PizzaItem from '../models/pizzaItem.model.js'
import PizzaTopping from '../models/pizzaTopping.model.js';

export const createCart = async (userId) => {
    try{
        if(!userId){
            throw new Error("Provide user")
        }
        const cart = new Cart({ customer: userId });
        cart.save();
        return cart;
    }
    catch(error){
        throw new Error(error.message);
    }
}

export const findCartByUserId = async (userId) => {
    let cart;

    cart = await Cart.findOne({ customer: userId }).populate([
        {
            path: "items",
            populate: [
                {path: "pizza"},
                {path: "base"},
                // {path: "toppings"},
        ],  
        },
    ]);
    if (!cart) {
        console.log("Error in findCartByUserId");
        throw new Error("Cart not found");
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate('pizza');

    console.log("cartItems : ", cartItems);

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of cart.items) {
        totalPrice += item.price;
        totalDiscountedPrice += item.discountedPrice;
        totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
}

export const addItemToCart = async (req, userId) => {
    try{
        const {menuItemId,base_name,base_size,toppings} = req;
        if(!menuItemId || !userId ||!base_name || !base_size || !toppings) throw new Error("menuId, userid, base_name or base_size not found!");
        const cart = await Cart.findOne({ customer: userId });
        const pizza = await PizzaItem.findById(menuItemId);
        if(!cart){
            cart = await createCart(userId);
        }
        // console.log(cart);
        // console.log(pizza);
        const isPresent = await CartItem.findOne({
            cart: cart._id,
            pizza: pizza._id,
            userId,//
        });
        // console.log("hello");

        const base = await PizzaBase.findOne({name:base_name,size:base_size});

        // caclulating total price of pizza
        let totalPrice;
        if(base_size==='regular') totalPrice = pizza.price[0];
        if(base_size==='medium') totalPrice = pizza.price[1];
        else totalPrice = pizza.price[2];

        totalPrice = totalPrice + base.price;

        // fetching only id's from toppings 
        const toppingsArray =  toppings.split(',');
        const allToppings = await PizzaTopping.find({name:{$in:toppingsArray}});
        const toppingIdsArray = allToppings.map(topping => topping._id);

        if (!isPresent) {
            const cartItem = new CartItem({
                pizza: pizza._id,
                cart: cart._id,
                quantity: 1,
                userId,
                base:base._id,
                toppings:toppingIdsArray,
                unitPrice:totalPrice,
                totalPrice,
            });
            
            const createdCartItem = await cartItem.save();
            cart.items.push(createdCartItem);
            await cart.save();
            return createdCartItem;
        }
        return isPresent;
    }
    catch(error){
        throw new Error(error.message);
    }
}

export const updateCartItemQuantity = async (cartItemId, quantity) => {
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
        console.log("error in updateCartItemQuantity");
        throw new Error("cart item not found");
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity*cartItem.unitPrice;
    await cartItem.save();
    return cartItem;
}

export const removeCartItemFromCart = async (cartItemId, user)=>{
    const cart = await Cart.findOne({ customer: user._id });
    if (!cart) {
        throw new Error("cart not found");
    }

    cart.items = cart.items.filter((item) => !item.equals(cartItemId));
    await CartItem.findByIdAndDelete(cartItemId);
    await cart.save();
    return cart;
}

export const clearCart = async (user)=>{
    const cart = await Cart.findOne({ customer: user._id });
    if (!cart) {
        throw new Error("cart not found");
    }

    cart.items = [];
    await CartItem.deleteMany({cart:cart._id});
    await cart.save();
    return cart;
}

export const calculateCartTotals= async(cart)=>{
    try{
        let total = 0;
        for(let cartItem of cart.items){
            total+=cartItem.totalPrice;
        }
        return total;
    }
    catch(error){
        console.log("Error in calculate Total cart");
        throw new Error(error.message);
    }
}