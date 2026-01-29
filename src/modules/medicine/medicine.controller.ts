import { Request, Response } from "express";
import { sellerService } from "./medicine.service";


const createMedicine = async (req: Request, res: Response) => {
	const user = req.user
	if (!user) {
		return res.status(403).json({
			error: "Unauthorized!",
		})
	}
	try {
		console.log(req.body)
		const result = await sellerService.createMedicine(req.body, user.id as string)
		res.status(201).json(result)
	} catch (err) {
		res.status(400).json({
			error: "Medicine adding failed with error",
			details: err
		})
	}
}

export const sellerController = {
	createMedicine
}