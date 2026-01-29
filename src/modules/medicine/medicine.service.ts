import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getSingleMedicine = async (medicineId: string) => {
	const medicine = await prisma.medicines.findUnique({
		where: {
			id: medicineId
		}
	})
	return medicine
}

const getAllMedicine = async () => {
	const allMedicine = await prisma.medicines.findMany()
	return allMedicine;
}

const createMedicine = async (data: Omit<Medicines, "id" | "createdAt" | "updatedAt" | "sellerId">, userId: string) => {
	const result = await prisma.medicines.create({
		data: {
			...data,
			sellerId: userId
		}
	})
	return result
}

export const medicineService = {
	createMedicine,
	getAllMedicine,
	getSingleMedicine
}