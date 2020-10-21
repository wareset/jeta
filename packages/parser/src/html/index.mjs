import {
  NODETYPES,
  // __CHILDREN__,
  __ROOT__
} from '../../node-classes/index.mjs';

import {
  // NODETYPE_ROOT,
  NODETYPE_TEXT,
  NODETYPE_CDATA,
  NODETYPE_COMMENT,
  NODETYPE_ELEMENT,
  NODETYPE_DOCTYPE
} from '../../lib/constants/index.mjs';

import {
  TAG_SAMELESS_CLOSER,
  TAG_CUSTOM_CLOSER,
  // TAG_ONLY_OPENER,
  TAG_ONLY_CLOSER,
  NODETYPE_CDATA_OPENER,
  NODETYPE_CDATA_CLOSER,
  NODETYPE_COMMENT_OPENER,
  NODETYPE_COMMENT_CLOSER
} from '../../lib/constants/index.mjs';

// import {
//   CHECK_CDATA_STEP_1,
//   CHECK_CDATA_STEP_2,
//   CHECK_COMMENT_STEP_1,
//   CHECK_COMMENT_STEP_2
// } from './lib/check-cdata-comment.mjs';
import { validate } from './lib/validate.mjs';
import {
  TYPE_OPENER,
  TYPE_CLOSER,
  TYPE_PARAMS,
  TYPE_ONLYCLOSER,
  TYPE_CDATA
} from './lib/tagfinder.mjs';
import { tagfinder } from './lib/tagfinder.mjs';
import { cacher } from './lib/cacher.mjs';

const regexp = /(<!\[CDATA\[|\]\]>|<!--|-->|<?\/>|<\/?(!?[{a-zA-Z][\w-}]*)>?)/g;

const DEFAULT_OPTIONS = {
  strict: true,
  cached: true,
  comments: true,
  cdata: true
};

