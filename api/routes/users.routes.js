import express from 'express'
import { registerUser, listAllUsers, authUser } from '../controllers/users.controllers.js'

const router = express.Router()

router.route('/').get(listAllUsers)
router.route('/').post(registerUser);
// router.route('/:id').get()
router.route('/login').post(authUser)


export default router;