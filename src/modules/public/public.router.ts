import express from "express";
import { publicController } from "./public.controller";

const router = express.Router()

router.get('/', publicController.getManufacturers)

export const publicROuter = router