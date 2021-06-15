import express from 'express'

const router = express.Router()

router.route('/')
    .get()
    .post()
router.route('/:id').get()
router.route('/login').post()


export default router