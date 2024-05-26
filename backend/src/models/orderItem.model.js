import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PizzaItem",
    },
    quantity: Number,
    totalPrice: Number,
    unitPrice: Number,
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PizzaBase'
    },
    toppings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PizzaTopping'
    }],
});

// Define and export Cart model
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;