"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  username: {
    type: "string",
    required: true
  },
  email: {
    type: "string",
    required: true
  },
  passwordHash: {
    type: "string",
    required: true
  },
  role: {
    type: "string",
    required: true
  },
  profile: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
});
var User = (0, _mongoose.model)("User", UserSchema);
var _default = User;
exports["default"] = _default;