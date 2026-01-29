import express from "express"
import { medicineController } from "./medicine.controller";
import { auth, UserRole } from "../../middlewares/auth";

const router = express.Router()

router.get('/', medicineController.getAllMedicine)

router.get('/:id', medicineController.getSingleMedicine)

router.post('/', auth(UserRole.SELLER), medicineController.createMedicine)

export const medicineRouter = router;