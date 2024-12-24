import express from "express";
import { authUser } from "../middleware/auth.js";
import {
  isValidPassword,
  validateEditProfileData,
} from "../utils/validator.js";
import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
const profileRouter = express.Router();

profileRouter.get("/profile/view", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

profileRouter.patch("/profile/edit", authUser, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit Request");
    } else {
      const loggedInuser = req.user;

      Object.keys(req.body).forEach(
        (key) => (loggedInuser[key] = req.body[key])
      );

      await loggedInuser.save();
      res.send("profile edit successfull" + loggedInuser.firstName);
    }
  } catch (error) {
    res.status(404).send("error" + error.message);
  }
});

profileRouter.patch("/profile/changepassword", authUser, async (req, res) => {
  try {
    console.log(req.body);

    const { password, newPassword } = req.body;
    if (!isValidPassword(req)) {
      throw new Error("Password is not strong");
    }

    const check = await bcrypt.compare(password, req.user.password);
    if (check) {
      const newHash = await bcrypt.hash(newPassword, 10);

      const loggedInuser = req.user;
      loggedInuser.password = newHash;
      loggedInuser.save();
      res.send("password change");
    } else {
      res.send("old password invalid");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default profileRouter;
