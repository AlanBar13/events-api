import express from 'express'
import { listNotices } from '../controllers/notices.controllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(listNotices)
//router.route('/').post(protect)
//router.route('/:id/comment').post(protect)
//router.route('/:id').get()
//router.route(':id').put(protect)
//router.route('/:id').delete(protect)

export default router