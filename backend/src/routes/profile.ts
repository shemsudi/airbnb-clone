import express, { Router, Request, Response } from "express";
import passport from "passport";
import Profile from "../models/profile.js";
import { Schema } from "mongoose";
import User from "../models/user.js";

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

// router.post(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req: Request, res: Response) => {
//     const { id }: { id: Schema.Types.ObjectId } = req.user as {
//       id: Schema.Types.ObjectId;
//     };
//     const ProfileFields: ProfileFields = { user: id };
//     if (req.body.profileImage)
//       ProfileFields.profileImage = req.body.profileImage;
//     if (req.body.school) ProfileFields.school = req.body.school;
//     if (req.body.location) ProfileFields.location = req.body.location;
//     if (req.body.decadeBorn) ProfileFields.decadeBorn = req.body.decadeBorn;
//     if (req.body.obsessedWith)
//       ProfileFields.obsessedWith = req.body.obsessedWith;
//     if (req.body.work) ProfileFields.work = req.body.work;
//     if (req.body.funFact) ProfileFields.funFact = req.body.funFact;
//     if (req.body.mostUselessSkill)
//       ProfileFields.mostUselessSkill = req.body.mostUselessSkill;
//     if (req.body.biographyTitle)
//       ProfileFields.biographyTitle = req.body.biographyTitle;
//     if (req.body.spendTooMuchTime)
//       ProfileFields.spendTooMuchTime = req.body.spendTooMuchTime;
//     if (req.body.pets) ProfileFields.pets = req.body.pets;
//     if (req.body.aboutYou) ProfileFields.aboutYou = req.body.aboutYou;

//     const user_id = id;
//     Profile.findOne({ user: user_id }).then((profile) => {
//       if (profile) {
//         Profile.findOneAndUpdate(
//           { user: id },
//           { $set: req.body },
//           { new: true }
//         ).then((profile) => {
//           res.json(profile);
//         });
//       } else {
//         new Profile(ProfileFields).save().then((profile) => res.json(profile));
//       }
//     });
//   }
// );

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id }: { id: Schema.Types.ObjectId } = req.user as {
      id: Schema.Types.ObjectId;
    };
    User.findById({ _id: id }).then((user) => {
      if (!user) {
        return res.status(404).json({ nouser: "there is no user by this id" });
      }
      res.json(user);
    });
  }
);

router.post(
  "/profile/",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const { tag, value } = req.body;
    const { id }: { id: Schema.Types.ObjectId } = req.user as {
      id: Schema.Types.ObjectId;
    };
    console.log(tag, value, id);
    const profile = await Profile.findOne({ user: id });
    if (profile) {
      console.log("profile exists");
      profile[tag] = value;
      profile.save();
      console.log(profile);
      res.json(profile);
    } else {
      console.log("profile does not exist");
      const profile = new Profile({ user: id, [tag]: value });
      console.log(profile);
      await profile.save();
    }
  }
);

router.get("/profile/:user_id", (req: Request, res: Response) => {
  let errors: { noprofile?: string } = {};
  console.log(req.params.user_id);

  Profile.findOne({ user: req.params.user_id }).then((profile) => {
    if (!profile) {
      errors.noprofile = "there is no profile by this id ";
      res.json(errors);
    }
    res.json(profile);
  });
});
export default router;
