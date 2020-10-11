import express, { response } from "express";
import User from "../models/user";
import Profile from "../models/profile";
import passport from "passport";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {})(
    req,
    res,
    next
  );
});

router.get("/users", (req, res, next) => {
  User.findById(req.params.id).then((data) => {
    res.json({
      success: true,
      users: data,
    });
  });
});

router.post("/updateProfile", async (req, res, next) => {
  passport.authenticate('jwt',  { session: false }, async (err, user, info) => {
    console.log('passport variables', err, user, info);
    if(!user) {
      return res.status(403).send({message : 'Unauthorized Access'});
    }
    try {
      const {user} = info;
      if(user.profile) {
       return res.status(200).send({"message" : "Profile already Exist"})
      }
      const profile = await Profile.findById(user.profile._id).exec();
      // profile = {
      //   ...profile,
      //   ...req.body
      // }
      const success =  await profile.save();
      console.log('success', success);
      if(success) {
        const userData = await User.findById(user._id).exec();
        console.log('user', user, userData, user._id);
        userData.profile = success._id;
        const userUpdated = userData.save();
        if(userUpdated) {
          res.status(200).send({"message" : "Profile created"})
        }
       
      } 
    } catch(err) {
      console.log('error', err)
      res.status(500).send({"error":err.message})
    }
      
    

  })(req,res,next);
 
});
export default router;
