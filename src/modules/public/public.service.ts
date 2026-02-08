import { prisma } from "../../lib/prisma"

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

export const publicService = {
	getManufacturers
}