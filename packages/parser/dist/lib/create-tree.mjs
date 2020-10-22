import { OPENER, CLOSER } from './create-nodelist.mjs';
import { NODETYPES, __ROOT__, __Element__ } from '@rease/core';
export default function createTree(nodelist) {
  const res = new __ROOT__();
  let current = res;
  let NODE;

  nodelist: for (let i = 0; i < nodelist.length; i++) {
    const node = nodelist[i];

    if (node[1] === CLOSER) {
      if (node.tagName === current.tagName) {
        current.tagCloser = node[2], current = current.parent;
      } else console.error(node, current);

      continue nodelist;
    }

    NODE = new (NODETYPES[node[1]] || NODETYPES[node.tagName] || __Element__)();
    if (node[2]) NODE.tagOpener = node[2];
    if (node[3]) NODE.wholeText = node[3];
    if (node[4]) NODE.tagCloser = node[4];
    if (!NODE.tagName) NODE.tagName = node.tagName;
    if (node.attrs) NODE.attrs = node.attrs;
    NODE.parent = current, current.children.push(NODE);
    if (node[1] === OPENER) current = NODE;
  }

  console.log(res);
  return res;
}