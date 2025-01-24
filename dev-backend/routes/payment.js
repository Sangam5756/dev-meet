import express from "express";
import { authUser } from "../middleware/auth.js";
import RazorpayInstance from "../utils/razorpay.js";
import Payment from "../models/paymentSchema.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/create", async (req, res) => {
  try {
    const order = await RazorpayInstance.orders.create({
      amount: 70000 * 100, //convert into paisa
      currency: "INR",
      receipt: "any randomId",
      notes: {
        firstName: "firstName",
        lastName: "lastName",
        membershiptype: "premium",
      },
    });

    // save in db
    const payment = new Payment({
      orderId: order.id,
    //   userId: req.user._id,
      userId: "678cc2bd60b5a25f9f910f73",
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    // return back the order details
    res.status(201).json({
      savedPayment
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default paymentRouter;
