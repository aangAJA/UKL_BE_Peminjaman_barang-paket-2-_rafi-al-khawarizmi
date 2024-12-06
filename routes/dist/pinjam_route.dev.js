"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _pinjam_controllers = require("../controller/pinjam_controllers.js");

var _auth_controllers = require("../controller/auth_controllers.js");

var _role_validation = require("../middleware/role_validation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get('/', _auth_controllers.authorize, _pinjam_controllers.getAllPeminjaman);
app.get('/:id', _auth_controllers.authorize, _pinjam_controllers.getPeminjamanById);
app.post('/borrow', _auth_controllers.authorize, _role_validation.admin, _pinjam_controllers.addPeminjaman);
app.post('/return', _auth_controllers.authorize, _role_validation.admin, _pinjam_controllers.pengembalianBarang);
app.post('/usage-report', _auth_controllers.authorize, _role_validation.admin, _pinjam_controllers.usageReport);
app.post('/borrow-analysis', _auth_controllers.authorize, _role_validation.admin, _pinjam_controllers.pinjamanalisis);
var _default = app; // app.use(authenticate)
// app.use(admin)
// app.use(siswa)

exports["default"] = _default;