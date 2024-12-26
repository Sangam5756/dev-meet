import express from "express";
import validateSignupData from "../utils/validator.js";
import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import validator from "validator";
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    // validate req body
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body.formData;

    // password encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const saveduser = await user.save();
    const token = await saveduser.getJWT();
    const tokenOption = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1 * 3600000),
      samesite: none,
    };

    // storing token inside the cookies
    res.cookie("token", token, tokenOption);

    res.status(200).json({ message: "Signup Successfull", data: saveduser });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // check the email is valid format
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid creadential");
    }

    // finding that user in db
    const user = await userModel.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid creadential");
    }
    // password validation
    const isPasswordValid = await user.validatePassword(password);
    console.log(isPasswordValid);

    if (isPasswordValid) {
      // generate token
      const token = await user.getJWT();
      const tokenOption = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1 * 3600000),
        samesite: none,
      };

      // storing token inside the cookies
      res.cookie("token", token, tokenOption);

      // sending response as login success
      res.json({ message: "login successfull", user: user });
    } else {
      throw new Error("Invalid creadential");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.get("/logout", (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .send("logout successfull");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default authRouter;
