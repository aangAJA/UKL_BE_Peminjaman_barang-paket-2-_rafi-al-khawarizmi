"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUserById = exports.getAllUser = void 0;

var _client = require("@prisma/client");

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client.PrismaClient();

var getAllUser = function getAllUser(req, res) {
  var result;
  return regeneratorRuntime.async(function getAllUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(prisma.user.findMany());

        case 3:
          result = _context.sent;
          res.json({
            success: true,
            data: result
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            msg: "msg.error".concat(_context.t0)
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllUser = getAllUser;

var getUserById = function getUserById(req, res) {
  var result;
  return regeneratorRuntime.async(function getUserById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              id_user: Number(req.params.id)
            }
          }));

        case 3:
          result = _context2.sent;

          if (result) {
            res.status(200).json({
              success: true,
              data: result
            });
          } else {
            res.status(401).json({
              success: false,
              message: "data not found"
            });
          }

          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            msg: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getUserById = getUserById;

var addUser = function addUser(req, res) {
  var _req$body, nama_user, username, password, role, usernameCheck, result;

  return regeneratorRuntime.async(function addUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, nama_user = _req$body.nama_user, username = _req$body.username, password = _req$body.password, role = _req$body.role;
          _context3.next = 4;
          return regeneratorRuntime.awrap(prisma.user.findFirst({
            where: {
              username: username
            }
          }));

        case 4:
          usernameCheck = _context3.sent;

          if (!usernameCheck) {
            _context3.next = 9;
            break;
          }

          res.status(401).json({
            msg: "username sudah ada"
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(prisma.user.create({
            data: {
              nama_user: nama_user,
              username: username,
              password: password,
              role: role
            }
          }));

        case 11:
          result = _context3.sent;
          res.status(201).json({
            success: true,
            message: "Pengguna berhasil ditambah",
            data: result
          });

        case 13:
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.json({
            msg: "error".concat(_context3.t0)
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.addUser = addUser;

var updateUser = function updateUser(req, res) {
  var _req$body2, nama_user, username, password, role, dataCheck, result;

  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, nama_user = _req$body2.nama_user, username = _req$body2.username, password = _req$body2.password, role = _req$body2.role;
          _context4.next = 4;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              id_user: Number(req.params.id)
            }
          }));

        case 4:
          dataCheck = _context4.sent;

          if (dataCheck) {
            _context4.next = 9;
            break;
          }

          res.status(401).json({
            msg: "data tidak ditemukan"
          });
          _context4.next = 13;
          break;

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(prisma.user.update({
            where: {
              id_user: Number(req.params.id)
            },
            data: {
              nama_user: nama_user,
              username: username,
              password: password,
              role: role
            }
          }));

        case 11:
          result = _context4.sent;
          res.json({
            success: true,
            message: "Pengguna berhasil diubah",
            data: result
          });

        case 13:
          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.json({
            msg: _context4.t0
          });

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res) {
  var dataCheck, result;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              id_user: Number(req.params.id)
            }
          }));

        case 3:
          dataCheck = _context5.sent;

          if (dataCheck) {
            _context5.next = 8;
            break;
          }

          res.status(401).json({
            msg: "data tidak ditemukan"
          });
          _context5.next = 12;
          break;

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(prisma.user["delete"]({
            where: {
              id_user: Number(req.params.id)
            }
          }));

        case 10:
          result = _context5.sent;
          res.json({
            success: true,
            message: "Data berhasil dihapus",
            data: result
          });

        case 12:
          _context5.next = 18;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.json({
            msg: _context5.t0
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.deleteUser = deleteUser;