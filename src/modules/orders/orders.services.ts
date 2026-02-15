import { prisma } from "../../lib/prisma";
import { Medicines } from "../../../generated/prisma/client";
import { OrderRequest, OrderWhereCondition } from "../../types/order";
import { UserRole } from "../../middlewares/auth";
import { ReviewPayload } from "../../types/review";


const getSingleOrder = async (userId: string|undefined, orderId: string|undefined, userRole: string|undefined) => {

	if(!userId ||!orderId){
		return null;
	}

	const condition = userRole === UserRole.CUSTOMER 
	? {id: orderId, customerId: userId} 
	: { id: orderId, sellerId: userId }

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
	const { shippingAddress, items, deliveryFee } = payload;

	return prisma.$transaction(async (tx) => {
		let orderPrice = 0;
		// let sellerId = "";

		const medicineIds = items.map((i) => i.medicineId);

		const medicines = await tx.medicines.findMany({
			where: {
				id: { in: medicineIds },
			},
		});

		if (!medicines || medicines.length === 0) throw new Error("No medicines found")
			const sellerId = medicines[0]?.sellerId;
		if(!sellerId) throw new Error("Seller not found")

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

		orderPrice += deliveryFee

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

const getOrders = async ({
	page, limit, skip, sellerId, customerId, sortBy, sortOrder, orderId }: {
		customerId: string | undefined,
		page: number, limit: number, skip: number, sellerId: string | undefined, sortBy?: string | undefined, sortOrder?: string | undefined, orderId?: string | undefined
	}) => {
	let where: OrderWhereCondition = {}
	if (sellerId) {
		where.sellerId = sellerId
	}
	if (customerId) {
		where.customerId = customerId
	}
	if (orderId) {
		where.orderId = orderId
	}

	const result = await prisma.orders.findMany({
		take: limit,
		skip,
		where,
		orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
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
			},
			review: {
				select: {
					id: true,
					orderId: true,
					comment: true
				}
			}
		}
	})

	const total = await prisma.orders.count({
		where
	})

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit)
		}
	}
}

const postReview = async (userId: string, payload: ReviewPayload) => {
	const ownOrder = await prisma.orders.findFirst({
		where: {
			id: payload.orderId,
			customerId: userId,
			orderStatus: "DELIVERED"
		}
	})
	if (!ownOrder) {
		return { success: false, message: "Order Not Found!" }
	}

	const res = await prisma.reviews.create({
		data: { ...payload }
	})
	return { success: true, res }
}

export const orderService = {
	createOrder,
	getOrders,
	getSingleOrder,
	postReview
}
