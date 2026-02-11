import { Request, Response } from "express";
import { publicService } from "./public.service";
import paginationHelper from "../../helper/paginationHelper";

const getManufacturers = async (req: Request, res: Response) => {
	try {
		const result = await publicService.getManufacturers()
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

const getSellerMedicine = async (req: Request, res: Response) => {
	try {
		const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query)

		const maxprice = Number(req?.query?.maxprice)

		const sellerId = req?.params.sellerId

		const categoryId = req.query.categoryId as string

		const manufacturer = req.query.manufacturer as string

		console.log({ page, limit, skip, sortBy, sortOrder, maxprice, sellerId, categoryId, manufacturer })

		const result = await publicService.getSellerMedicine({ page, limit, skip, sortBy, sortOrder, maxprice, sellerId, categoryId, manufacturer })
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

const getSellerInfo = async (req: Request, res: Response) => {

	try {
		const { sellerId } = req.params
		const result = await publicService.getSellerInfo({ sellerId })
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "There was an error fetching seller data!",
			details: err
		})
	}
}

export const publicController = {
	getManufacturers,
	getSellerInfo,
	getSellerMedicine
}