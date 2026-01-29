import express from 'express'
import { medicineRouter } from './modules/medicine/medicine.router'
import { categoryRouter } from './modules/category/category.router'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import cors from "cors"
import { UserRouter } from './modules/user/user.router'
import { orderRouter } from './modules/orders/order.router'

const app = express()
app.use(cors({
	origin: process.env.APP_URL,
	credentials: true
}))
app.use(express.json())

app.use('/api/auth/me', UserRouter)

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/orders', orderRouter)

app.use("/api/medicines", medicineRouter)

app.use("/api/categories", categoryRouter)

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "You have reached MediStore Backend",
		path: req.path

	})
})


export default app