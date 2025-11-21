import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { upsertStreamUser } from "../lib/stream.js"

// signup function
export async function signup(req, res) {
    const {fullName, email, password} = req.body

    try{
        if (!email || !password || !fullName) {
            return res.status(400).json({message: "All  fields are required"})
        }
        
        if (password.length < 6) {
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "invalid email format"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({message:"Something went wrong"})
        }

        const idx = Math.floor(Math.random() * 100) +1
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            password,
            fullName,
            profilePic: randomAvatar
        })

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                Image: newUser.profilePic || "",
            })
            console.log(`stream user is creared for ${newUser.fullName}`)
        } catch (error) {
            console.log("error creating user for getStream", error.message)
        }

        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY, {
             expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:newUser})

    }catch(error) {
        console.log("error in singnup Controller", error)
        res.status(500).json({message: "internal server Error "})
    }
}

// login fuction
export async function login(req, res) {
    try{
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "Invalid email or password"})

        const isPasswordCorrect = await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid email or password"})
        
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({success: true, user})
    }catch (error) {
        console.log("error loggign user in ", error.message)
        res.status(500).json({message:"Internal server Error"})
    }

}

// logout fuction
export function logout(req, res) {
     res.clearCookie("jwt")
     res.status(200).json({success: true, message:"Logged out successfully"})
}

export async function onboard (req, res) {
    try {
        const userid = req.user._id

        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body

        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({
                message:"ALL fields are required",
                missingFields:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userid, {
            ...req.body,
            isOnboarded: true,  
        },{new:true})

        if(!updatedUser){
            return res.status(404).json({message:"user not found"})
        }

        try {
            await upsertStreamUser({
            id: updatedUser._id.toString(),
            name: updatedUser.fullName,
            Image: updatedUser.profilePic || ""
        })
            console.log(`Stram User updated after onboarding for ${updatedUser.fullName}`)
        } catch (streamError) {
            console.log("Error updating stream user after onboarding", streamError.message)
        }
    

        res.status(200).json({success:true, user: updatedUser})
    } catch (error) {
        console.log("Error onboarding user", error)
        res.status(500).json({message:"Internal server error "})
    }
}
