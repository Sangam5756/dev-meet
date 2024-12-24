import mongoose from "mongoose";

import { configDotenv } from "dotenv";
configDotenv();

const dbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};


export default dbConnect;