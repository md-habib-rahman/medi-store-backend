import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

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

export const medicineController = {

	getAllMedicine,
	getSingleMedicine,
}