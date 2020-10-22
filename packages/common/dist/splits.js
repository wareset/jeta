"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitAttr = exports.splitSpaces = exports.splitDefault = void 0;

function _split() {
  const data = _interopRequireDefault(require("@wareset-utilites/split"));

  _split = function () {
    return data;
  };

  return data;
}

function _waresetUtilites() {
  const data = require("wareset-utilites");

  _waresetUtilites = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const brackets = [/\(|\{|\[/, /\)|\}|\]/];

const splitDefault = (str, s = /\s*(,|\s)\s*/, safe = true) => (0, _split().default)(str, s, ...brackets, safe);

exports.splitDefault = splitDefault;
const splitSpaces = (0, _split().default)(null, /\s*(,|\s)\s*/, ...brackets, true, true);
exports.splitSpaces = splitSpaces;

const __splitAttr__ = (0, _split().default)(null, /=/, ...brackets, true, true);

const splitAttr = attr => {
  const [key, ...values] = __splitAttr__(attr);

  let value = (0, _waresetUtilites().trim)(values.join('=') || '', '\'"`'); // console.log(value);

  try {
    value = JSON.parse(value);
  } catch (err) {}

  if (value === '') value = true;
  return [key, value];
};

exports.splitAttr = splitAttr;