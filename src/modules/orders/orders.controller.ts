import { Request, Response } from "express";
import { OrderRequest } from "../../types/order";
import { orderService } from "./orders.services";
import { success, User } from "better-auth";
import { UserRole } from "../../middlewares/auth";



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


export const orderController = {
	createOrder,	
	getSingleOrder
}