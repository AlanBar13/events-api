import express from 'express';
import { listEvents, addEvent, getEvent, deleteEvent, getEventByUser } from '../controllers/events.controllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(listEvents);
router.route('/').post(protect, addEvent);
router.route('/:id').get(getEvent);
router.route('/byUser/:userid').get(getEventByUser);
router.route('/:id').delete(protect, deleteEvent);

export default router;