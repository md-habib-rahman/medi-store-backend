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
	page, limit, skip, sellerId, categoryId, sortBy, sortOrder, id
}: {
	page: number, limit: number, skip: number, sellerId?: string, categoryId?: string, sortBy?: string | undefined, sortOrder?: string | undefined, id?: string | undefined
}) => {

	let where: WhereCondition = {}
	if (sellerId) {
		where.sellerId = sellerId
	}
	if (categoryId) {
		where.categoryId = categoryId
	}
	if (id) {
		where.id = id;
	}
	// let orderBy: Prisma.MedicinesOrderByWithRelationInput = {
	// 	createdAt: "desc",
	// }
	// if (sortBy && sortOrder) {
	// 	orderBy = {
	// 		[sortBy]: sortOrder
	// 	} as Prisma.MedicinesOrderByWithRelationInput
	// }

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

	
	return allMedicine;
}

export const medicineService = {

	getAllMedicine,
	

}