import app from "./app";
import { prisma } from "./lib/prisma"

const PORT = process.env.PORT || 5000

async function main() {
	try {
		await prisma.$connect();
		console.log("Connected to database successfully!")

		app.listen(PORT, () => {
			console.log(`Medi Store Server is running on ${PORT}`)
		})
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}

}

main()