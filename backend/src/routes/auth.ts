import express from "express";
import passport from "passport";
import {
  verifyPhone,
  verifyOTP,
  completeRegistration,
  sendEmailConfirmation,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", verifyPhone);
router.post("/verify", verifyOTP);
router.post("/complete-registration", completeRegistration);
router.post("/send-email-confirmation", sendEmailConfirmation);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

export default router;
