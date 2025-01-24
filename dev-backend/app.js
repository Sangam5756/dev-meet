import express from "express";
import dbConnect from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/requests.js";
import userRouter from "./routes/user.js";
import { createServer } from "http";
import { initializeSocket } from "./routes/socket.js";
import chatRouter from "./routes/chat.js";
import paymentRouter from "./routes/payment.js";
configDotenv();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);
app.use("/",paymentRouter)
// socket io server
const server = new createServer(app);
initializeSocket(server)



dbConnect()
  .then(() => {
    console.log("DataBase connection established");

    server.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Connection to database failed" + err));

export default app;
