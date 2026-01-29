import { Categories } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"


const createCategory = async (data: Omit<Categories, "id" | "createdAt" | "updatedAt" | "adminId">, userId: string) => {

	const result = await prisma.categories.create({
		data: {
			...data,
			adminId: userId
		}

	})
	// console.log(result)
	return result
}

export const categoryService = {
	createCategory
}