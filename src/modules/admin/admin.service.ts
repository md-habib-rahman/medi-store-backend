import { prisma } from "../../lib/prisma"
import { UserRole, UserStatus } from "../../middlewares/auth"

interface userWhereCondition {
	id?: string;
	email?: string;
}
const getUsers = async ({ page, limit, skip, sortBy, sortOrder, id, email }: { page: number, limit: number, skip: number, sortBy: string, sortOrder: string, id?: string|undefined, email?: string|undefined }) => {
	let where: userWhereCondition = {}

	if (id) {
		where.id = id
	}

	if (email) {
		where.email = email
	}

	const res = await prisma.user.findMany({
		take: limit,
		skip,
		where,
		orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
	})

	const total = await prisma.user.count({
		where
	})

	return {
		data: res,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit)
		}
	}

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

const updateUserRole = async (userId: string, role: UserRole) => {
	const update = prisma.user.update({
		where: {
			id: userId
		}, data: {
			role: role
		}
	})
	return update
}

export const adminService = {
	getUsers,
	updateUserStatus,
	updateUserRole
}
