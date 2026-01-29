import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { success } from "better-auth";

const getSingleMedicine = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await medicineService.getSingleMedicine(id as string)
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "Error in fetching Medicines Data!",
			details: err
		})
	}
}

const getAllMedicine = async (req: Request, res: Response) => {
	try {
		const result = await medicineService.getAllMedicine()
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "Error in fetching Medicines Data!",
			details: err
		})
	}
}

const createMedicine = async (req: Request, res: Response) => {
	const user = req.user
	if (!user) {
		return res.status(403).json({
			error: "Unauthorized!",
		})
	}
	try {
		console.log(req.body)
		const result = await medicineService.createMedicine(req.body, user.id as string)
		res.status(201).json(result)
	} catch (err) {
		res.status(400).json({
			error: "Medicine adding failed with error",
			details: err
		})
	}
}

export const medicineController = {
	createMedicine,
	getAllMedicine,
	getSingleMedicine
}