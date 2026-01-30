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

//public get all medicine api
const getAllMedicine = async () => {
	const allMedicine = await prisma.medicines.findMany()
	return allMedicine;
}

export const medicineService = {

	getAllMedicine,
	getSingleMedicine,

}