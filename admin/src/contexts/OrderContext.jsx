import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const OrderContext = createContext(null);

export const OrderContextProvider = ({ children }) => {

    const [allOrders, setAllOrders] = useState([]);

    const [pendingOrders, setPendingOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [outFordeliveryOrders, setOutFordeliveryOrders] = useState([]);

    const statusMap = {
        PENDING: "yellow",
        DELIVERED: "green",
        OUT_FOR_DELIVERY: "purple",
        REJECTED: "red",
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
        fetch_all_orders();
    }, [])

    const fetch_all_orders = async () => {
        await axios.get(`${ConnString}/admin/get-all-orders`).then((response) => {
            setAllOrders(response.data.orders)
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    useEffect(() => {
        const getPendingOrdersCount = () => {
            setPendingOrders(allOrders.filter(order => order.orderStatus === 'PENDING'));
        };

        const getDeliveredOrdersCount = () => {
            setDeliveredOrders(allOrders.filter(order => order.orderStatus === 'DELIVERED'));
        };

        const getOutForDeliveryOrdersCount = () => {
            setOutFordeliveryOrders(allOrders.filter(order => order.orderStatus === 'OUT_FOR_DELIVERY'));
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
        sizeMapping
    };
    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    )
}