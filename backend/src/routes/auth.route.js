import express from "express";
import { login, logout, signup, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router()

router.post("/signup", signup) 

router.post("/login", login)

router.post("/logout", logout)

router.post("/onboarding", protectRoute , onboard)

router.get("/me", protectRoute, (req, res)=> {
    res.status(200).json({success:"true", User: req.user})
})


export default router
