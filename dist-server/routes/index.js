"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var router = _express["default"].Router();
/* GET home page. */


router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
}); // router.get("/protected", async (req, res, next) => {
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

var _default = router;
exports["default"] = _default;