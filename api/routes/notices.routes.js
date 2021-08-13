import express from 'express'
import { listNotices, getNotice, addNotice, deleteNotice, addComment, deleteComment, updateNotice } from '../controllers/notices.controllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(listNotices)
router.route('/').post(protect, addNotice)
router.route('/:id/comment').post(protect, addComment)
router.route('/:noticeId/comment/:commentId').delete(protect, deleteComment)
router.route('/:id').get(getNotice)
router.route('/:id').patch(protect, updateNotice)
router.route('/:id').delete(protect, deleteNotice)

export default router