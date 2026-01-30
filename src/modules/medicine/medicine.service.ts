import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UpdateMedicine } from "../../types/order";

const getSingleMedicine = async (medicineId: string) => {
	const medicine = await prisma.medicines.findUnique({
		where: {
			id: medicineId
		}
	})
	return medicine
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
export const medicineService = {
	createMedicine,
	getAllMedicine,
	getSingleMedicine,
	updateMedicine,
	deleteMedicine
}