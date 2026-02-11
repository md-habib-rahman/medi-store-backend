import { Request, Response } from "express";
import { sellerService } from "./seller.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const createMedicine = async (req: Request, res: Response) => {
	const user = req.user
	if (!user) {
		return res.status(403).json({
			error: "Unauthorized!",
		})
	}
	try {
		// console.log(req.user, req.headers)
		// console.log(req.body)
		const result = await sellerService.createMedicine(req.body, user.id as string)
		res.status(201).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "Medicine adding failed with error",
			details: err
		})
	}
}

const updateMedicine = async (req: Request, res: Response) => {
	const userId = req.user?.id as string
	const medicineId = req.params.id as string

	try {
		const result = await sellerService.updateMedicine(medicineId, userId, req.body)

		res.status(200).json({
			success: true,
			data: result
		})

	} catch (err) {
		res.status(400).json({
			error: "Medicine adding failed with error",
			details: err
		})
	}
}

const stockUpdate = async (req: Request, res: Response) => {
	const userId = req.user?.id as string
	const medicineId = req.params.id as string
	console.log(req.body)

	const quantity = req.body.quantity as number | undefined

	try {
		const result = await sellerService.stockeUpdate(medicineId, userId, quantity as number)

		res.status(200).json({
			success: true,
			data: result
		})

	} catch (err) {
		res.status(400).json({
			error: "Medicine adding failed with error",
			details: err
		})
	}
}

const deleteMedicine = async (req: Request, res: Response) => {
	const userId = req.user?.id as string
	const medicineId = req.params.id as string

	try {
		const result = await sellerService.deleteMedicine(medicineId, userId)

		res.status(200).json({
			success: true,
			data: result
		})

	} catch (err) {
		res.status(400).json({
			error: "Medicine adding failed with error",
			details: err
		})
	}
}

const getOrders = async (req: Request, res: Response) => {
	const sellerId = req.user!.id;
	try {
		const order = await sellerService.getOrders(sellerId)
		res.status(200).json({
			success: true,
			data: order
		})

	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Order fetching failed!",
			error: err,
		});
	}
}

const updateOrderStatus = async (req: Request, res: Response) => {
	const { id } = req.params
	const orderStatus = req.body.orderStatus as OrderStatus
	const userId = req.user!.id
	try {
		const result = await sellerService.updateOrderStatus(id as string, orderStatus, userId)

		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Order update failed!",
			error: err,
		});
	}
}

export const sellerController = {
	createMedicine,
	updateMedicine,
	deleteMedicine,
	getOrders,
	updateOrderStatus,
	stockUpdate
}