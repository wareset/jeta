"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHTML;

var _createNodelist = _interopRequireDefault(require("./lib/create-nodelist.js"));

var _validate = _interopRequireDefault(require("./lib/validate.js"));

var _createTree = _interopRequireDefault(require("./lib/create-tree.js"));

function _core() {
  const data = require("@rease/core");

  _core = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_OPTIONS = {
  validate: true
};

function parseHTML(html, options) {
  options = { ...DEFAULT_OPTIONS,
    ...(options || {})
  };
  const nodelist = (0, _createNodelist.default)(html);
  const nodelistDirty = [...nodelist];

  if (options.validate) {
    const validatedTags = (0, _validate.default)(nodelist.filter(v => v[1] === _createNodelist.OPENER || v[1] === _createNodelist.CLOSER));
    console.log(validatedTags);
    nodelist.forEach(v => {
      if ((v[1] === _createNodelist.OPENER || v[1] === _createNodelist.CLOSER) && !~validatedTags.indexOf(v)) {
        v[0] = -99, v[1] = _core().TAGNAME_COMMENT, delete v.tagName;
        v[3] = v[2], v[2] = _core().TAG_OPENER_COMMENT, v[4] = _core().TAG_CLOSER_COMMENT;
      }
    });
  }

  const tree = (0, _createTree.default)(nodelist);
  return {
    nodelist,
    nodelistDirty,
    tree
  };
}

const __walk__ = (ast, cb, __parent__, key) => {
  cb(ast, __parent__, key || 0);

  if (ast.children) {
    for (let i = 0; i < ast.children.length; i++) {
      __walk__(ast.children[i], cb, ast, i);
    }
  }

  return ast;
};

parseHTML.walk = (ast, cb) => __walk__(ast, cb);