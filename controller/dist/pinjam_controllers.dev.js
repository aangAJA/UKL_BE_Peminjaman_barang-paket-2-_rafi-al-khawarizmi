"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pinjamanalisis = exports.usageReport = exports.pengembalianBarang = exports.addPeminjaman = exports.getPeminjamanById = exports.getAllPeminjaman = void 0;

var _client = require("@prisma/client");

var _console = _interopRequireWildcard(require("console"));

var _http = require("http");

var _nodeTest = require("node:test");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isValidDate(dateString) {
  var regex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD format

  return regex.test(dateString);
}

var prisma = new _client.PrismaClient();

var getAllPeminjaman = function getAllPeminjaman(req, res) {
  var result, formattedData;
  return regeneratorRuntime.async(function getAllPeminjaman$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(prisma.peminjaman.findMany());

        case 3:
          result = _context.sent;
          formattedData = result.map(function (record) {
            var formattedBorrowDate = new Date(record.borrow_date).toISOString().split("T")[0];
            var formattedReturnDate = new Date(record.return_date).toISOString().split("T")[0];
            return _objectSpread({}, record, {
              borrow_date: formattedBorrowDate,
              return_date: formattedReturnDate
            });
          });
          res.json({
            success: true,
            data: formattedData
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

          _console["default"].log(_context.t0);

          res.json({
            msg: _context.t0
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllPeminjaman = getAllPeminjaman;

var getPeminjamanById = function getPeminjamanById(req, res) {
  var result, formattedBorrowDate, formattedReturnDate, formattedData;
  return regeneratorRuntime.async(function getPeminjamanById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(prisma.peminjaman.findUnique({
            where: {
              id_peminjaman: Number(req.params.id)
            }
          }));

        case 3:
          result = _context2.sent;

          if (result) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Data not found"
          }));

        case 6:
          // Format the single record
          formattedBorrowDate = new Date(result.borrow_date).toISOString().split("T")[0];
          formattedReturnDate = new Date(result.return_date).toISOString().split("T")[0]; // Create a formatted response object

          formattedData = _objectSpread({}, result, {
            borrow_date: formattedBorrowDate,
            return_date: formattedReturnDate
          });
          res.json({
            success: true,
            data: formattedData
          });
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);

          _console["default"].log(_context2.t0);

          res.status(500).json({
            msg: _context2.t0.message || "Internal server error"
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getPeminjamanById = getPeminjamanById;

var addPeminjaman = function addPeminjaman(req, res) {
  var _req$body, id_user, item_id, borrow_date, return_date, qty, formattedBorrowDate, formattedReturnDate, _ref, _ref2, getUserId, getBarangId, item, result, minQty;

  return regeneratorRuntime.async(function addPeminjaman$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, id_user = _req$body.id_user, item_id = _req$body.item_id, borrow_date = _req$body.borrow_date, return_date = _req$body.return_date, qty = _req$body.qty;
          formattedBorrowDate = new Date(borrow_date).toISOString();
          formattedReturnDate = new Date(return_date).toISOString();
          _context3.next = 5;
          return regeneratorRuntime.awrap(Promise.all([prisma.user.findUnique({
            where: {
              id_user: Number(id_user)
            }
          }), prisma.barang.findUnique({
            where: {
              id_barang: Number(item_id)
            }
          })]));

        case 5:
          _ref = _context3.sent;
          _ref2 = _slicedToArray(_ref, 2);
          getUserId = _ref2[0];
          getBarangId = _ref2[1];

          if (!(getUserId && getBarangId)) {
            _context3.next = 33;
            break;
          }

          _context3.prev = 10;
          _context3.next = 13;
          return regeneratorRuntime.awrap(prisma.barang.findUnique({
            where: {
              id_barang: Number(item_id)
            }
          }));

        case 13:
          item = _context3.sent;

          if (item) {
            _context3.next = 16;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Barang dengan id_barang ".concat(item_id, " tidak ditemukan")
          }));

        case 16:
          if (!(qty > item.jumlah)) {
            _context3.next = 18;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Jumlah yang diminta (".concat(qty, ") melebihi jumlah yang tersedia (").concat(item.jumlah, ").")
          }));

        case 18:
          _context3.next = 20;
          return regeneratorRuntime.awrap(prisma.peminjaman.create({
            data: {
              User: {
                connect: {
                  id_user: Number(id_user)
                }
              },
              Barang: {
                connect: {
                  id_barang: Number(item_id)
                }
              },
              qty: qty,
              borrow_date: formattedBorrowDate,
              return_date: formattedReturnDate
            }
          }));

        case 20:
          result = _context3.sent;
          // Update the item's quantity after successful borrowing
          minQty = item.jumlah - qty;
          _context3.next = 24;
          return regeneratorRuntime.awrap(prisma.barang.update({
            where: {
              id_barang: Number(item_id)
            },
            data: {
              jumlah: minQty
            }
          }));

        case 24:
          // Respond with success message
          res.status(201).json({
            success: true,
            message: "Peminjaman Berhasil Dicatat",
            data: {
              id_user: result.id_user,
              id_barang: result.id_barang,
              qty: result.qty,
              borrow_date: result.borrow_date.toISOString().split("T")[0],
              return_date: result.return_date.toISOString().split("T")[0],
              status: result.status
            }
          });
          _context3.next = 31;
          break;

        case 27:
          _context3.prev = 27;
          _context3.t0 = _context3["catch"](10);

          _console["default"].error(_context3.t0);

          res.status(500).json({
            success: false,
            msg: _context3.t0.message || "Internal server error"
          });

        case 31:
          _context3.next = 34;
          break;

        case 33:
          res.status(404).json({
            success: false,
            msg: "User dan barang belum ada"
          });

        case 34:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[10, 27]]);
};

exports.addPeminjaman = addPeminjaman;

var pengembalianBarang = function pengembalianBarang(req, res) {
  var _req$body2, borrow_id, return_date, Status, formattedReturnDate, cekBorrow, result, item, restoreQty;

  return regeneratorRuntime.async(function pengembalianBarang$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, borrow_id = _req$body2.borrow_id, return_date = _req$body2.return_date, Status = _req$body2.Status;
          formattedReturnDate = new Date(return_date).toISOString();
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(prisma.peminjaman.findUnique({
            where: {
              id_peminjaman: Number(borrow_id)
            }
          }));

        case 5:
          cekBorrow = _context4.sent;

          if (cekBorrow) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "Peminjaman tidak ditemukan."
          }));

        case 8:
          if (!(cekBorrow.status === 'dipinjam')) {
            _context4.next = 25;
            break;
          }

          _context4.next = 11;
          return regeneratorRuntime.awrap(prisma.peminjaman.update({
            where: {
              id_peminjaman: borrow_id
            },
            data: {
              return_date: formattedReturnDate,
              status: 'dikembalikan' // Ensure this is a string or variable defined elsewhere

            }
          }));

        case 11:
          result = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(prisma.barang.findUnique({
            where: {
              id_barang: Number(cekBorrow.id_baranG)
            } // Corrected variable name to match schema

          }));

        case 14:
          item = _context4.sent;

          if (item) {
            _context4.next = 19;
            break;
          }

          throw new Error("Barang dengan id_barang ".concat(cekBorrow.id_barang, " tidak ditemukan"));

        case 19:
          // Restore quantity in barang table
          restoreQty = cekBorrow.qty + item.jumlah;
          _context4.next = 22;
          return regeneratorRuntime.awrap(prisma.barang.update({
            where: {
              id_barang: Number(cekBorrow.id_baranG)
            },
            data: {
              jumlah: restoreQty
            }
          }));

        case 22:
          res.status(201).json({
            success: true,
            message: "Pengembalian Berhasil Dicatat",
            data: {
              id_peminjaman: result.id_peminjaman,
              id_user: result.id_user,
              id_barang: result.id_barang,
              qty: result.qty,
              return_date: result.return_date.toISOString().split("T")[0],
              // Format tanggal (YYYY-MM-DD)
              status: result.status
            }
          });
          _context4.next = 26;
          break;

        case 25:
          res.status(400).json({
            success: false,
            message: "Status peminjaman tidak valid."
          });

        case 26:
          _context4.next = 32;
          break;

        case 28:
          _context4.prev = 28;
          _context4.t0 = _context4["catch"](2);

          _console["default"].error(_context4.t0);

          res.status(500).json({
            success: false,
            msg: _context4.t0.message || "Internal server error"
          });

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 28]]);
};

