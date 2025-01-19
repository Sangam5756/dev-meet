import express, { json } from "express";
import { authUser } from "../middleware/auth.js";
import Chat from "../models/messages.js";

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", authUser, async (req, res) => {
  try {
    const targetUserId = req.params.targetUserId;
    console.log("target" + targetUserId, req.user._id);
    const userId = req.user._id;
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });

      await chat.save;
    }
    res.status(201).json({ chat: chat });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default chatRouter;
