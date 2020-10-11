"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _passenger = _interopRequireDefault(require("../models/passenger"));

var router = _express["default"].Router();
/* GET users listing. */


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/list/passengers", function (req, res, next) {
  _passenger["default"].findById(req.params.id).then(function (data) {
    res.json({
      success: true,
      passengers: data
    });
  });
});
router.post("/add/passenger", function (req, res, next) {
  var passenger = new _passenger["default"](req.body);
  passenger.save(function (err, data) {
    if (err) {
      return res.sendStatus(400).send({
        success: false,
        err: err
      });
    }

    res.send({
      success: true,
      passengers: data
    });
  });
});
var _default = router;
exports["default"] = _default;