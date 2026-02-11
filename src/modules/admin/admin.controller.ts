import { success } from "better-auth";
import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { UserRole, UserStatus } from "../../middlewares/auth";
import paginationHelper from "../../helper/paginationHelper";
import { User } from "../../../generated/prisma/client";

const getUsers = async (req: Request, res: Response) => {

	const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req.query)
	const id = req.query.id as string | undefined
	const email = req.query.email as string | undefined

	// console.log(req.query)

	try {
		const users = await adminService.getUsers({ page, limit, skip, sortBy, sortOrder, id, email })
		res.status(200).json({
			success: true,
			data: users
		})

	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Error fetching users!",
			error: err,
		});
	}
}

const updateUserStatus = async (req: Request, res: Response) => {
	const id = req.params.id as string
	const { status } = req.body

	// console.log(req.body)
	try {
		const result = await adminService.updateUserStatus(id, status as UserStatus)
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Error updating user's status!",
			error: err,
		});
	}

}

const updateUserRole = async (req: Request, res: Response) => {
	const id = req.params.id as string
	const { role } = req.body


	try {
		const result = await adminService.updateUserRole(id, role)
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Error updating user's role!",
			error: err,
		});
	}

}

export const adminController = {
	getUsers,
	updateUserStatus,
	updateUserRole
}