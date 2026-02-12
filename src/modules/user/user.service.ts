import { prisma } from "../../lib/prisma"

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

export const userService = {
	updateImage
}