import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimiting from "express-rate-limit"
import helmet from 'helmet'
import hpp from 'hpp'
import xss from 'xss-clean'
import { connectDB } from './config/connectToDB.js'
import authRouter from './routes/auth.js'
import listRouter from './routes/list.js'
import taskRouter from './routes/task.js'
import { errorHandler, notFound } from './middlewares/error.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(xss())

// connect to database
connectDB()

// rate limit
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 500
}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/list", listRouter)
app.use("/api/v1/task", taskRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})