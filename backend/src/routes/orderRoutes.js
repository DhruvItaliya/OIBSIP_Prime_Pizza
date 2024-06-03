import { Router } from "express";
import { createOrder, deleteOrder, getAllUserOrders, updateOrder } from "../controllers/orderController.js";
import auth from '../middleware/auth.js';
const router = Router();

// router.post('/checkout-order',auth,checkoutOrder);
router.post('/create-order',auth,createOrder);
router.get('/my-orders',auth,getAllUserOrders);
router.delete('/delete-order/:orderId',auth,deleteOrder);
router.put('/update-order/:orderId/:orderStatus',updateOrder);

export default router;