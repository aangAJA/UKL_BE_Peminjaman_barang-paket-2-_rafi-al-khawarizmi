"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.authenticate = void 0;

var _md = _interopRequireDefault(require("md5"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client.PrismaClient();
var secretKey = 'jura';

var authenticate = function authenticate(req, res) {
  var _req$body, username, password, userCek, payload, token;

  return regeneratorRuntime.async(function authenticate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(prisma.user.findFirst({
            where: {
              username: username,
              password: password
            }
          }));

        case 4:
          userCek = _context.sent;

          if (userCek) {
            //mengecek variabel memiliki nilai atau tidak
            payload = JSON.stringify(userCek); //mengubah userCek menjadi JSON

            token = _jsonwebtoken["default"].sign(payload, secretKey); //Membuat token JWT menggunakan library jsonwebtoken

            res.status(200).json({
              //mengirimkan respons
              succes: true,
              logged: true,
              message: 'login succes',
              token: token,
              data: userCek
            });
          } else {
            res.status(404).json({
              succes: false,
              logged: false,
              message: 'username or password invalid'
            });
          }

          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.authenticate = authenticate;

var authorize = function authorize(req, res, next) {
  var authHeader, token, verifiedUser;
  return regeneratorRuntime.async(function authorize$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          authHeader = req.headers['authorization']; //Mengambil nilai header Authorization dari objek permintaan

          console.log("cek authHeader " + authHeader); //Menampilkan nilai authHeader di konsol untuk tujuan debugging

          if (authHeader) {
            token = authHeader.split(' ')[1];
            verifiedUser = _jsonwebtoken["default"].verify(token, secretKey);

            if (!verifiedUser) {
              res.json({
                succes: false,
                auth: false,
                message: "cannot permission to acces"
              });
            } else {
              req.user = verifiedUser;
              next();
            }
          } else {
            res.json({
              succes: false,
              message: "can't permission access"
            });
          }

          _context2.next = 11;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

          if (!(_context2.t0.name === 'JsonWebTokenError')) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.json({
            success: false,
            auth: false,
            message: 'Invalid token'
          }));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.authorize = authorize;