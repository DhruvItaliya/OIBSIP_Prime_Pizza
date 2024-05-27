import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const PizzaContext = createContext(null);


export const PizzaContextProvider = ({ children }) => {

    const ConnString = import.meta.env.VITE_ConnString;
    const [bases, setBases] = useState([]);
    const [all_pizzas, setAll_Pizzas] = useState([]);
    useEffect(() => {
        const fetch_pizza_bases = async () => {
            await axios.get(`${ConnString}/user/fetch-bases`).then((response) => setBases(response.data.bases)).catch((error) => {
                toast.error(error.message);
            })
        }
        
        const all_pizzas = async()=>{
            await axios.get(`${ConnString}/user/fetch-all_pizza`).then((response) => setAll_Pizzas(response.data.pizzas)).catch((error) => {
                toast.error(error.message);
            })
        }
        fetch_pizza_bases();
        all_pizzas();
    }, [])
    
    const contextValue = {bases,all_pizzas};
    return(
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    )
}