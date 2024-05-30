import {Router} from 'express';
import {fetchBases, fetch_all_pizza, newLaunches, searchPizza} from '../controllers/pizzaController.js';

const router = Router();

// routes
router.get('/search-pizza',searchPizza);
router.get('/new-launches',newLaunches);
router.get('/fetch-bases',fetchBases);
router.get('/fetch-all-pizza',fetch_all_pizza);

export default router;