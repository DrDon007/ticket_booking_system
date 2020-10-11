import express from "express";
import User from "../models/user";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWTSecret } from "../config/jwtConfig";
import Profile from "../routes/profile";
var router = express.Router();
const BCRYPT_SALTS_ROUNDS = 12;

/**
 * GET To fetch users
 */

router.get("/", async (req, res, next) => {
  console.log(req);
});

/* POST registers new user. */
router.post("/register", async (req, res, next) => {
  console.log()
  const { username, password, email } = req.body;
  try {
    let passwordHash = await bcrypt.hash(password, BCRYPT_SALTS_ROUNDS);
    const user = new User({ username, passwordHash, email, role : "user" });
    const userCreated =  await user.save();
    if(userCreated) {
      const newProfile = new Profile ({bookings: []});
      await newProfile.save();
    }
    res.status(200).send({ status: true, message: "user created", user });
  } catch (err) {
    console.log("errr", err);
    res.status(400).send({ status: false, message: "user not created" });
  }
});

/* POST registers new user. */
router.post("/register/admin", (req, res, next) => {
  passport.authenticate('jwt', {session : false} , async (err, user, info) => {
    const { username, password, email } = req.body;
    try {
      const {role} = info;
      if(role !== "admin") {
        return res.status(403).send({ status: false, message: "Unauthorized access" });;
      }
      const passwordHash = await bcrypt.hash(password, BCRYPT_SALTS_ROUNDS);
      const user = new User({ username, passwordHash, email, role : "admin" });
      await user.save();
      res.status(200).send({ status: true, message: "user created", user });
    } catch (err) {
      console.log("errr", err);
      res.status(400).send({ status: false, message: "user not created" });
    }
  })(req,res,next);
  
});

/* POST login new user. */
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({
      username: username,
    }).exec();
    console.log(user);
    if (!user) {
      return res.status(400).send({ status: false, message: "user not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.passwordHash);
    if (!comparePassword) {
      res.status(200).send({ status: true, message: "Ooops! wrong password" });
    }
    const jwt_token = jwt.sign({ id: user.id }, JWTSecret);
    res.status(200).send({
      status: true,
      data: {
        user,
        jwt_token,
      },
    });
  } catch (err) {
    console.log("errr", err);
    res.status(400).send({ status: false, message: "user not created" });
  }
});

export default router;
