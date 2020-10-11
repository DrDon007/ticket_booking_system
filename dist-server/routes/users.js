"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _user = _interopRequireDefault(require("../models/user"));

var router = _express["default"].Router();
/* GET users listing. */


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/users", function (req, res, next) {
  _user["default"].findById(req.params.id).then(function (data) {
    res.json({
      success: true,
      users: data
    });
  });
});
router.post("/user", function (req, res, next) {
  var user = new _user["default"](req.body);
  user.save(function (err, data) {
    if (err) {
      return res.sendStatus(400).send({
        success: false,
        err: err
      });
    }

    res.send({
      success: true,
      user: data
    });
  });
});
var _default = router;
exports["default"] = _default;