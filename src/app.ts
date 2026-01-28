import express from 'express'
import path from 'node:path'
import { sellerRouter } from './modules/seller/seller.router'
import { adminRouter } from './modules/admin/admin.router'

const app = express()
app.use(express.json())

app.use("/seller", sellerRouter)
app.use("/admin", adminRouter)

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "You have reached MediStore Backend",
		path: req.path

	})
})


export default app