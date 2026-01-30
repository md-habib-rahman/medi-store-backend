import { prisma } from "../../lib/prisma";
import { Medicines, OrderStatus } from "../../../generated/prisma/client";
import { OrderRequest } from "../../types/order";
import { UserRole } from "../../middlewares/auth";

const getOrders = async (customerId: string) => {
	const result = await prisma.orders.findMany({
		where: {
			customerId, orderStatus: {
				not: OrderStatus.DELIVERED
			}
		},
		orderBy: { createdAt: 'desc' },
		include: {
			items: {
				include: {
					medicine: {
						select: {
							id: true,
							title: true,
							thumbnail: true
						}
					}
				}
			}
		}
	})

	return result
}

const getSingleOrder = async (userId: string, orderId: string, userRole: string) => {

	const condition = userRole === UserRole.CUSTOMER ? {
		id: orderId, customerId: userId
	} : { id: orderId, sellerId: userId }

	const order = await prisma.orders.findFirst({
		where: condition,
		include: {
			items: {
				include: {
					medicine: true
				}
			}
		}
	})

	return order
}

const createOrder = async (
	customerId: string,
	payload: OrderRequest
) => {
	const { shippingAddress, items } = payload;

	return prisma.$transaction(async (tx) => {
		let orderPrice = 0;
		// let sellerId = "";

		const medicineIds = items.map((i) => i.medicineId);

		const medicines = await tx.medicines.findMany({
			where: {
				id: { in: medicineIds },
			},
		});

		const sellerId = medicines[0].sellerId;

		const orderItems = items.map((item) => {
			const medicine = medicines.find(
				(m) => m.id === item.medicineId
			) as Medicines;

			orderPrice += medicine.price * item.quantity;
			// sellerId = medicine.sellerId;
			return {
				medicineId: medicine.id,
				quantity: item.quantity,
				unitPrice: medicine.price,

			};
		});

		const order = await tx.orders.create({
			data: {
				customerId,
				shippingAddress,
				sellerId,
				totalPrice: orderPrice,
				items: {
					createMany: {
						data: orderItems,
					},
				},
			},
		});

		await Promise.all(
			orderItems.map((item) =>
				tx.medicines.update({
					where: { id: item.medicineId },
					data: {
						availableQuantity: {
							decrement: item.quantity,
						},
					},
				})
			)
		);

		return order;
	});
};

export const orderService = {
	createOrder,
	getOrders,
	getSingleOrder
}