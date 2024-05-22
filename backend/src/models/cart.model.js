import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CartItem",
    }],
    total:Number,
});

// Define and export Cart model
const Cart = mongoose.model("Cart",cartSchema);
export default Cart;