import { Request, Response } from "express";
import { publicService } from "./public.service";

const getManufacturers = async (req: Request, res: Response) => {
	try {
		const result = await publicService.getManufacturers()
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (err) {
		res.status(400).json({
			error: "There was an error fetching categories data!",
			details: err
		})
	}
}

export const publicController = {
	getManufacturers,
}