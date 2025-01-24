import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  notes: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    membershiptype: {
      type: String,
      required: true,
    },
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
