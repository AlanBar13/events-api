import express from 'express';
import { listEvents, addEvent, getEvent, deleteEvent } from '../controllers/events.controllers.js';

const router = express.Router();

router.route('/').get(listEvents);
router.route('/').post(addEvent);
router.route('/:id').get(getEvent);
router.route('/:id').delete(deleteEvent);

export default router;