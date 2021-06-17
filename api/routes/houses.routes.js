import express from 'express';
import { listAllHouses, addHouse, addHabitant, deleteHouse, getHouse, deleteHabitant } from '../controllers/houses.controllers.js';

const router = express.Router();

router.route('/').get(listAllHouses);
router.route('/:id').get(getHouse);
router.route('/').post(addHouse);
router.route('/:id/habitants').put(addHabitant);
router.route('/:id/habitants').delete(deleteHabitant);
router.route('/:id').delete(deleteHouse);

export default router;