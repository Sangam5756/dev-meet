import express from "express";
import dbConnect from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/requests.js";
import userRouter from "./routes/user.js";
configDotenv();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
  })
);
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
dbConnect()
  .then(() => {
    console.log("DataBase connection established");
   
  })
  .catch((err) => console.error("Connection to database failed" + err));
