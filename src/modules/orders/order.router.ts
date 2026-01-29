import express from "express"
import { auth, UserRole } from "../../middlewares/auth";
import { orderController } from "./orders.controller";

const router = express.Router()

router.post('/', auth(UserRole.CUSTOMER), orderController.createOrder)

export const orderRouter = router;