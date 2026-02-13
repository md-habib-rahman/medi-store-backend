import { Request, Response } from "express";
import { userService } from "./user.service";


const getCurrentUser = async (req: Request, res: Response) => {
	const user = req.user;
	if (!user) {
		return res.status(400).json({
			success: false,
			message: "Please login!"
		})
	}
	try {
		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: err.message
		})
	}

}

const updateImage = async (req: Request, res: Response) => {
	const { id } = req.user

	const { userId } = req.params

	const { imageUrl } = req.body

	if (id !== userId) {
		return res.status(403).json({
			success: false,
			error: "Forbidden"
		})
	}
	// console.log(imageUrl)
	try {
		const result = await userService.updateImage({ id, imageUrl })
		console.log(result)
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: err.message
		})
	}

}

const updateUserInfo = async (req: Request, res: Response) => {
	const { id } = req.user

	const { userId } = req.params

	if (id !== userId) {
		return res.status(403).json({
			success: false,
			error: "Forbidden"
		})
	}
	// console.log(imageUrl)
	try {
		const result = await userService.updateUserInfo(id, req.body)
		console.log(result)
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err: any) {
		res.status(400).json({
			success: false,
			message: err.message
		})
	}

}

export const userController = {
	getCurrentUser,
	updateImage,
	updateUserInfo
}