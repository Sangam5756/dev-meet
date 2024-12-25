import express from "express";
import validateSignupData from "../utils/validator.js";
import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import validator from "validator";
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate req body
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // password encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.status(200).send("Signup SUccessfull");
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

      // storing token inside the cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      // sending response as login success
      res.json({message:"login successfull",user:user});
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
