import { prisma } from "../../lib/prisma"
import { WhereCondition } from "../../types/order"

const getManufacturers = async () => {
	const res = await prisma.medicines.findMany({
		select: {
			manufacturer: true,

		},
		distinct: ['manufacturer'],
		orderBy: {
			manufacturer: 'asc'
		}
	})
	return res
}
const getSellerInfo = async ({ sellerId }: { sellerId: string | undefined }) => {
	//console.log(sellerId)
if(!sellerId) throw new Error("Seller ID is required")
	const res = await prisma.user.findUnique({
		where: {
			id: sellerId
		},
	})
	return res
}

const getSellerMedicine = async (
	{ page, limit, skip, sortBy, sortOrder, maxprice, sellerId, categoryId, manufacturer }:
		{ page: number, limit: number, skip: number, sortBy: string, sortOrder: string, maxprice: number, sellerId: string, categoryId: string, manufacturer: string }) => {
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
	if (maxprice) {
		where.price = {
			lte: maxprice
		}
	}

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

export const publicService = {
	getManufacturers,
	getSellerInfo,
	getSellerMedicine
}
