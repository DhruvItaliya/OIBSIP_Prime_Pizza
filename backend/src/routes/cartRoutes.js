import { Router } from "express";
import { addItemToCart, calculateCartTotals, clearCart, createCart, findUserCart, removeItemFromCart, updateCartItemQuantity } from "../controllers/cartController.js";
import auth from '../middleware/auth.js';
const router = Router();

router.post('/create-cart',auth,createCart);
router.post('/add-to-cart',auth,addItemToCart);
router.post('/update-cart',auth,updateCartItemQuantity);
router.get('/remove-cart-item/:id',auth,removeItemFromCart);
router.get('/calculate-cart-totals',auth,calculateCartTotals);
router.get('/find-user-cart',auth,findUserCart);
router.get('/clear-cart',auth,clearCart);

export default router;
