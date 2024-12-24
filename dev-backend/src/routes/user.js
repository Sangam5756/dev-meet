import express from "express";
import { authUser } from "../middleware/auth.js";
import connectionRequest from "../models/connectionRequestSchema.js";
import userModel from "../models/userSchema.js";

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
userRouter.get("/user/requests", authUser, async (req, res) => {
  // get all pending connection request

  try {
    const loggedInuser = req.user;

    const connectRequests = await connectionRequest
      .find({
        toUserId: loggedInuser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.status(200).json({
      message: "All pending connection requests",
      data: connectRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
});

userRouter.get("/user/connections", authUser, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectRequest = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInuser._id, status: "accepted" },
          { fromUserId: loggedInuser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectRequest.map((row) => {
      if (row.toUserId._id.toString() == loggedInuser._id.toString()) {
        return row.fromUserId;
      }
      return row.toUserId;
    });

    res.json({
      message: "All connection ",
      data: data,
      count: data.length,
    });
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
});

userRouter.get("/feed", authUser, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    limit = limit > 50 ? 50 : limit;
    const connectRequest = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInuser._id }, { toUserId: loggedInuser._id }],
      })
      .select("toUserId fromUserId status");

    const hideUserFromFeed = new Set();

    connectRequest.forEach((key) => {
      hideUserFromFeed.add(key.toUserId.toString());
      hideUserFromFeed.add(key.fromUserId.toString());
    });
    console.log(hideUserFromFeed);

    const users = await userModel
      .find({
        $and: [
          { _id: { $nin: Array.from(hideUserFromFeed) } },
          { _id: { $ne: loggedInuser._id } },
        ],
      })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
});

export default userRouter;
