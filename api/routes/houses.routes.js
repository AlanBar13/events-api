import express from 'express';
import { listAllHouses, addHouse, addHabitant, deleteHouse, getHouse, deleteHabitant, getHouseByUser } from '../controllers/houses.controllers.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protect, listAllHouses);
router.route('/:id').get(protect, getHouse);
router.route('/byUser/:userid').get(protect, getHouseByUser);
router.route('/').post(protect, addHouse);
router.route('/:id/habitants').put(protect, addHabitant);
router.route('/:id/habitants').delete(protect, deleteHabitant);
router.route('/:id').delete(protect, deleteHouse);

export default router;