"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var db_url = process.env.NODE_ENV === "production" ? "" : "mongodb://localhost:27017/E-tcket";

var connectDb = function connectDb() {
  _mongoose["default"].connect(db_url, function (err) {
    if (err) {
      return console.log("Unable to connect");
    }

    console.log("".concat(db_url, " is connected"));
  });
};

var _default = connectDb;
exports["default"] = _default;