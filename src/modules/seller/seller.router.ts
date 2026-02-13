import express from 'express'
import { auth, UserRole } from '../../middlewares/auth'
import { sellerController } from './seller.controller'

const router = express.Router()

router.post('/medicines', auth(UserRole.SELLER), sellerController.createMedicine)

router.put('/medicines/:id', auth(UserRole.SELLER), sellerController.updateMedicine)

router.patch('/medicines/:id', auth(UserRole.SELLER), sellerController.stockUpdate)

router.delete('/medicines/:id', auth(UserRole.SELLER), sellerController.deleteMedicine)



router.patch('/orders/:id', auth(UserRole.SELLER), sellerController.updateOrderStatus)

export const sellerRouter = router