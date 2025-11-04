import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommandedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest} from "../controllers/users.controller.js";

const router = express.Router()

// applying auth middleware to all routes
router.use(protectRoute)

router.get("/", getRecommandedUsers)

router.get("/friends", getMyFriends)

router.post("/friend-request/:id", sendFriendRequest)
router.post("/friend-request/:id/accept", acceptFriendRequest)


export default Router;