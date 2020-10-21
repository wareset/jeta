import {
  TAG_SAMELESS_CLOSER,
  TAG_CUSTOM_CLOSER,
  TAG_ONLY_OPENER,
  TAG_ONLY_CLOSER,
  NODETYPE_CDATA_OPENER,
  NODETYPE_CDATA_CLOSER,
  // NODETYPE_COMMENT_OPENER,
  NODETYPE_COMMENT_CLOSER
} from '@jeta/dom/dist/lib/constants/index.mjs';
import { splitSafeBrakets, ERROR } from '@jeta/dom/dist/lib/index.mjs';
import { NODETYPE_COMMENT } from '@jeta/dom/dist/lib/constants/index.mjs';

// const TAG_SAMELESS_CLOSER = '/>';
// const TAG_CUSTOM_CLOSER = '</>';
// const TAG_ONLY_OPENER = '<';
// const TAG_ONLY_CLOSER = '>';
// const NODETYPE_CDATA_OPENER = '<![CDATA[';
// const NODETYPE_CDATA_CLOSER = ']]>';
// const NODETYPE_COMMENT_OPENER = '<!--';
// const NODETYPE_COMMENT_CLOSER = '-->';

export const TYPE_OPENER = 'OPENER';
export const TYPE_CLOSER = 'CLOSER';
export const TYPE_PARAMS = 'PARAMS';
export const TYPE_ONLYCLOSER = 'ONLYCLOSER';
export const TYPE_CDATA = 'CDATA';

const regexp = /(<!\[CDATA\[|\]\]>|<!--|-->|<?\/>|<\/?(!?[{a-zA-Z][\w-}]*)|>)/g;

export const tagfinder = (html, origin) => {
  const data = [];
  const params = {};
  const closers = {};
  const content = [];

  let key = -1;
  let lastTag;
  let lastKeyForOC = key;
  let lastType = TYPE_ONLYCLOSER;
  splitSafeBrakets(html.replace(regexp, '\0$1\0'), '\0').map(v => {
    if (!v) return;
    (v = v.replace(/\0/g, '')), (key = html.indexOf(v, key));
    if (key === -1) ERROR();
    // v = origin.slice(key, key + v.length);
    // console.log(v);
    let tag = '';
    let type = '';

    // if (v.indexOf(NODETYPE_CDATA_OPENER) === 0) {
    //   (tag = v), (type = TYPE_CDATA);
    // } else
    if (
      v === TAG_CUSTOM_CLOSER ||
      v === TAG_SAMELESS_CLOSER
      // ||
      // v === NODETYPE_COMMENT_CLOSER
    ) {
      (tag = lastTag), (type = TYPE_CLOSER);
    } else {
      if (v[0] === TAG_ONLY_OPENER) {
        if (v[1] === '/') {
          tag = v.slice(2);
          type = TYPE_CLOSER;
        } else if (lastType === TYPE_ONLYCLOSER || lastType === TYPE_CLOSER) {
          tag = v.slice(1);
          type = TYPE_OPENER;
        }
      } else if (
        lastType !== TYPE_ONLYCLOSER &&
        (v[0] === TAG_ONLY_CLOSER
          // || v === NODETYPE_COMMENT_CLOSER
        )
      ) {
        tag = lastTag;
        type = tag[0] === '!' ? TYPE_CLOSER : TYPE_ONLYCLOSER;
      } else if (lastType === TYPE_OPENER) {
        type = TYPE_PARAMS;
      }
    }

    v = origin.slice(key, key + v.length);

    const input = [v, key, tag, type];
    if (type === TYPE_OPENER || type === TYPE_CLOSER) {
      data.push(input), (lastKeyForOC = key);
    } else if (type === TYPE_ONLYCLOSER) closers[lastKeyForOC] = input;
    else if (type === TYPE_PARAMS) params[lastKeyForOC] = input;
    else content.push(input);

    if (tag) lastTag = tag;
    if (type) lastType = type;
  });

  // console.log(data);
  // console.log(params);
  // console.log(content);
  // console.log(JSON.stringify(data, null, '  ---\n  '));
  // console.log(data.join('\n--------\n'));

  return [data, params, closers, content];
};
