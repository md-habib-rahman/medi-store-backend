import { Request, Response } from "express";


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

export const userController = {
	getCurrentUser
}