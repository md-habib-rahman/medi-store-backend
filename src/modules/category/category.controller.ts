import { Request, Response } from "express"
import { categoryService } from "./category.service"
import { success } from "better-auth"

const getAllCategory = async (req: Request, res: Response) => {
	try {
		const result = await categoryService.getAllCategory()
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "There was an error fetching categories data!",
			details: err
		})
	}
}

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
	createCategory,
	getAllCategory
}
