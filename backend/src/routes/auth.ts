import express from "express";
import passport from "passport";
import {
  verifyPhone,
  verifyOTP,
  completeRegistration,
  sendEmailConfirmation,
} from "../controllers/authController";
import User from "../models/user";

const router = express.Router();

router.post("/login", verifyPhone);
router.post("/verify", verifyOTP);
router.post("/complete-registration", completeRegistration);
router.post("/send-email-confirmation", sendEmailConfirmation);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    window.location.href = "http://localhost:5173/auth/google";
  }
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { user, token } = req.user as { user: any; token: string };

    res.redirect("http://localhost:5173/auth/sucess?token=" + token);
  }
);

export default router;
