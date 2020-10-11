"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireWildcard(require("express"));

var _passport = _interopRequireWildcard(require("passport"));

var _trainList = _interopRequireDefault(require("../models/trainList"));

var router = _express["default"].Router();
/* GET Train listing. */


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/trainlists", function (req, res, next) {
  _trainList["default"].findById(req.params.id).then(function (data) {
    res.json({
      success: true,
      trainLists: data
    });
  });
});
router.post("/train/add", function (req, res, next) {
  console.log('req', req);

  _passport["default"].authenticate('jwt', {
    session: false
  }, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, user, info) {
      var role, list, savedList;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              role = info.role;

              if (!(role.toLowerCase() !== "admin")) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(403).send({
                success: false,
                err: "unauthorized access"
              }));

            case 4:
              list = new _trainList["default"](req.body);
              console.log(list);
              savedList = list.save();

              if (savedList) {
                res.status(200).send({
                  success: true,
                  message: "Train Added"
                });
              }

              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.log('error', _context.t0);
              return _context.abrupt("return", res.status(400).send({
                success: false,
                err: _context.t0.message
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }())(req, res, next);
});
/* delete train */

router.post("/train/delete", function (req, res, next) {
  _passport["default"].authenticate("jwt", {
    session: false
  }, /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, user, info) {
      var trainListdel, trainListDel;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              trainListdel = _trainList["default"].findById(req.trainList.id).exec();
              trainListdel.status = false;
              _context2.next = 5;
              return trainListdel.save();

            case 5:
              trainListDel = _context2.sent;

              if (trainListDel) {
                res.status(200).send({
                  message: "Train has been deleted"
                });
              }

              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log('err', _context2.t0);
              res.status(500).send(_context2.t0.message);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }())(req, res, next);
});
router.get("/search", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var trains;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.body);
            _context3.prev = 1;
            _context3.next = 4;
            return _trainList["default"].find({
              'start': req.body.start,
              'end': req.body.end
            }).exec();

          case 4:
            trains = _context3.sent;
            console.log('trains', trains); // then((err, data) => {

            res.json({
              success: true,
              trainLists: trains
            }); // });

            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.log('err', _context3.t0);
            res.status(404).json({
              success: true,
              err: _context3.t0.message
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;