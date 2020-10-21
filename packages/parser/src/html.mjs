import createNodelist from './lib/create-nodelist.mjs';
import validate from './lib/validate.mjs';
import createTree from './lib/create-tree.mjs';
import { OPENER, CLOSER } from './lib/create-nodelist.mjs';
import {
  TAGNAME_COMMENT,
  TAG_OPENER_COMMENT,
  TAG_CLOSER_COMMENT
} from '@rease/core';

const DEFAULT_OPTIONS = {
  validate: true
};

export default function parseHTML(html, options) {
  options = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const nodelist = createNodelist(html);
  const nodelistDirty = [...nodelist];

  if (options.validate) {
    const validatedTags = validate(
      nodelist.filter(v => v[1] === OPENER || v[1] === CLOSER)
    );

    console.log(validatedTags);
    nodelist.forEach(v => {
      if ((v[1] === OPENER || v[1] === CLOSER) && !~validatedTags.indexOf(v)) {
        (v[0] = -99), (v[1] = TAGNAME_COMMENT), delete v.tagName;
        (v[3] = v[2]), (v[2] = TAG_OPENER_COMMENT), (v[4] = TAG_CLOSER_COMMENT);
      }
    });
  }

  const tree = createTree(nodelist);

  return {nodelist, nodelistDirty, tree };
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
