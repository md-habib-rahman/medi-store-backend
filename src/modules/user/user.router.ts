import express from 'express'
import { auth, UserRole } from '../../middlewares/auth'
import { userController } from './user.controller'

const router = express.Router()

router.get('/', auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), userController.getCurrentUser)
router.patch('/updateImage/:userId', auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), userController.updateImage)

export const UserRouter = router