import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import nodemailer from "nodemailer";
import twilio from "twilio";

//validation
import validateRegisterInput from "../validation/register";
import validatePhoneNumber from "../validation/validatePhone";

//models
import User from "../models/user.js";

const client = twilio(
  process.env.accountSid as string,
  process.env.authToken as string
);

export const verifyPhone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    countryCode,
    phoneNumber,
  }: { countryCode: string; phoneNumber: number } = req.body;

  const fullPhoneNumber: string = countryCode + phoneNumber;
  const { errors, isValid } = validatePhoneNumber(req.body);
  console.log(errors);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  try {
    const response: { ok: boolean } = { ok: true };
    res.status(200).json({ response });
  } catch (error) {
    errors.phone = "Failed to send Otp to current Phone number ";
    res.status(500).json(errors);
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const {
    phoneNumber,
    enteredOtp,
  }: { phoneNumber: string; enteredOtp: string } = req.body;
  console.log(req.body);
  let errors: { [key: string]: string } = {};
  if (!enteredOtp) {
    errors.Otp = "OTP is required";
    res.status(400).json(errors);
    return;
  }
  try {
    console.log("Verifying OTP...");
    if (true) {
      const user = await User.findOne({ phone: phoneNumber });
      if (user) {
        const payload: { userId: string; name: string } = {
          userId: user.id,
          name: user.firstName,
        };
        const authToken: string = jwt.sign(
          payload,
          process.env.JWT_SECRET as string,
          {
            expiresIn: "2h",
          }
        );
        console.log("User found");
        res.status(201).json({
          isUserExist: true,
          token: "Bearer " + authToken,
        });
      } else {
        console.log("User not found");
        res.status(200).json({ isUserExist: false });
      }
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    errors.Otp = "The entered Otp is not correct";
    res.status(400).json(errors);
  }
};

export const completeRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { errors, isValid }: { errors: any; isValid: boolean } =
    validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  const {
    phoneNumber,
    firstName,
    lastName,
    birthday,
    email,
    optOutMarketing,
  }: {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    optOutMarketing: boolean;
  } = req.body;

  const parsedBirthday: Date = moment(birthday, "YYYY-MM-DD").toDate();

  console.log(req.body);
  console.log(parsedBirthday);
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      errors.email = "email already exists.";
      res.status(400).json(errors);
      return;
    }
    const newUser = new User({
      phone: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      isOptOutMarketing: optOutMarketing,
      birthday: parsedBirthday,
      email,
    });
    console.log(newUser);

    const payload: { userId: any; name: string } = {
      userId: newUser._id,
      name: newUser.firstName,
    };
    console.log(payload);
    const authToken: string = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );
    console.log(authToken);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      token: "Bearer " + authToken,
    });
  } catch (err) {
    errors.message = err;
    res.status(400).json(errors);
  }
};

export const sendEmailConfirmation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email }: { email: string } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Confirmation",
      text: "Please confirm your email by clicking the following link.",
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email" });
  }
};
