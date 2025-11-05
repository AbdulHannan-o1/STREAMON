import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommandedUsers(req, res) {
try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const getRecommandedUsers = await User.find({
        $and: [
            {_id: {$ne: currentUserId}},
            {$id: {$nin: currentUser.friends}},
            {isOnBoarded: true}
        ]
    })
    res.status(200).json(getRecommandedUsers)

} catch (error) {
    console.log("error in getRecommandedUser controller", error.message)
    res.status(500).json({message:"Internal Server Error"})
}
}

export async function getMyFriends(req, res) {
    try {
        const currentUserId = req.user.id
        const user = await User.findById(currentUserId).select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage")
    
    res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in get friend controller", error.message)
        res.status(500).json({message:"Internal server error"})
    }


}

export async function sendFriendRequest(req, res) {
    try {
        const currentUserId = req.user.id
        const {id:recipientId} = req.params
        
        // prevent sending request to ourself
        if(recipientId === currentUserId){
            res.status(400).json({message:"You cannot send a friend requets to your self"})
        }

        // checking if the user existed or not 
        const recipient = await User.findById(recipientId)
        if(!recipient) {
            res.status(400).json({message:"Recipient not found"})
        }

        // checking if the recipient and user already a friend
        if(recipient.friends.includes(currentUserId)){
            res.status(400).json({message:"you are already a friend with this user"})
        }

        // checking if a friend request already exists in between user and recipient
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:currentUserId, recipient:recipientId},
                {sender:recipientId, recipient:currentUserId}
            ]
        })

        if(existingRequest){
            res.status(400).json({message:"A friend request alredy exists between you nad this user"})
        }

        const friendRequest = await FriendRequest.create({
            sender:currentUserId,
            recipient: recipientId
        })
        res.status(201).json(friendRequest)
    } catch (error) {
        console.error("error in friend request controller", error.message)
        res.status(500).json("Internal server error")        
    }
}


export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function  getFriendRequests(req, res) {
    try {
        const incommingRequests = await FriendRequest.find({
            resipient: req.user.id,
            status: pending,
        }).populate("sender", "fullName profilePic nativeLanguage leariningLanguage")

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePic")

        res.status(200).json(incommingRequests, acceptedReqs)
    } catch (error) {
        console.log("error in getFriendRequests contoller", error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

export async function getOutgoingFriendRequest(req, res) {
    try {
        const outgoingRequests = await FriendRequest.find({
        sender: req.user.id,
        status: "pending"
    }).populate("recipient", "fullName profilePic nativeLanguage learingLanguage")

    res.status(200).json(outgoingRequests)
    } catch (error) {
        console.log("error in outGoingFriendRequest contoller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }

}