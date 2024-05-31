import {Router} from 'express';
import {addBase,addTopping,createPizza, deletePizza, searchPizza} from '../controllers/pizzaController.js';
import {getAllOrders} from '../controllers/orderController.js';
import { getAllUsers } from '../controllers/authController.js';
import multer from 'multer';

const router = Router();

// middleware for uploading image 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/uploads/pizza_images');
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.originalname.split('.')[0]}_${file.fieldname}_${Date.now()}.${fileExtension}`);
    },
});

const upload = multer({ storage });

// routes
router.post('/add-base',addBase);
router.post('/add-toppings',addTopping);
router.post('/add-pizza',upload.single('pizza_image'),createPizza);
router.delete('/delete-pizza/:id',deletePizza);
router.get('/search-pizza',searchPizza);
router.get('/get-all-orders',getAllOrders);
router.get('/get-all-users',getAllUsers);

export default router;