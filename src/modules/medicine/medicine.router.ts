import express from "express"
import { medicineController } from "./medicine.controller";
import { auth, UserRole } from "../../middlewares/auth";
import { categoryController } from "../category/category.controller";

const router = express.Router()

router.get('/', medicineController.getAllMedicine)

router.delete('/:id', auth(UserRole.ADMIN), categoryController.deleteCategory)

// router.get('/:id', medicineController.getSingleMedicine)

// router.post('/', auth(UserRole.SELLER), medicineController.createMedicine)

// router.put('/:id', auth(UserRole.SELLER), medicineController.updateMedicine)

export const medicineRouter = router;