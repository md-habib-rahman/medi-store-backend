import { Categories } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getAllCategory = async (id: string, page: number, limit: number, skip: number, sortBy?: string | undefined, sortOrder?: string | undefined,) => {
	const result = await prisma.categories.findMany({
		take: limit,
		skip,
		where: {
			id
		},
		orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },

	})

	const total = await prisma.categories.count({

		where: {
			id
		},


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

const createCategory = async (data: Omit<Categories, "id" | "createdAt" | "updatedAt" | "adminId">, userId: string) => {
	const result = await prisma.categories.create({
		data: {
			...data,
			adminId: userId
		}
	})
	return result
}

const deleteCategory = async (id: string) => {
	// console.log({ id })
	const result = await prisma.categories.delete({
		where: {
			id
		}
	})
	return result;
	// console.log(result)
}

const allCategoryWithoutPagination = async () => {
	const res = await prisma.categories.findMany({
		select: {
			id: true,
			title: true
		}, orderBy: { title: "asc" },
	})
	// console.log(res)
	return res
}

export const categoryService = {
	createCategory,
	getAllCategory,
	deleteCategory,
	allCategoryWithoutPagination
}