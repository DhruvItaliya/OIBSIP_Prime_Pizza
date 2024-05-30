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
    totalPrice:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:0
    }
});

// Define and export Cart model
const Cart = mongoose.model("Cart",cartSchema);
export default Cart;