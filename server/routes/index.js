import express from "express";
import passport from "passport";

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/protected", async (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (err, user, info) => {
//     if (err) {
//       console.log("err", err);
//     }
//     if (info) {
//       console.log("info", info);
//     }
//     console.log(err, user, info);
//   })(req, res, next);
// });

export default router;
