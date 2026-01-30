import express from 'express'
import { auth, UserRole } from '../../middlewares/auth'
import { adminController } from './admin.controller'

const router = express.Router()

router.get('/users', auth(UserRole.ADMIN), adminController.getUsers)

router.patch('/users/:id', auth(UserRole.ADMIN), adminController.updateUserStatus)

export const adminRouter = router