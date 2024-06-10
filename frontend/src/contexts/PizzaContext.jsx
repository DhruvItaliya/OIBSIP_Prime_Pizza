import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
export const PizzaContext = createContext(null);

export const PizzaContextProvider = ({ children }) => {

    const ConnString = import.meta.env.VITE_ConnString;
    const [bases, setBases] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [all_pizzas, setAll_Pizzas] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

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
    useEffect(() => {
        const fetch_pizza_bases = async () => {
            await axios.get(`${ConnString}/user/fetch-bases`).then((response) => setBases(response.data.bases)).catch((error) => {
                toast.error(error.message);
            })
        }

        const all_pizzas = async () => {
            await axios.get(`${ConnString}/user/fetch-all-pizza`).then((response) => {
                console.log(response.data.pizzas);
                setAll_Pizzas(response.data.pizzas)
            }).catch((error) => {
                toast.error(error.message);
            })
        }

        fetch_pizza_bases();
        all_pizzas();
    }, [])

    const fetch_user_cart = async () => {
        await axios.get(`${ConnString}/cart/find-user-cart`, { withCredentials: true }).then((response) => setCartItems(response.data.cart)).catch((error) => {
            toast.error(error.message);
        })
    }

    const addToCart = async (pizzaData) => {
        try {
            console.log(pizzaData);
            const { data } = await axios.post(`${ConnString}/cart/add-to-cart`, {
                menuItemId: pizzaData.menuItemId,
                base_name: pizzaData.base_name,
                base_size: pizzaData.base_size,
                toppings: pizzaData.toppings,
                price: pizzaData.price
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            fetch_user_cart();
        }
        catch (error) {
            toast.error("Failed to add to cart!");
        }
    }

    const updateCartFromItem = async (pizzaId, quantity) => {
        const item = cartItems.items.find(item => item.pizza._id === pizzaId);
        const cartItemId = item._id;
        await updateCart(cartItemId, quantity);
    }

    const updateCart = async (cartItemId, quantity) => {
        try {
            const { data } = await axios.post(`${ConnString}/cart/update-cart`,
                { cartItemId, quantity },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            fetch_user_cart();
            toast.success("Item updated!")
        } catch (error) {
            toast.error("Failed to update cart!");
        }
    }

    const removeItemFromCart = async (cartItemId) => {
        try {
            const { data } = await axios.get(`${ConnString}/cart/remove-cart-item/${cartItemId}`,
                {
                    withCredentials: true,
                }
            );
            fetch_user_cart();
            toast.success("Item removed!")
        } catch (error) {
            toast.error("Failed to remove cart item!");
        }
    }

    useEffect(() => {
        if (isLoggedIn) fetch_user_cart();
    }, []);

    const pizzaManiaRef = useRef(null);
    const recommendedRef = useRef(null);
    const homeRef = useRef(null);
    const vegPizzaRef = useRef(null);
    const scrollToPizzaMania = () => {
        pizzaManiaRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToRecommended = () => {
        recommendedRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToHome = () => {
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    const contextValue = {
        bases,
        all_pizzas,
        fetch_user_cart,
        cartItems,
        addToCart,
        updateCart,
        updateCartFromItem,
        baseMapping,
        sizeMapping,
        toppingsMap,
        removeItemFromCart,
        scrollToHome,
        scrollToPizzaMania,
        scrollToRecommended,
        homeRef,
        pizzaManiaRef,
        recommendedRef,
        vegPizzaRef,
    };
    return (
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    )
}