exports.pengembalianBarang = pengembalianBarang;

var usageReport = function usageReport(req, res) {
  var _req$body3, start_date, end_date, category, location, group_by, nama_baraNG, formattedStartDate, formattedEndDate, items, borrowRecords, validGroupBy, analysis;

  return regeneratorRuntime.async(function usageReport$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, start_date = _req$body3.start_date, end_date = _req$body3.end_date, category = _req$body3.category, location = _req$body3.location, group_by = _req$body3.group_by, nama_baraNG = _req$body3.nama_baraNG;
          formattedStartDate = new Date(start_date).toISOString();
          formattedEndDate = new Date(end_date).toISOString();
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(prisma.barang.findMany({
            where: {
              AND: [category ? {
                kategori: {
                  contains: category
                }
              } : {}, location ? {
                location: {
                  contains: location
                }
              } : {}]
            }
          }));

        case 6:
          items = _context5.sent;

          if (!(items.length === 0)) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            status: "fail",
            message: "No items found for the given filters."
          }));

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(prisma.peminjaman.findMany({
            where: {
              borrow_date: {
                gte: formattedStartDate
              },
              return_date: {
                lte: formattedEndDate
              }
            }
          }));

        case 11:
          borrowRecords = _context5.sent;
          validGroupBy = ["kategori", "lokasi"];

          if (validGroupBy.includes(group_by)) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            status: "fail",
            message: "Invalid group_by value. Must be one of: ".concat(validGroupBy.join(", "))
          }));

        case 15:
          // Group data based on item category
          analysis = items.map(function (item) {
            var relevantBorrows = borrowRecords.filter(function (record) {
              return record.id_baranG === item.id_barang;
            });
            var totalBorrowed = relevantBorrows.reduce(function (sum, record) {
              return sum + record.qty;
            }, 0);
            var totalReturned = relevantBorrows.reduce(function (sum, record) {
              return record.status === "dikembalikan" ? sum + record.qty : sum;
            }, 0);
            return {
              group: group_by === 'kategori' ? item.kategori : item.location,
              nama: item.nama_barang,
              item_id: item.id_barang,
              total_borrowed: totalBorrowed,
              total_returned: totalReturned,
              item_in_use: totalBorrowed - totalReturned
            };
          }); // Send the response with usage analysis

          res.status(200).json({
            status: "success",
            data: {
              analysis_period: {
                start_date: start_date,
                end_date: end_date,
                group: _console.group,
                nama_baraNG: nama_baraNG
              },
              usage_analysis: analysis
            }
          });
          _context5.next = 23;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](3);

          _console["default"].error(_context5.t0);

          res.status(500).json({
            status: "error",
            message: "An error occurred while processing the usage report.",
            error: "".concat(_context5.t0)
          });

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 19]]);
};

