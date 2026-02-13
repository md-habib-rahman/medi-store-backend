import express from "express"
import { auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./orders.controller";

const router = express.Router()

router.post('/', auth(UserRole.CUSTOMER), orderController.createOrder)

router.get('/', auth(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN), orderController.getOrders)

router.get('/:id', auth(UserRole.CUSTOMER, UserRole.SELLER), orderController.getSingleOrder)

export const orderRouter = router;