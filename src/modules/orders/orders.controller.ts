import { Request, Response } from "express"
import { prisma } from "../../lib/prisma"
import { Medicines } from "../../../generated/prisma/client";

interface OrderRequest {
	shippingAddress: string;
	items: {
		medicineId: string;
		quantity: number;
	}[];
}

const createOrder = async (req: Request<{}, {}, OrderRequest>, res: Response) => {
	const customerId = req.user?.id as string
	const { shippingAddress, items } = req.body

	try {
		const order = await prisma.$transaction(async (tx) => {
			let orderPrice = 0 as number;

			const medicineIds = items.map((i) => i.medicineId)

			const medicines = await tx.medicines.findMany({
				where: {
					id:
						{ in: medicineIds }
				}
			})

			const orderItems = items.map((item) => {
				const medicine: Medicines = medicines.find(
					(m) => m.id === item.medicineId
				);
				orderPrice = orderPrice + (medicine.price * item.quantity);
				return {
					medicineId: medicine.id,
					quantity: item.quantity,
					unitPrice: medicine.price
				}
			})

			const order = await tx.orders.create({
				data: {
					customerId,
					shippingAddress,
					totalPrice: orderPrice,
					items: {
						createMany: {
							data: orderItems
						}
					}
				}
			})
			await Promise.all(
				orderItems.map(item => tx.medicines.update({
					where: {
						id: item.medicineId
					},
					data: {
						availableQuantity: {
							decrement: item.quantity
						}
					}
				}))
			)
			return order
		})
		res.status(201).json(order)

	} catch (err) {
		res.status(400).json({
			error: "Your order has been failed!",
			details: err
		})
	}
}

export const orderController = {
	createOrder
}