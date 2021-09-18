import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { makePayment } from '../controllers/transactions.controllers.js'

const router = express.Router()

router.route('/paymentIntent').post(protect, makePayment)

export default router