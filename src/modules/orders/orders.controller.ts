import { Request, Response } from "express";
import { OrderRequest } from "../../types/order";
import { orderService } from "./orders.services";
import { success, User } from "better-auth";
import { UserRole } from "../../middlewares/auth";
import paginationHelper from "../../helper/paginationHelper";
import { role } from "better-auth/plugins";



const getSingleOrder = async (req: Request, res: Response) => {
	const userId: string = req.user?.id as string
	const orderId: string = req.params.id as string
	const userRole: string = req.user?.role as string
	try {
		const result = await orderService.getSingleOrder(userId, orderId, userRole)
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: "Fetching order failed!",
			error: err.message,
		});
	}

}

const createOrder = async (
	req: Request<{}, {}, OrderRequest>,
	res: Response
) => {
	try {
		const customerId = req.user!.id;

		const order = await orderService.createOrder(customerId, req.body);

		res.status(201).json({
			success: true,
			data: order,
		});
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: "Your order has been failed!",
			error: err.message,
		});
	}
};

const getOrders = async (req: Request, res: Response) => {

	// console.log("HIT")
	let customerId;
	let sellerId;
	try {
		if (req?.user?.role === UserRole.CUSTOMER) {
			customerId = req?.user?.id as string | undefined
		}
		if (req?.user?.role === UserRole.SELLER) {
			sellerId = req?.user?.id as string
		}
		const orderId = req?.query?.orderId as string

		const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query)
		const order = await orderService.getOrders({ sellerId, customerId, page, limit, skip, sortBy, sortOrder, orderId })
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


export const orderController = {
	createOrder,
	getSingleOrder,
	getOrders
}