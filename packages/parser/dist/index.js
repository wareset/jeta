"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("./html.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  html: _html.default,
  walk: _html.default.walk
};
exports.default = _default;