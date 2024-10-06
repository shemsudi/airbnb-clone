import express, { Router, Request, Response } from "express";
import passport from "passport";
import Profile from "../models/profile.js";
import { Schema } from "mongoose";

const router: Router = express.Router();

interface ProfileFields {
  user: Schema.Types.ObjectId;
  profileImage?: string;
  school?: string;
  location?: string;
  decadeBorn?: string;
  obsessedWith?: string;
  work?: string;
  funFact?: string;
  mostUselessSkill?: string;
  biographyTitle?: string;
  spendTooMuchTime?: boolean;
  pets?: string;
  aboutYou?: string;
}

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    const { id }: { id: Schema.Types.ObjectId } = req.user as {
      id: Schema.Types.ObjectId;
    };
    const ProfileFields: ProfileFields = { user: id };
    if (req.body.profileImage)
      ProfileFields.profileImage = req.body.profileImage;
    if (req.body.school) ProfileFields.school = req.body.school;
    if (req.body.location) ProfileFields.location = req.body.location;
    if (req.body.decadeBorn) ProfileFields.decadeBorn = req.body.decadeBorn;
    if (req.body.obsessedWith)
      ProfileFields.obsessedWith = req.body.obsessedWith;
    if (req.body.work) ProfileFields.work = req.body.work;
    if (req.body.funFact) ProfileFields.funFact = req.body.funFact;
    if (req.body.mostUselessSkill)
      ProfileFields.mostUselessSkill = req.body.mostUselessSkill;
    if (req.body.biographyTitle)
      ProfileFields.biographyTitle = req.body.biographyTitle;
    if (req.body.spendTooMuchTime)
      ProfileFields.spendTooMuchTime = req.body.spendTooMuchTime;
    if (req.body.pets) ProfileFields.pets = req.body.pets;
    if (req.body.aboutYou) ProfileFields.aboutYou = req.body.aboutYou;

    const user_id = id;
    Profile.findOne({ user: user_id }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: id },
          { $set: req.body },
          { new: true }
        ).then((profile) => {
          res.json(profile);
        });
      } else {
        new Profile(ProfileFields).save().then((profile) => res.json(profile));
      }
    });
  }
);
router.get("/profile/:user_id", (req: Request, res: Response) => {
  let errors: { noprofile?: string } = {};

  Profile.findOne({ user: req.params.user_id }).then((profile) => {
    if (!profile) {
      errors.noprofile = "there is no profile by this id ";
      res.json(errors);
    }
    res.json(profile);
  });
});
export default router;
