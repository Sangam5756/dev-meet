import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";

export const authUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("token not Valid");
    }

    const decodedObj = jwt.verify(token, "thisissecret");

    if (!decodedObj) {
      throw new Error("Invalid token");
    }

    const { _id } = decodedObj;

    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("User not exists");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
};
