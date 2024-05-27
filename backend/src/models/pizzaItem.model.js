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
    category:{
        type:String,
        enum:['veg','new_launches','beverages','pizza_mania','sides']
    },
    description: {
        type: String,
        required: true
    },
    available: Boolean
}, { timestamps: true });

const PizzaItem = mongoose.model('PizzaItem', pizzaItemSchema);

export default PizzaItem;