import mongoose from "mongoose";

const pizzaToppingSchema = new mongoose.Schema({
    name:String,
    quantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true});

const PizzaTopping = mongoose.model('pizzaTopping',pizzaToppingSchema);
export default PizzaTopping;