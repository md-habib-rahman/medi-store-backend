import { Request, Response } from "express"
import { categoryService } from "./category.service"



const createCategory = async (req: Request, res: Response) => {
	try {

		const user = req.user
		if (!user) {
			return res.status(403).json({
				error: "Unauthorized!",

			})
		}
		const result = await categoryService.createCategory(req.body, user.id as string)
		console.log(result)
		res.status(201).json(result)
	} catch (err) {
		res.status(400).json({
			error: "Category adding failed with error",
			details: err
		})
	}
}


export const categoryController = {
	createCategory
}
