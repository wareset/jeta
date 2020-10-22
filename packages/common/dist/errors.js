"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeErrorFn = exports.ErrorFn = void 0;

const ErrorFn = v => {
  throw new Error(v);
};

exports.ErrorFn = ErrorFn;

const TypeErrorFn = v => {
  throw new TypeError(v);
};

exports.TypeErrorFn = TypeErrorFn;