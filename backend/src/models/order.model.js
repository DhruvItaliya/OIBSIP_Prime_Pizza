import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    totalAmount:Number,
    orderStatus:String,
    deliveryAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
    }],
    totalItem:Number,
    // totalPrice:Number,
},{timestamps:true});

// Define and export Cart model
const Order = mongoose.model("Order",orderSchema);
export default Order;