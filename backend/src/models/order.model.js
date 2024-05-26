import mongoose from "mongoose";
import OrderItem from "./orderItem.model.js";

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


// orderSchema.pre("remove",async function(next){
//     try{
//         await OrderItem.deleteMany({_id:{$in:this.items}});
//         next();
//     }
//     catch(error){
//         next(error);
//     }
// })

// Define and export Cart model
const Order = mongoose.model("Order",orderSchema);
export default Order;