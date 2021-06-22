import express from 'express'
import { registerUser, listAllUsers, authUser, deleteUser, getUser, resetPwd } from '../controllers/users.controllers.js'

const router = express.Router()

router.route('/').get(listAllUsers);
router.route('/').post(registerUser);
router.route('/:id').get(getUser);
router.route('/login').post(authUser);
router.route('/:id').delete(deleteUser);
router.route('/:id/resetpwd').post(resetPwd);


export default router;