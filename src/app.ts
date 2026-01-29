import express from 'express'
import { sellerRouter } from './modules/medicine/medicine.router'
import { categoryRouter } from './modules/category/category.router'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import cors from "cors"

const app = express()
app.use(cors({
	origin: process.env.APP_URL,
	credentials: true
}))
app.use(express.json())

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/medicines", sellerRouter)

app.use("/api/categories", categoryRouter)

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "You have reached MediStore Backend",
		path: req.path

	})
})


export default app