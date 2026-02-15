import { Request, Response } from "express";
import { OrderRequest } from "../../types/order";
import { orderService } from "./orders.services";
import { UserRole } from "../../middlewares/auth";
import paginationHelper from "../../helper/paginationHelper";
import { ReviewPayload } from "../../types/review";
import { success } from "better-auth";



const getSingleOrder = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" })
	}
	const userId = req.user?.id as string
	const orderId = req.params?.id as string
	const userRole = req.user?.role as string
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
		const order = await orderService.getOrders({ sellerId:sellerId as string, customerId:customerId as string, page, limit, skip, sortBy, sortOrder, orderId:orderId as string })
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

const postReview = async (req: Request, res: Response) => {
	try {
		const userId = req.user!.id
		// const { orderId, review } = req?.body as ReviewPayload

		const result = await orderService.postReview(userId, req?.body)
		// console.log(result)
		if (!result.success) {
			return res.status(400).json({
				success: false,
				message: result.message
			})
		}
		return res.status(201).json(result)
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: "Your review has been failed to post!",
			error: err.message,
		});
	}
}


export const orderController = {
	createOrder,
	getSingleOrder,
	getOrders,
	postReview
}
