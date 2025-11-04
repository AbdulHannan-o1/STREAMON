import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

dotenv.config();

import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"

const app = express();
const port  = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.listen(port, ()=> {
    console.log(`server is running on ${port}`)
    ConnectDB()
})
