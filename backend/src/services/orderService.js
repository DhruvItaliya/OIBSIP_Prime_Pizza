import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import Address from '../models/address.model.js';

export const createOrder = async (order, user) => {
    try {
        const address = order.deliveryAddress;
        let savedAddress;
        if (address._id) {
            const isAddressExist = await Address.findById(address._id);
            if (isAddressExist) {
                savedAddress = isAddressExist;
            }
            else {
                const shippingAddress = new Address(order.deliveryAddress);
                savedAddress = await shippingAddress.save();
            }
        }

        if (!user.addresses.includes(savedAddress._id)) {
            user.addresses.push(savedAddress._id);
            await user.save();
        }

        const cart = await cartService.findCartByUserId(user._id);
        if (!cart) {
            throw new Error("cart not found");
        }
        const orderItems = [];

        for (const cartItem of cart.items) {
            const orderItem = new OrderItem({
                pizza: cartItem.pizza,
                toppings: cartItem.toppings,
                quantity: cartItem.quantity,
                totalPrice: cartItem.pizza.price * cartItem.quantity
            });
            const savedOrderItem = await orderItem.save();
            orderItems.push(savedOrderItem._id);
        }

        const totalPrice = await cartService.calculateCartTotals(cart);

        const createOrder = new Order({
            customer: user._id,
            deliveryAddress: savedAddress._id,
            orderStatus: "PENDING",
            totalAmount: totalPrice,
            items: orderItems,
        });

        const savedOrder = await createOrder.save();

        // const paymentResponse = await paymentService.generatePaymentLink(savedOrder);
        // console.log(paymentResponse);
        // return paymentResponse;
        return savedOrder;
    }
    catch (error) {
        throw new Error("Failed to create Order");
    }
}

export const cancelOrder = async (orderId) => {
    try {
        const order = await Order.findByIdAndDelete(orderId);
        return order;
    }
    catch (error) {
        console.log("Error in cancel order");
        console.log(error.message);
        throw new Error("Failed to cancel order");
    }
}

export const findOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found!");
        }
        return order;
    }
    catch (error) {
        console.log(error.message);
        console.log("Error in findOrderById ", orderId);
        throw new Error("Failed to find Order");
    }
}

export const getUserOrders = async (userId) => {
    try {
        const orders = await Order.find({ customer: userId });
        return orders;
    }
    catch (error) {
        console.log("Error in gerUserOrders");
        console.log(error.message);
        throw new Error("Failed to get orders");
    }
}

export const updateOrder = async(orderId,orderStatus) => {
    try {
        const validStatus = [
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "COMPLETED",
            "PENDING"
        ];

        if(!validStatus.includes(orderStatus)){
            throw new Error("Please select a valid order status");
        }

        const order = await Order.findById(orderId);
        if(!order){
            throw new Error("Order not found");
        }

        order.orderStatus = orderStatus;
        await order.save();

        // send notification
        // await notificationService.sendOrderStatusNotification(order);
        return order;
    }
    catch (error) {
        console.log("Error in updateOrder");
        console.log(error.message);
        throw new Error("Failed to update status");
    }
}