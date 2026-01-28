import { Request, Response } from "express"
import { adminService } from "./admin.service"



const createCategory = async (req: Request, res: Response) => {
	try {
		// console.log(req.body)
		const result = await adminService.createCategory(req.body)
		console.log(result)
		res.status(201).json(result)
	} catch (err) {
		res.status(400).json({
			error: "Category adding failed with error",
			details: err
		})
	}
}


export const adminController = {
	createCategory
}
