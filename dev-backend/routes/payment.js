// import express from "express";
// import { authUser } from "../middleware/auth.js";
// import RazorpayInstance from "../utils/razorpay.js";
// import Payment from "../models/paymentSchema.js";

// const paymentRouter = express.Router();

// paymentRouter.post("/payment/create", async (req, res) => {
//   try {
//     const order = await RazorpayInstance.orders.create({
//       amount: 70000 * 100, //convert into paisa
//       currency: "INR",
//       receipt: "any randomId",
//       notes: {
//         firstName: "firstName",
//         lastName: "lastName",
//         membershiptype: "premium",
//       },
//     });

//     // save in db
//     const payment = new Payment({
//       orderId: order.id,
//     //   userId: req.user._id,
//       userId: "678cc2bd60b5a25f9f910f73",
//       status: order.status,
//       amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       notes: order.notes,
//     });

//     const savedPayment = await payment.save();

//     // return back the order details
//     res.status(201).json({
//       savedPayment
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// });

// paymentRouter.post("payment/webhook", async (req, res) => {
//   try {
//     const webhookBody = req.body;
//     const webhookSignature = req.get("X-Razorpay-Signature")

//     const isWebhooValid = validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, process.env.razorpay_webhookSecret);
//   console.log("webhook is valid", isWebhookValid);
//     console.log(webhookBody);
//     console.log("payment is captured");

//     if (!isWebhooValid) {
//       return res.status(400).json({ message: "Webhook signature is not valid" })
//     }

//     const paymentDetails = webhookBody.payload.payment.entity;
//     const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
//     payment.status = paymentDetails.status
//     await payment.save(); 


//     // update my payment status in db
//     // update the users as premium
//     // return success response to razorpay
//     if (webhookBody.event == "payment.captured") {

//     }
//     if (webhookBody.event == "payment.failed") {

//     }

//     return res.status(200).json({
//       msg: "webhook  is received successfully"
//     })



//   } catch (error) {
//     console.log(error);
//   }

// })
// export default paymentRouter;
import express from "express";
import { authUser } from "../middleware/auth.js";
import RazorpayInstance from "../utils/razorpay.js";
import Payment from "../models/paymentSchema.js";
// import member from "../utils/membership.js"
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
const paymentRouter = express.Router();

paymentRouter.post("/payment/create", authUser, async (req, res) => {
  try {

    const membershiptype = req.body.membershiptype;
    const order = await RazorpayInstance.orders.create({
      amount: 4000 * 100, //convert into paisa
      currency: "INR",
      receipt: "any randomId",
      notes: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        membershiptype: membershiptype,
      },
      payment_capture: 1,
    });

    // save in db
    const payment = new Payment({
      orderId: order.id,
      userId: req.user._id,
      // userId: "678cc2bd60b5a25f9f910f73",
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    // return back the order details
    res.status(201).json({
      order: savedPayment,
      keyId: process.env.razorpay_keyId
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookBody = req.body;
    const webhookSignature = req.get("X-Razorpay-Signature")

    const isWebhooValid = validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, process.env.razorpay_webhookSecret);

    if (!isWebhooValid) {
      return res.status(400).json({ message: "Webhook signature is not valid" })
    }

    // const paymentDetails = webhookBody.payload.payment.entity;
    // const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    // payment.status = paymentDetails.status
    // await payment.save(); 
   console.log("webhook is valid or not",isWebhooValid);
    console.log(webhookBody);
    console.log(paymentDetails);

    // update my payment status in db
    // update the users as premium
    // return success response to razorpay
    // if (webhookBody.event == "payment.captured") {

    // }
    // if (webhookBody.event == "payment.failed") {

    // }

    return res.status(200).json({
      msg: "webhook  is received successfully"
    })



  } catch (error) {
    console.log(error);

  }

})

export default paymentRouter;
