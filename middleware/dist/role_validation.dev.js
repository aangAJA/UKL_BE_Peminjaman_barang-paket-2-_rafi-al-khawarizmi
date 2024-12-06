"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siswa = exports.admin = void 0;

var admin = function admin(req, res, next) {
  var userRole;
  return regeneratorRuntime.async(function admin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userRole = req.user.role;

          if (userRole == 'admin') {
            next();
          } else {
            res.status(403).json({
              success: false,
              auth: false,
              message: 'You are not admin'
            });
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.admin = admin;

var siswa = function siswa(req, res, next) {
  var userRole;
  return regeneratorRuntime.async(function siswa$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userRole = req.user.role;

          if (userRole == 'siswa') {
            next();
          } else {
            res.status(403).json({
              success: false,
              auth: false,
              message: 'You are not member'
            });
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.siswa = siswa;