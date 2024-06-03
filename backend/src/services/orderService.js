import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import Address from '../models/address.model.js';
import PizzaTopping from '../models/pizzaTopping.model.js';
import PizzaBase from '../models/pizzaBase.model.js';
import * as cartService from '../services/cartService.js';
import sendMail from '../utils/email.js';
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

const reduceQuantities = async (item) => {
    // Reduce Topping Quantities
    for (const topping of item.toppings) {
        const toppingRecord = await PizzaTopping.findById(topping.id);
        toppingRecord.quantity -= item.quantity;
        await toppingRecord.save();
    }

    // Reduce Base Quantity
    const baseRecord = await PizzaBase.findById(item.base.id);
    baseRecord.quantity -= item.quantity;
    await baseRecord.save();
};

export const createOrder = async (order, user) => {
    try {
        const address = order.deliveryAddress;

        let savedAddress;
        console.log(address);
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

            // Reduce the quantities after saving the order item
            await reduceQuantities(cartItem);
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

        const itemsHTML = cart.items.map(item => `
            <tr>
                <td>${item.pizza.name}</td>
                <td>${item.quantity}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
            </tr>
        `).join('');

        console.log(itemsHTML);

        const message = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .content {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #e4e4e4;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: #007bff;
                    color: white;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .header h2 {
                    margin: 0;
                }
                .body {
                    padding: 20px 0;
                    color: #333333;
                }
                .body p {
                    margin: 0 0 10px;
                }
                .order-details {
                    margin-top: 20px;
                    border-collapse: collapse;
                    width: 100%;
                }
                .order-details th, .order-details td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                .order-details th {
                    background-color: #f2f2f2;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    color: #777777;
                    border-top: 1px solid #e4e4e4;
                }
                .footer p {
                    margin: 0;
                }
                .cta-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: white;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <div class="header">
                        <h2>Order Confirmation</h2>
                    </div>
                    <div class="body">
                        <p>Dear ${user.name},</p>
                        <p>Thank you for your order! Your order has been placed successfully. Below are the details of your order:</p>
                        <table class="order-details">
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            ${itemsHTML}
                            <tr>
                                <td><strong>Total</strong></td>
                                <td>${cart.quantity}</td>
                                <td><strong>${cart.totalPrice}</strong></td>
                            </tr>
                        </table>
                        <p>You can track your order status by clicking the button below:</p>
                        <p><a href="http://localhost:5173/my-orders" class="cta-button">Track Order</a></p>
                        <p>If you have any questions or need further assistance, please feel free to contact our customer service team.</p>
                        <p>Best regards,</p>
                        <p>Pizza Prime</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Pizza Prime. All rights reserved.</p>
                        <p>123 Your Street, Your City, Your Country</p>
                        <p><a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `
        console.log(cart)
        try {
            await sendMail({
                email: cart.customer.email,
                subject: "Status Update",
                message: message
            });
        }
        catch (error) {
            console.log(error.message);
            throw new Error("Password reset rejected");
        }
        return url;
    }
    catch (error) {
        console.log("Failed to create Order");
        console.log(error.message);
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
        const orders = await Order.find({ customer: userId }).populate('customer')
            .populate('customer')
            .populate('deliveryAddress')
            .populate({
                path: 'items',
                populate: [
                    { path: 'base' },
                    { path: 'pizza' },
                    { path: 'toppings' },
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

export const getAllOrders = async () => {
    try {
        const orders = await Order.find({}).populate('customer')
            .populate('customer')
            .populate('deliveryAddress')
            .populate({
                path: 'items',
                populate: [
                    { path: 'base' },
                    { path: 'pizza' },
                    { path: 'toppings' },
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

        const order = await Order.findById(orderId).populate('customer');
        if (!order) {
            throw new Error("Order not found");
        }
        // console.log(order.customer.email);
        order.orderStatus = orderStatus;
        await order.save();

        // send notification
        const message = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Status Update</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .content {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #e4e4e4;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: #007bff;
                    color: white;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .header h2 {
                    margin: 0;
                }
                .body {
                    padding: 20px 0;
                    color: #333333;
                }
                .body p {
                    margin: 0 0 10px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    color: #777777;
                    border-top: 1px solid #e4e4e4;
                }
                .footer p {
                    margin: 0;
                }
                .status {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: white;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <div class="header">
                        <h2>Status Update</h2>
                    </div>
                    <div class="body">
                        <p>Dear ${order.customer.name},</p>
                        <p>We are writing to inform you that your status has been updated. Please find the details of your status update below:</p>
                        <p><strong>New Status:</strong> <span class="status">${order.orderStatus}</span></p>
                        <p>If you have any questions or need further assistance, please feel free to contact us.</p>
                        <p>Best regards,</p>
                        <p>Prime Pizza</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Prime Pizza. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        
        `

        try {
            await sendMail({
                email: order.customer.email,
                subject: "Status Update",
                message: message
            });
        }
        catch (error) {
            throw new Error("Password reset rejected");
        }
        // await notificationService.sendOrderStatusNotification(order);
        return order;
    }
    catch (error) {
        console.log("Error in updateOrder");
        console.log(error.message);
        throw new Error(error.message);
    }
}