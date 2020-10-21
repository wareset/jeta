"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTree;

function _core() {
  const data = require("@rease/core");

  _core = function () {
    return data;
  };

  return data;
}

var _createNodelist = require("./create-nodelist.js");

const RESERVED_TAGS = {
  [_core().TAGNAME_TEXT]: _core().__Text__,
  [_core().TAGNAME_CDATA]: _core().__CDATA__,
  [_core().TAGNAME_COMMENT]: _core().__Comment__,
  [_core().TAGNAME_STYLE]: _core().__Style__,
  [_core().TAGNAME_SCRIPT]: _core().__Script__,
  [_core().TAGNAME_TEMPLATE]: _core().__Template__
};

function createTree(nodelist) {
  const res = new (_core().__ROOT__)();
  let current = res;
  let CLASS;

  nodelist: for (let i = 0; i < nodelist.length; i++) {
    const node = nodelist[i];

    if (node[1] in RESERVED_TAGS) {
      CLASS = new RESERVED_TAGS[node[1]](), CLASS.wholeText = node[3];
      if (node[2]) CLASS.tagOpener = node[2];
      if (node[4]) CLASS.tagCloser = node[4];
      current.children.push(CLASS);
      continue nodelist;
    }

    if (node[1] === _createNodelist.OPENER) {
      CLASS = new (_core().__Element__)(), CLASS.tagName = node.tagName;
      CLASS.parent = current;
      current.children.push(CLASS), current = CLASS;
      if (node[2]) current.tagOpener = node[2];
    }

    if (node[1] === _createNodelist.CLOSER) {
      if (node.tagName === current.tagName) {
        current.tagCloser = node[2], current = current.parent;
      } else console.error(node, current);
    }
  }

  console.log(res);
  return res;
}