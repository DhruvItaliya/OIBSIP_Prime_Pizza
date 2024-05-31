import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import Address from '../models/address.model.js';
import * as cartService from '../services/cartService.js';
import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
const stripe1 = new Stripe(process.env.STRIPE_KEY);

export const checkoutOrder = async (user) => {
    try {
        const cart = await cartService.findCartByUserId(user._id);
        const session = await stripe1.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: cart.items.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.pizza.name
                        },
                        unit_amount: (item.unitPrice * 100)
                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        })
        console.log(session.url);
        return session.url;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Failed to Payment");
    }
}

export const createOrder = async (order, user) => {
    try {
        const address = order.deliveryAddress;

        let savedAddress;
        if (address._id) {
            const isAddressExist = await Address.findById(address._id);
            if (isAddressExist) {
                savedAddress = isAddressExist;
            }
        }
        else {
            const shippingAddress = new Address(order.deliveryAddress);
            savedAddress = await shippingAddress.save();
        }
        console.log(user.addresses);
        console.log(savedAddress);

        if (!user.addresses.some(addressId => addressId.equals(savedAddress._id))) {
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
                base: cartItem.base,
                quantity: cartItem.quantity,
                unitPrice: cartItem.unitPrice,
                totalPrice: cartItem.totalPrice,
            });
            const savedOrderItem = await orderItem.save();
            orderItems.push(savedOrderItem._id);
        }

        const createOrder = new Order({
            customer: user._id,
            deliveryAddress: savedAddress._id,
            orderStatus: "PENDING",
            totalAmount: cart.totalPrice,
            items: orderItems,
            totalItem: cart.quantity
        });

        const savedOrder = await createOrder.save();
        const url = await checkoutOrder(user);
        await cartService.clearCart(user);
        return url;
    }
    catch (error) {
        console.log("Failed to create Order");
        throw new Error(error.message);
    }
}

export const cancelOrder = async (orderId) => {
    try {
        // const order = await Order.findByIdAndDelete(orderId);
        const order = await Order.findById(orderId);
        await OrderItem.deleteMany({ _id: { $in: order.items } });
        await Order.findByIdAndDelete(orderId);
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

export const getAllOrders = async () => {
    try {
        const orders = await Order.find({}).populate('customer')
            .populate('customer')
            .populate('deliveryAddress')
            .populate({
                path: 'items',
                populate: [
                    {path:'base'},
                    {path:'pizza'},
                    {path:'toppings'},
                ]
            })
            .exec();
        return orders;
    }
    catch (error) {
        console.log("Error in gerUserOrders");
        console.log(error.message);
        throw new Error("Failed to get orders");
    }
}

export const updateOrder = async (orderId, orderStatus) => {
    try {
        const validStatus = [
            "DELIVERED",
            "OUT_FOR_DELIVERY",
            "COMPLETED",
            "PENDING"
        ];

        if (!validStatus.includes(orderStatus)) {
            throw new Error("Please select a valid order status");
        }

        const order = await Order.findById(orderId);
        if (!order) {
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
        throw new Error(error.message);
    }
}