import express from "express";
import { authUser } from "../middleware/auth.js";
import connectionRequest from "../models/connectionRequestSchema.js";
import userModel from "../models/userSchema.js";
import send from "../utils/sendMail.js";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  authUser,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const fromUserId = req.user._id;

      const isUserExits = await userModel.findById(toUserId);
      if (!isUserExits) {
        return res.json({
          message: "User does not exist",
        });
      }

      // if (toUserId == fromUserId) {
      //   return res.json({ message: "can send request to self" });
      // }

      const isAllowedStatus = ["ignored", "interested"];
      if (!isAllowedStatus.includes(status)) {
        return res.json({
          message: "invalid status type :" + status,
        });
      }

      const existingConnectionRequest = await connectionRequest.find({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest.length !== 0) {
        return res.json({
          message: "Connection  request already exists",
        });
      }

      const connectionRequests = new connectionRequest({
        toUserId,
        fromUserId,
        status,
      });
      const toUser = await userModel.findById(toUserId);
      const data = await connectionRequests.save();

      let statusMessage = "";
      const receiverMessage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Connection Request Received</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
          h1 { color: #2c3e50; font-size: 24px; text-align: center; }
          p { font-size: 16px; color: #555; }
          .footer { font-size: 14px; text-align: center; color: #aaa; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Connection Request Received</h1>
          <p>Hi there,</p>
          <p>${req.user.firstName} is interested in connecting with you.</p>
          <p>You can accept or ignore the request via your profile.</p>
          <div class="footer">
            <p>Thank you for using our platform! devmeet</p>
          </div>
        </div>
      </body>
      </html>
    `;
      if (status == "interested") {
        statusMessage = `${req.user.firstName} is ${status} in ${toUser.firstName}`;
        await send({
          email: toUser.emailId,
          subject: "Connection Request Received",
          message: receiverMessage,
        });
      } else {
        statusMessage = `${req.user.firstName} is ${status} the ${toUser.firstName}`;
      }

      res.json({
        message: statusMessage,
        data: data,
      });
    } catch (error) {
      res.status(400).send("ERROR:" + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  authUser,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;

      // Validate status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type",
        });
      }

      // Find the connection request
      const connectRequest = await connectionRequest
        .findOne({
          _id: requestId,
          toUserId: req.user._id,
          status: "interested",
        })
        .populate("fromUserId");

      if (!connectRequest) {
        return res.status(404).json({
          message: "No connection request found",
        });
      }

      // Create the message for notification
      // const message = `${connectRequest.fromUserId.firstName} ${connectRequest.fromUserId.lastName} Request is ${status} by ${req.user.emailId}`;

      // Update the status of the connection request
      connectRequest.status = status;
      const updatedRequest = await connectRequest.save();

      const message = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Connection Request Update</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f9;
            padding: 20px;
            margin: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 14px;
            text-align: center;
            color: #aaa;
            margin-top: 20px;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            margin-top: 10px;
          }
          .btn:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
      
        <div class="container">
          <h1>Connection Request Update</h1>
          
          <div class="message">
            <p>Hi there,</p>
            <p>We wanted to inform you that your connection request has been <strong>${status}</strong> by <strong>${req.user.firstName} ${req.user.lastName}</strong>.</p>
            <p>Here are the details:</p>
            <p><strong>${connectRequest.fromUserId.firstName} ${connectRequest.fromUserId.lastName}</strong> has updated the status of your connection request.</p>
          </div>
          
          <div class="footer">
            <p>Thank you for using our service!</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
          </div>
        </div>
      
      </body>
      </html>
      `;

      // Send email if the request was accepted
      if (status === "accepted" && connectRequest.fromUserId) {
        await send({
          email: connectRequest.fromUserId.emailId,
          subject: "DEVMEET REQUEST STATUS UPDATE",
          message: message,
        });
        console.log("email send" + message);
      }

      // Send response
      res.status(200).json({
        message: `Connection request ${status}`,
        data: updatedRequest,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        message: "An error occurred while processing the request",
        error: error.message,
      });
    }
  }
);

export default requestRouter;
