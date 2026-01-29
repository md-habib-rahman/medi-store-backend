import express from "express"
import { sellerController } from "./medicine.controller";
import { auth, UserRole } from "../../middlewares/auth";

const router = express.Router()

router.post('/', auth(UserRole.SELLER), sellerController.createMedicine)

export const sellerRouter = router;