
import { Medicines, OrderStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UpdateMedicine } from "../../types/order";


const createMedicine = async (data: Omit<Medicines, "id" | "createdAt" | "updatedAt" | "sellerId">, userId: string) => {
	const result = await prisma.medicines.create({
		data: {
			...data,
			sellerId: userId
		}
	})
	return result
}

const updateMedicine = async (medicineId: string, userId: string, payload: UpdateMedicine) => {
	const medicine = await prisma.medicines.findFirst({
		where: {
			id: medicineId,
			sellerId: userId
		}
	})

	if (!medicine) {
		throw new Error("Medicine not found in DB!")
	}

	const updateMedicine = await prisma.medicines.update({
		where: {
			id: medicineId,
		},
		data: { ...payload }
	})
	return updateMedicine;
}

const deleteMedicine = async (medicineId: string, userId: string) => {
	const medicine = await prisma.medicines.findFirst({
		where: {
			id: medicineId,
			sellerId: userId
		}
	})

	if (!medicine) {
		throw new Error("Medicine not found in DB!")
	}

	const result = await prisma.medicines.delete({
		where: {
			id: medicineId
		}
	})

	return result
}

const getOrders = async (sellerId: string) => {
	const result = await prisma.orders.findMany({
		where: {
			sellerId, orderStatus: {
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


const updateOrderStatus = async (orderId: string, status:OrderStatus, userId: string) => {
	// console.log({ orderId, status, userId })
	const order = await prisma.orders.findFirst({
		where: {
			id: orderId,
			sellerId: userId
		}
	})

	if (!order) {
		throw new Error("Order not found!")
	}
	// console.log(order)
	return await prisma.orders.update({
		where: { id: orderId },
		data: {
			orderStatus: status
		}
	})

	// return result
}

export const sellerService = {
	createMedicine,
	updateMedicine,
	deleteMedicine,
	getOrders,
	updateOrderStatus
}