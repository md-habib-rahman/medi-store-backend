import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import paginationHelper from "../../helper/paginationHelper";

// const getSingleMedicine = async (req: Request, res: Response) => {
// 	const { id } = req.params
// 	try {
// 		const result = await medicineService.getSingleMedicine(id as string)
// 		res.status(200).json({
// 			success: true,
// 			data: result
// 		})
// 	} catch (err) {
// 		res.status(400).json({
// 			error: "Error in fetching Medicines Data!",
// 			details: err
// 		})
// 	}
// }

const getAllMedicine = async (req: Request, res: Response) => {
	try {

		const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query)

		const sellerId = req?.query?.sellerId as string

		const categoryId = req.query.categoryId as string

		const id = req.query.id as string | undefined

		const result = await medicineService.getAllMedicine({ page, limit, skip, sellerId, categoryId, sortBy, sortOrder, id })
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

}