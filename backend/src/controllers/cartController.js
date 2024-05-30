import * as cartService from '../services/cartService.js';
import * as userService from '../services/userService.js';

export const createCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await cartService.createCart(user);
        res.status(201).json({ sucess: true, cart });
    }
    catch (error) {
        console.log("Error in createCart");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}
export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartService.addItemToCart(req.body, userId);
        res.status(200).json({ success: true, cart });
    }
    catch (error) {
        console.log("Error in addItemToCart");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal server Error" });
        }
    }
}

export const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId,quantity } = req.body;
        const {user} = req;
        const cart = await cartService.updateCartItemQuantity(cartItemId,quantity,user);
        res.status(200).json({ success: true, cart });
    }
    catch (error) {
        console.log("Error in updateCartItemQuantity");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}

export const removeItemFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const cart = await cartService.removeCartItemFromCart(id, user);
        res.status(200).json({ success: true, cart });
    } 
    catch (error) {
        console.log("Error in removeItemFromCart");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}

export const calculateCartTotals = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        const cart = await cartService.findCartByUserId(user._id);
        console.log(cart);
        const total = await cartService.calculateCartTotals(cart);
        res.status(200).json({ success: true, total });
    }
    catch (error) {
        console.log("Error in calculateCartTotals");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}

export const findUserCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await cartService.findCartByUserId(user._id);
        res.status(200).json({ success: true, cart });
    }
    catch (error) {
        console.log("Error in findUserCart");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}

export const clearCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await cartService.clearCart(user);
        res.status(200).json({ success: true, cart });
    }
    catch (error) {
        console.log("Error in clerCart");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}

export const getCartItems = async (req, res) => {
    try {
        const { user } = req;
        const cartItems = await cartService.getCartItems(user);
        res.status(200).json({ success: true, cartItems });
    }
    catch (error) {
        console.log("Error in getCartItems");
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server Error" });
        }
    }
}