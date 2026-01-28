import { Request, Response } from "express";
import { sellerService } from "./seller.service";


const createMedicine = async (req: Request, res: Response) => {
	try {
		console.log(req.body)
		const result = await sellerService.createMedicine(req.body)
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