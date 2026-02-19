import { prisma } from "../lib/prisma"
import { UserRole } from "../middlewares/auth"

async function seedAdmin() {
	console.log("********* start creating admin! *********");
	try {
		const adminData = {
			name: "ADMIN",
			email: "admin@rumedi.com",
			role: UserRole.ADMIN
		}
		console.log("********* Checking for Existing! *********")
		const existingUser = await prisma.user.findUnique({
			where: {
				email: adminData.email
			}
		})

		if (existingUser) {
			throw new Error("********* User already exists! *********")
		}
		console.log("********* Creating User! *********")

		const signUpAdmin = await fetch("https://medi-store-backend-rust.vercel.app/api/auth/sign-up/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(adminData)
		})

		console.log("signUpAdmin")

		if (signUpAdmin.ok) {
			console.log("********* Admin created! *********")
			await prisma.user.update({
				where: {
					email: adminData.email
				}, data: {
					emailVerified: true
				}
			})
			console.log("********* Email verification updated *********")
		}
		console.log("********* Success *********")
	} catch (err) {
		console.log(err)
	}
}

seedAdmin()