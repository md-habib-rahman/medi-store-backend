import express from "express";
import { publicController } from "./public.controller";

const router = express.Router()

router.get('/manufacturer', publicController.getManufacturers)
router.get('/seller/:sellerId', publicController.getSellerInfo)
router.get('/seller/:sellerId/all-medicine', publicController.getSellerMedicine)

export const publicROuter = router