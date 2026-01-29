import { Categories } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getAllCategory = async () => {
	const result = await prisma.categories.findMany()
	return result;
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

export const categoryService = {
	createCategory,
	getAllCategory
}