exports.usageReport = usageReport;

var pinjamanalisis = function pinjamanalisis(req, res) {
  var _req$body4, start_date, end_date, category, location, group_by, nama_baraNG, formattedStartDate, formattedEndDate, items, borrowRecords, analysis;

  return regeneratorRuntime.async(function pinjamanalisis$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, start_date = _req$body4.start_date, end_date = _req$body4.end_date, category = _req$body4.category, location = _req$body4.location, group_by = _req$body4.group_by, nama_baraNG = _req$body4.nama_baraNG;
          formattedStartDate = new Date(start_date).toISOString();
          formattedEndDate = new Date(end_date).toISOString();
          _context6.prev = 3;
          _context6.next = 6;
          return regeneratorRuntime.awrap(prisma.barang.findMany({
            where: {
              AND: [category ? {
                kategori: {
                  contains: category
                }
              } : {}, location ? {
                location: {
                  contains: location
                }
              } : {}]
            }
          }));

        case 6:
          items = _context6.sent;

          if (!(items.length === 0)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            status: "fail",
            message: "No items found for the given filters."
          }));

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(prisma.peminjaman.findMany({
            where: {
              borrow_date: {
                gte: formattedStartDate
              },
              return_date: {
                lte: formattedEndDate
              }
            }
          }));

        case 11:
          borrowRecords = _context6.sent;
          // Group data based on item category
          analysis = items.map(function (item) {
            var relevantBorrows = borrowRecords.filter(function (record) {
              return record.id_baranG === item.id_barang;
            });
            var totalBorrowed = relevantBorrows.reduce(function (sum, record) {
              return sum + record.qty;
            }, 0);
            var totalReturned = relevantBorrows.reduce(function (sum, record) {
              return record.status === "kembali" ? sum + record.qty : sum;
            }, 0);
            return {
              nama: item.nama_barang,
              item_id: item.id_barang,
              category: item.kategori,
              jumlah_barang: item.jumlah,
              total_borrowed: totalBorrowed,
              total_returned: totalReturned,
              items_in_use: totalBorrowed - totalReturned
            };
          }); // Send the response with usage analysis

          res.status(200).json({
            status: "success",
            data: {
              analysis_period: {
                start_date: start_date,
                end_date: end_date,
                nama_baraNG: nama_baraNG
              },
              usage_analysis: analysis
            }
          });
          _context6.next = 20;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](3);

          _console["default"].error(_context6.t0);

          res.status(500).json({
            status: "error",
            message: "An error occurred while processing the usage report.",
            error: "".concat(_context6.t0)
          });

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 16]]);
};

exports.pinjamanalisis = pinjamanalisis;