"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _authentication = _interopRequireDefault(require("./routes/authentication"));

var _trainLists = _interopRequireDefault(require("./routes/trainLists"));

var _passengers = _interopRequireDefault(require("./routes/passengers"));

var _profile = _interopRequireDefault(require("./routes/profile"));

var _booking = _interopRequireDefault(require("./routes/booking"));

var _passport2 = _interopRequireDefault(require("./config/passport"));

var _cors = _interopRequireDefault(require("cors"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use(_passport["default"].initialize());
app.use("/test", function (req, res) {
  console.log('I am here');
  res.status(200).send({
    message: "success"
  });
});
app.use("/", _index["default"]);
app.use("/users", _users["default"]);
app.use("/authentication", _authentication["default"]);
app.use("/train", _trainLists["default"]);
app.use("/pass", _passengers["default"]);
app.use('/profile', _profile["default"]);
app.use('/booking', _booking["default"]);
var _default = app;
exports["default"] = _default;