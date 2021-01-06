'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compile = require('../compile');
var __langs__ = require('./langs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var compile__default = /*#__PURE__*/_interopDefaultLegacy(compile);
var __langs____namespace = /*#__PURE__*/_interopNamespace(__langs__);

function nodeCompile(content = '', optionsStart = compile.OPTIONS) {
    return compile__default['default'](content, { ...optionsStart, __langs__: __langs____namespace });
}

exports.default = nodeCompile;
