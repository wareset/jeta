"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require("./errors.js");

Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errors[key];
    }
  });
});

var _splits = require("./splits.js");

Object.keys(_splits).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _splits[key];
    }
  });
});