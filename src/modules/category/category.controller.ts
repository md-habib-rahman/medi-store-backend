import { Request, Response } from "express"
import { categoryService } from "./category.service"
import paginationHelper from "../../helper/paginationHelper"

const getAllCategory = async (req: Request, res: Response) => {
	const { id } = req.query
	try {
		const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query)
		const result = await categoryService.getAllCategory(id as string, page, limit, skip, sortBy, sortOrder)
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
		// if (!user) {
		// 	return res.status(403).json({
		// 		error: "Unauthorized!",

		// 	})
		// }

		const result = await categoryService.createCategory(req.body, user?.id as string)
		// console.log(result)
		res.status(201).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "Category adding failed with error",
			details: err
		})
	}
}

const deleteCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const result = await categoryService.deleteCategory(id as string)
		return res.status(200).json({ success: true, data: result })
	} catch (err) {
		res.status(400).json({
			error: "Category deleting failed with error",
			details: err
		})
	}

}

const allCategoryWithoutPagination = async (req: Request, res: Response) => {
	try {
		const result = await categoryService.allCategoryWithoutPagination()
		// console.log(result)
		return res.status(200).json({ data: result })
	} catch (err) {
		return err
	}

}


export const categoryController = {
	createCategory,
	getAllCategory,
	deleteCategory,
	allCategoryWithoutPagination
}
