import mongoose from 'mongoose';

const pizzaBaseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    size: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0
    }
},{timestamps:true});

const PizzaBase = mongoose.model('PizzaBase', pizzaBaseSchema);
export default PizzaBase;