export default function parseHTML(html, options) {
  options = { ...DEFAULT_OPTIONS, ...(options || {}) };

  const CACHE = {};
  let [data, params, closers, content] = tagfinder(cacher(html, CACHE), html);
  console.log(CACHE);
  data = validate(data);
  (() => {
    let k;
    for (let i = data.length; (i -= 1) >= 0; undefined) {
      k = data[i][1];
      // const type = data[i][3];
      // console.log(type, k);
      if (k in closers) data.splice(i + 1, 0, closers[k]), delete closers[k];
      if (k in params) data.splice(i + 1, 0, params[k]), delete params[k];
    }
  })();

  // console.log(data);

  console.log({ data, params, closers, content });
  return;
  /*
  let isComment = false;
  let isCDATA = false;
  let disableHidden = false;
  let data = [];
  html.replace(regexp, (__, tag, tagName, pos) => {
    let isClosestTag = false;
    if (tagName) tagName = tagName.toLowerCase();

    if (tag === NODETYPE_COMMENT_OPENER || tag === NODETYPE_COMMENT_CLOSER) {
      tagName = NODETYPE_COMMENT;
      (disableHidden = false), (isComment = tag === NODETYPE_COMMENT_OPENER);
    } else if (tag === NODETYPE_CDATA_OPENER || tag === NODETYPE_CDATA_CLOSER) {
      tagName = NODETYPE_CDATA;
      (disableHidden = false), (isCDATA = tag === NODETYPE_CDATA_OPENER);
    }

    if (
      tag[1] === '/' ||
      tag === TAG_SAMELESS_CLOSER ||
      tag === NODETYPE_CDATA_CLOSER ||
      tag === NODETYPE_COMMENT_CLOSER
    ) {
      isClosestTag = true;
    }

    if (!disableHidden) {
      data.push([tag, tagName, pos, isClosestTag]);
      if (tagName === NODETYPE_DOCTYPE) {
        const last = html.indexOf(TAG_ONLY_CLOSER, pos);
        data.push([TAG_ONLY_CLOSER, tagName, last, true]);
      }
    }

    disableHidden = isComment || isCDATA;
  });

  data = validate(data);
  console.log(html);
  data.unshift(['', '', 0]);
  console.log(data);

  // const res = [];
  // res.children = new __CHILDREN__();
  // let current = res;

  const res = new __ROOT__();
  (res.start = 0), (res.end = html.length);
  let current = res;

  let lastPos = html.length;
  let arr = [];
  let text = true;
  (isComment = false), (isCDATA = false);
  let wholeText;

  for (let i = data.length; (i -= 1) >= 0; undefined) {
    // if (isComment) options.comments && (i = CHECK_COMMENT_STEP_1(data, i));
    // if (isCDATA) options.cdata && (i = CHECK_CDATA_STEP_1(data, i));

    let [tag, tagName, pos, isClosestTag] = data[i];

    // if (tag === NODETYPE_COMMENT_CLOSER) {
    //   if (options.comments && CHECK_COMMENT_STEP_2(data, i)) continue;
    // } else if (tag === NODETYPE_CDATA_CLOSER) {
    //   if (options.cdata && CHECK_CDATA_STEP_2(data, i)) continue;
    // }

    // console.log(tag, tagName, pos);
    // console.log([tag, tagName, pos, current]);

    if (current.tagName) {
      wholeText = html.slice(pos + tag.length, lastPos);
      if (current.tagName === NODETYPE_COMMENT) text = current;
      else if (current.tagName === NODETYPE_CDATA) text = current;
      else {
        if (!text) current.children.shift();
        text = new NODETYPES[NODETYPE_TEXT]();
        text.parent = current;
        (text.start = pos + tag.length), (text.end = lastPos);
        text.tagName = NODETYPE_TEXT;

        if (text.start !== text.end) current.children.unshift(text);
      }
      text.wholeText = wholeText;
      (text.pos = pos), (text.id = i);
      if (current.tagName in CACHED_TAGS && wholeText in CACHE) {
        text.wholeText = CACHE[wholeText];
      }
    }

    text = false;

    if (isClosestTag) {
      if (
        tag === TAG_SAMELESS_CLOSER &&
        !(data[i - 1] && data[i - 1][1] !== '/')
      ) {
        continue;
      }

      if (tag === NODETYPE_COMMENT_CLOSER && options.comments) isComment = true;
      else if (tag === NODETYPE_CDATA_CLOSER && options.cdata) isCDATA = true;

      arr = new (NODETYPES[tagName] || NODETYPES[NODETYPE_ELEMENT])();
      arr.parent = current;

      (arr.pos = pos), (arr.id = i);
      (arr.tagName = tagName || tag), (arr.end = pos + tag.length);
      current.children.unshift(arr), (current = arr);
    } else {
      if (tagName !== current.tagName) {
        if (current.tagName === TAG_CUSTOM_CLOSER) {
          current.tagName = tagName;
        } else if (current.tagName === TAG_SAMELESS_CLOSER) {
          current.tagName = tagName;
          current.sameless = true;
        } else if (
          current.tagName !== NODETYPE_CDATA &&
          current.tagName !== NODETYPE_COMMENT
        ) {
          continue;
        }
      }

      current.start = pos;
      if (current.children && tag[tag.length - 1] !== TAG_ONLY_CLOSER) {
        const content = current.children[0].wholeText.split(TAG_ONLY_CLOSER);
        const attrs = (current.attrsOrigin = content.shift());
        const wholeText = content.join(TAG_ONLY_CLOSER);

        tag += attrs;
        tag += !current.sameless ? TAG_ONLY_CLOSER : TAG_SAMELESS_CLOSER;

        current.children[0].wholeText = wholeText;
        current.children[0].start += attrs.length + 1;

        if (current.tagName in CACHED_TAGS && wholeText in CACHE) {
          current.children[0].wholeText = CACHE[wholeText];
        }
        if (wholeText === '') current.children.splice(0, 1);
      }
      current.tagOrigin = tag;
      current = current.parent;
    }

    text = true;
    lastPos = pos;
  }
*/
  return res;
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

// export const parseHtml = (html, options) => {
//   const tree = parseHtmlDirty(html, options);
//   let ID = 0;
//   walk(tree, (node, parent) => {
//     // console.log(node, parent);

//     if (node.tag && node.tag[node.tag.length - 1] !== TAG_ONLY_CLOSER) {
//       const [attrs, ...content] = node.children[0].wholeText.split(
//         TAG_ONLY_CLOSER
//       );

//       // node.attrs = parseAttributes(attrs);
//       node.children[0].wholeText = content.join(TAG_ONLY_CLOSER);
//       node.tag += attrs;
//       node.tag += !node.sameless ? TAG_ONLY_CLOSER : TAG_SAMELESS_CLOSER;
//       node.children[0].start += attrs.length + 1;
//       if (node.children[0].wholeText === '') node.children.splice(0, 1);
//     }

//     if (node.tag) node.id = ID++;

//     // delete node.__parent__;
//     // Object.defineProperty(node, 'parent', {
//     //   enumerable: false,
//     //   configurable: true,
//     //   writable: true,
//     //   value: parent
//     // });

//     // console.log([html.slice(node.start, node.end)], node);
//   });
//   return tree;
// };
