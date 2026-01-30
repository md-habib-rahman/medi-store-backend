import { prisma } from "../../lib/prisma"
import { UserStatus } from "../../middlewares/auth"


const getUsers = async () => {

	return await prisma.user.findMany()

}

const updateUserStatus = async (userId: string, status: UserStatus) => {
	const update = prisma.user.update({
		where: {
			id: userId
		}, data: {
			status: status
		}
	})
	return update
}

export const adminService = {
	getUsers,
	updateUserStatus
}