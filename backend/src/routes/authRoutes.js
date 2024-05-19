import {Router} from 'express';
import {signup,signin} from '../controllers/authController.js';
const router = Router();

// routes for signup and signin
router.post('/signup',signup);
router.post('/signin',signin);

export default router;