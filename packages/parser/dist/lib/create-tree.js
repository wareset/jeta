"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTree;

var _createNodelist = require("./create-nodelist.js");

function _core() {
  const data = require("@rease/core");

  _core = function () {
    return data;
  };

  return data;
}

function createTree(nodelist) {
  const res = new (_core().__ROOT__)();
  let current = res;
  let NODE;

  nodelist: for (let i = 0; i < nodelist.length; i++) {
    const node = nodelist[i];

    if (node[1] === _createNodelist.CLOSER) {
      if (node.tagName === current.tagName) {
        current.tagCloser = node[2], current = current.parent;
      } else console.error(node, current);

      continue nodelist;
    }

    NODE = new (_core().NODETYPES[node[1]] || _core().NODETYPES[node.tagName] || _core().__Element__)();
    if (node[2]) NODE.tagOpener = node[2];
    if (node[3]) NODE.wholeText = node[3];
    if (node[4]) NODE.tagCloser = node[4];
    if (!NODE.tagName) NODE.tagName = node.tagName;
    if (node.attrs) NODE.attrs = node.attrs;
    NODE.parent = current, current.children.push(NODE);
    if (node[1] === _createNodelist.OPENER) current = NODE;
  }

  console.log(res);
  return res;
}