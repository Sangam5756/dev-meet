import { Server } from "socket.io";
import Chat from "../models/messages.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      console.log(
        firstName +
          "current user" +
          userId +
          " want to send messages to" +
          targetUserId
      );

      const roomId = [userId, targetUserId].sort().join("_");

      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        
        try {
          const roomId = [userId, targetUserId].sort().join("_");
          console.log(firstName + " " + text);
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          // if the chat is not exists create the new one
          if (!chat) {
            chat = await new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          //  now push the message in chat
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName, text });
        } catch (error) {
          console.log(error.message);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
