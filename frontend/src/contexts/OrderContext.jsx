import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
export const OrderContext = createContext(null);

export const OrderContextProvider = ({ children }) => {

    const [allOrders, setAllOrders] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [outFordeliveryOrders, setOutFordeliveryOrders] = useState([]);

    const statusMap = {
        PENDING: "yellow",
        DELIVERED: "green",
        OUT_FOR_DELIVERY: "purple",
        REJECTED: "red",
    }

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
    useEffect(() => {
        if(isLoggedIn) fetch_all_orders();
    }, [])

    const fetch_all_orders = async () => {
        await axios.get(`${ConnString}/order/my-orders`, { withCredentials: true }).then((response) => {
            setAllOrders(response.data.userOrders)
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    useEffect(() => {
        const getPendingOrdersCount = () => {
            setPendingOrders(allOrders.filter(order => order.orderStatus === 'PENDING').reverse());
        };

        const getDeliveredOrdersCount = () => {
            setDeliveredOrders(allOrders.filter(order => order.orderStatus === 'DELIVERED').reverse());
        };

        const getOutForDeliveryOrdersCount = () => {
            setOutFordeliveryOrders(allOrders.filter(order => order.orderStatus === 'OUT_FOR_DELIVERY').reverse());
        };

        getOutForDeliveryOrdersCount();
        getPendingOrdersCount();
        getDeliveredOrdersCount();
    }, [allOrders])

    // useState(() => {
    //     console.log(allOrders);
    // }, [allOrders]);
    const contextValue = {
        allOrders,
        pendingOrders,
        deliveredOrders,
        outFordeliveryOrders,
        fetch_all_orders,
        statusMap,
        baseMapping,
        sizeMapping,
        toppingsMap
    };
    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    )
}