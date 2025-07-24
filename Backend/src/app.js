import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

import { router as userRoute } from "../src/routes/user.routes.js";
import { router as artistRoute } from "../src/routes/artist.routes.js";
import { router as imagesRoute } from "../src/routes/images.routes.js";
import { router as moviesRoute } from "../src/routes/movies.routes.js";

app.use("/api/users", userRoute)
app.use("/api/artists", artistRoute)
app.use("/api/images", imagesRoute)
app.use("/api/movies", moviesRoute)

export { app }

