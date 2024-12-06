"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _barang_controllers = require("../controller/barang_controllers.js");

var _auth_controllers = require("../controller/auth_controllers.js");

var _role_validation = require("../middleware/role_validation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get('/', _auth_controllers.authorize, _barang_controllers.getAllbarang);
app.get('/:id', _auth_controllers.authorize, _barang_controllers.getbarangById);
app.post('/', _auth_controllers.authorize, _role_validation.admin, _barang_controllers.addbarang);
app.put('/:id', _auth_controllers.authorize, _role_validation.admin, _barang_controllers.updatebarang);
app["delete"]('/:id', _auth_controllers.authorize, _role_validation.admin, _barang_controllers.deletebarang);
var _default = app;
exports["default"] = _default;