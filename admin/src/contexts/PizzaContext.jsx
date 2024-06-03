import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const PizzaContext = createContext(null);

export const PizzaContextProvider = ({ children }) => {

    const [bases, setBases] = useState([]);
    const [all_pizzas, setAll_Pizzas] = useState([]);
    const [toppings, setToppings] = useState([]);

    const toppingsMap = {
        tomato: "Tomato",
        onion: "Onion",
        capsicum: "Capsicum",
        paneer: "Paneer",
        red_papper: "Red Papper",
        mushroom: "Mushroom",
        jalapeno: "Jalapeno",
        olives: "Olives",
    }

    const baseMapping = {
        new_hand_tossed: "New Hand Tossed",
        wheat_thin_crust: "100% Wheat Thin Crust",
        cheese_burst: "Cheese Burst",
    }

    const sizeMapping = {
        regular: "Regular",
        medium: "Medium",
        large: "Large",
    }

    const ConnString = import.meta.env.VITE_ConnString;

    const fetch_pizza_bases = async () => {
        await axios.get(`${ConnString}/user/fetch-bases`).then((response) => setBases(response.data.bases)).catch((error) => {
            toast.error(error.message);
        })
    }
    const fetch_toppings = async () => {
        await axios.get(`${ConnString}/user/fetch-toppings`).then((response) => setToppings(response.data.toppings)).catch((error) => {
            toast.error(error.message);
        })
    }

    const fetch_all_pizzas = async () => {
        await axios.get(`${ConnString}/user/fetch-all-pizza`).then((response) => {
            setAll_Pizzas(response.data.pizzas)
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    useEffect(() => {
        fetch_toppings();
        fetch_pizza_bases();
        fetch_all_pizzas();
    }, [])

    useState(() => {
        console.log(all_pizzas);
        console.log(bases);
    }, [all_pizzas]);
    const contextValue = {
        all_pizzas,
        bases,
        toppings,
        fetch_toppings,
        fetch_pizza_bases,
        fetch_all_pizzas,
        baseMapping,
        sizeMapping,
        toppingsMap
    };
    return (
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    )
}