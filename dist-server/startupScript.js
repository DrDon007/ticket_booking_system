"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startupScript = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("./models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var BCRYPT_SALTS_ROUNDS = 12;

var startupScript = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user, adminUser, userCreated;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(' I runned');
            _context.prev = 1;
            _context.next = 4;
            return _user["default"].findOne({
              username: "Admin"
            }).exec();

          case 4:
            user = _context.sent;
            console.log(' I runned', user);

            if (!user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            _context.t0 = _user["default"];
            _context.next = 11;
            return _bcrypt["default"].hash('admin@123', BCRYPT_SALTS_ROUNDS);

          case 11:
            _context.t1 = _context.sent;
            _context.t2 = {
              username: "Admin",
              email: "admin@gmail.com",
              passwordHash: _context.t1,
              role: "admin"
            };
            adminUser = new _context.t0(_context.t2);
            _context.next = 16;
            return adminUser.save();

          case 16:
            userCreated = _context.sent;

            if (userCreated) {
              console.log("user created");
            }

            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t3 = _context["catch"](1);
            console.log(_context.t3);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 20]]);
  }));

  return function startupScript() {
    return _ref.apply(this, arguments);
  };
}();

exports.startupScript = startupScript;