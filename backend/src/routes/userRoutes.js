import {Router} from 'express';
import {fetchBases,fetchToppings, fetch_all_pizza, newLaunches,fetchRecommended, searchPizza, fetchPizzaMania} from '../controllers/pizzaController.js';
import {addAddress} from '../controllers/authController.js';
import auth from '../middleware/auth.js';
const router = Router();

// routes
router.get('/search-pizza',searchPizza);
router.get('/new-launches',newLaunches);
router.get('/recommended',fetchRecommended);
router.get('/pizza-mania',fetchPizzaMania);
router.get('/fetch-bases',fetchBases);
router.get('/fetch-toppings',fetchToppings);
router.get('/fetch-all-pizza',fetch_all_pizza);
router.post('/add-address',auth,addAddress);

export default router;