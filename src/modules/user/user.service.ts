import { prisma } from "../../lib/prisma"
import { updateUserInfoType } from "../../types/user"

const updateImage = async ({ id, imageUrl }: { id: string, imageUrl: string }) => {
	const result = await prisma.user.update({
		where: {
			id
		}, data: {
			image: imageUrl
		}
	})
	return result
}

const updateUserInfo = async (id: string, payload: updateUserInfoType) => {
	const result = await prisma.user.update({
		where: {
			id
		}, data: {
			...payload
		}
	})
	console.log(result)
	return result
}

export const userService = {
	updateImage,
	updateUserInfo
}