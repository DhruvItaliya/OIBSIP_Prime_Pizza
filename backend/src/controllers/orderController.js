import * as orderService from '../services/orderService.js';

// customer order controller
export const createOrder = async (req, res) => {
    try {
        const order = req.body;
        console.log(order);
        const user = req.user;
        if (!order) throw new Error("Please provide valid order");
        const paymentResponse = await orderService.createOrder(order, user);
        res.status(200).json({ success: true, paymentResponse });
    }
    catch (error) {
        console.log(error.message);
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}

export const getAllUserOrders = async (req, res) => {
    try {
        const user = req.user;
        if (!user._id) throw new Error("User id not found");
        const userOrders = await orderService.getUserOrders(user._id);
        res.status(200).json({ success: true, userOrders });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}



// admin order controller
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await orderService.cancelOrder(orderId);
        res.status(200).json({ success: true, message: `Order deleted with id : ${orderId}` })
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}


export const updateOrder = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.params;
        const order = await orderService.updateOrder(orderId, orderStatus);
        res.status(200).json({ success: true, order });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}


