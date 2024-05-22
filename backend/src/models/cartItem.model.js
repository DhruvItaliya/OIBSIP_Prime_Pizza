import mongoose from "mongoose";

// Define the CartItem schema
const CartItemSchema = new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    pizza:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PizzaItem',
    },
    quantity:Number,
    base:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PizzaBase'
    },
    toppings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PizzaTopping'
    }],
    unitPrice:Number,
    totalPrice:Number,
});

// Define and export the CartItem model
const CartItem = mongoose.model('CartItem',CartItemSchema);
export default CartItem;