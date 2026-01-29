import express from 'express'
import { auth, UserRole } from '../../middlewares/auth'
import { userController } from './user.controller'

const router = express.Router()

router.get('/', auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), userController.getCurrentUser)

export const UserRouter = router 