import express from "express"
import { sellerController } from "./seller.controller";

const router = express.Router()

router.post('/medicines',sellerController.createMedicine)

export const sellerRouter = router;