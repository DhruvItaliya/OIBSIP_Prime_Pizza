import { Router } from "express";
import { createOrder, deleteOrder, getAllUserOrders, updateOrder } from "../controllers/orderController.js";
import auth from '../middleware/auth.js';
const router = Router();

router.post('/create-order',auth,createOrder);
router.get('/get-all-orders',getAllUserOrders);
router.delete('/delete-order',deleteOrder);
router.post('/delete-order',updateOrder);

export default router;