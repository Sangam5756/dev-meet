import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.razorpay_keyId,
  key_secret: process.env.razorpay_Secret,
});

export default instance;
