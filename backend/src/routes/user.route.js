import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommandedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequest,
} from "../controllers/users.controller.js";

const router = express.Router();

// applying auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommandedUsers);

router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequest);

export default router;
