import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors";

dotenv.config();

import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"


const app = express();
const port  = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // allowing to accept cookies from frontend
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/chat", chatRoute)


app.listen(port, ()=> {
    console.log(`server is running on ${port}`)
    ConnectDB()
})
