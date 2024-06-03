import mongoose from 'mongoose';

const pizzaItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    veg: {
        type: Boolean,
        required: true
    },
    price: [{
        type: Number,
    }],
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const PizzaItem = mongoose.model('PizzaItem', pizzaItemSchema);

export default PizzaItem;