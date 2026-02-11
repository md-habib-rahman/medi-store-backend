import { Medicines, Prisma } from "../../../generated/prisma/client";
import { MedicinesWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { UpdateMedicine, WhereCondition } from "../../types/order";

// const getSingleMedicine = async (medicineId: string) => {
// 	const medicine = await prisma.medicines.findUnique({
// 		where: {
// 			id: medicineId
// 		}
// 	})
// 	return medicine
// }

//public get all medicine api
const getAllMedicine = async ({
	page, limit, skip, sellerId, categoryId, sortBy, sortOrder, id, manufacturer, maxprice
}: {
	page: number, limit: number, skip: number, sellerId?: string, categoryId?: string, sortBy?: string | undefined, sortOrder?: string | undefined, id?: string | undefined, manufacturer?: string | undefined, maxprice?: number | undefined
}) => {

	let where: WhereCondition = {}
	if (sellerId) {
		where.sellerId = sellerId
	}
	if (categoryId) {
		where.categoryId = categoryId
	}
	if (manufacturer) {
		where.manufacturer = manufacturer
	}
	if (id) {
		where.id = id;
	}
	if (maxprice) {
		where.price = {
			lte: maxprice
		}
	}
	// console.log(where)

	const allMedicine = await prisma.medicines.findMany({
		take: limit,
		skip,
		where,
		orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
		include: {
			category: {
				select: {
					title: true
				}
			},
			seller: {
				select: {
					name: true
				}
			}
		}
	})

	const total = await prisma.medicines.count({
		where
	})

	return {
		data: allMedicine,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit)
		}
	}
}

export const medicineService = {

	getAllMedicine,


}