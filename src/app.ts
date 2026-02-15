import express from 'express'
import { medicineRouter } from './modules/medicine/medicine.router'
import { categoryRouter } from './modules/category/category.router'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import cors from "cors"
import { UserRouter } from './modules/user/user.router'
import { orderRouter } from './modules/orders/order.router'
import { sellerRouter } from './modules/seller/seller.router'
import { adminRouter } from './modules/admin/admin.router'
import { publicROuter } from './modules/public/public.router'
import { logger } from './middlewares/logger'

const app = express()

const allowedOrigins = [

	process.env.APP_URL || "http://localhost:3000",

	process.env.PROD_APP_URL || "https://medi-store-client-gamma.vercel.app"

].filter(Boolean);

app.use(

  cors({

    origin: (origin, callback) => {

      if (!origin) return callback(null, true);
     
      const isAllowed =

        allowedOrigins.includes(origin) ||

        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||

        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment


      if (isAllowed) {

        callback(null, true);

      } else {

        callback(new Error(`Origin ${origin} not allowed by CORS`));

      }

    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],

    exposedHeaders: ["Set-Cookie"],

  }),

);

// app.use(cors({
// 	origin: process.env.APP_URL,
// 	credentials: true
// }))


app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json())

app.use(logger);

app.use('/api/user', UserRouter)

app.use('/api/orders', orderRouter)

app.use('/api/seller/', sellerRouter)

app.use("/api/medicines", medicineRouter)

app.use("/api/categories", categoryRouter)

app.use("/api/admin", adminRouter)

app.use("/api", publicROuter)

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "You have reached MediStore Backend",
		path: req.path

	})
})


export default app