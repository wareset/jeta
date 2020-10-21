import { __ROOT__, __Text__, __CDATA__, __Comment__ } from '@rease/core';
import { __Element__, __Style__, __Script__, __Template__ } from '@rease/core';
import { TAGNAME_TEXT, TAGNAME_CDATA, TAGNAME_COMMENT } from '@rease/core';
import { TAGNAME_STYLE, TAGNAME_SCRIPT, TAGNAME_TEMPLATE } from '@rease/core';
import { OPENER, CLOSER } from './create-nodelist.mjs';
const RESERVED_TAGS = {
  [TAGNAME_TEXT]: __Text__,
  [TAGNAME_CDATA]: __CDATA__,
  [TAGNAME_COMMENT]: __Comment__,
  [TAGNAME_STYLE]: __Style__,
  [TAGNAME_SCRIPT]: __Script__,
  [TAGNAME_TEMPLATE]: __Template__
};
export default function createTree(nodelist) {
  const res = new __ROOT__();
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

    if (node[1] === OPENER) {
      CLASS = new __Element__(), CLASS.tagName = node.tagName;
      CLASS.parent = current;
      current.children.push(CLASS), current = CLASS;
      if (node[2]) current.tagOpener = node[2];
    }

    if (node[1] === CLOSER) {
      if (node.tagName === current.tagName) {
        current.tagCloser = node[2], current = current.parent;
      } else console.error(node, current);
    }
  }

  console.log(res);
  return res;
}