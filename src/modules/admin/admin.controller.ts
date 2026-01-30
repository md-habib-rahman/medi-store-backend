import { success } from "better-auth";
import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { UserStatus } from "../../middlewares/auth";

const getUsers = async (req: Request, res: Response) => {

	try {
		const users = await adminService.getUsers()
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
	const { id } = req.params!.id as string
	const { status } = req.body
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

export const adminController = {
	getUsers,
	updateUserStatus
}