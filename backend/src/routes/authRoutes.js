import {Router} from 'express';
import {signup,signin,forgotPassword, resetPassword, logout,getOTP } from '../controllers/authController.js';
const router = Router();

// routes for signup and signin
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/logout',logout);
router.post('/get-otp',getOTP);
router.post('/forgot-password',forgotPassword);
router.patch('/reset-password/:token',resetPassword);

export default router;