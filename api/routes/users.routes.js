import express from 'express'
import { registerUser, listAllUsers, authUser, deleteUser, getUser } from '../controllers/users.controllers.js'

const router = express.Router()

router.route('/').get(listAllUsers);
router.route('/').post(registerUser);
router.route('/:id').get(getUser);
router.route('/login').post(authUser);
router.route('/:id').delete(deleteUser);


export default router;