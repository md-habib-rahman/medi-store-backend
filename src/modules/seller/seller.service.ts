import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (data: Omit<Medicines, "id" | "createdAt" | "updatedAt">) => {
	const result = await prisma.medicines.create({
		data
	})
	return result
}

export const sellerService = {
	createMedicine
}