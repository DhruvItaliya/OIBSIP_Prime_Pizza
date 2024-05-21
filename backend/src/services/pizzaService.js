import PizzaItem from "../models/pizzaItem.model.js";
import PizzaBase from '../models/pizzaBase.model.js';
import PizzaTopping from "../models/pizzaTopping.model.js";

//add base 
export const addBase = async (req) => {
    try {
        const { name, size, quantity } = req.body;
        if (!name || !size || !quantity) {
            throw new Error('Please provide all details');
        }

        const base = await PizzaBase({
            name, size, quantity
        })

        base.save();
        return base;
    }
    catch (error) {
        console.log("Error in addBase");
        throw new Error(error.message);
    }
}

//add toppings
export const addTopping = async (req) => {
    try {
        const { name, quantity } = req.body;
        if (!name || !quantity) {
            throw new Error('Please provide all details');
        }

        const topping = await PizzaTopping({
            name, quantity
        })

        topping.save();
        return topping;
    }
    catch (error) {
        console.log("Error in addTopping");
        throw new Error(error.message);
    }
}

// add pizza
export const createPizza = async (req) => {
    try {
        console.log(req.file);
        if(!req.file){
            throw new Error(`Image could not get`)
        }
    
        const image = `/src/uploads/pizza_image/${req.file.filename}`;
        const {name,price,veg,available,description} = req.body;
        if( !name || !price || !veg || !available || !description ){
            throw new Error("Please fill all required fields!");
        }
        const priceArray = price.split(',').map(Number);
        console.log(priceArray);
        
        const pizza = new PizzaItem({
            name,
            price:priceArray,
            veg,
            available,
            description,
            image,
        });
        console.log(pizza);
        await pizza.save();
        return pizza;
    } catch (error) {
        console.log("Error in create pizza");
        throw new Error(error.message);
    }
};

// delete pizza from DB
export const deletePizza = async (pizzaId) => {
    try {
        const pizza = await PizzaItem.findById(pizzaId);
        if (!pizza) {
            throw new Error(`Pizza not found with id ${pizzaId}`);
        }

        await PizzaItem.findByIdAndDelete(pizzaId);
    }
    catch (error) {
        console.log("Error in delete pizza \n" + error.message);
        throw new Error(`Failed to delete pizza`)
    }
}

export const searchFood = async (keyword) => {
    try {
        let query = {};
        if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ];
        }

        const pizza = await PizzaItem.find(query);
        return pizza;
    }
    catch (error) {
        console.log("Error in search pizza\n" + error.message);
        throw new Error(`Failed to search pizza`)
    }
}

// export const updateAvailibilityStatus = async (pizzaId) => {
//     try {
//         const pizza = await PizzaItem.findById(pizzaId).populate([
//             { path: "ingredients", poulate: { path: "category", select: "name" } },
//             "foodCategory",
//         ]);
//         if (!pizza) {
//             throw new Error('PizzaItem Not found!');
//         }

//         pizza.available = !pizza.available;
//         await pizza.save();
//         return pizza;
//     }
//     catch (error) {
//         console.log("Error in update availibilty status\n" + error.message);
//         console.log("PizzaItem ID : " + pizzaId);
//         throw new Error("Failed to update status of pizza");
//     }
// }

export const findPizzaById = async (pizzaId) => {
    try {
        const pizza = await PizzaItem.findById(pizzaId);
        if (!pizza) {
            throw new Error('PizzaItem not found');
        }
        return pizza;
    }
    catch (error) {
        console.log("pizza id : " + pizzaId);
        console.log("Error in findFoodById in pizzaService\n" + error.message);
        throw new Error('Failed to find PizzaItem')
    }
}


