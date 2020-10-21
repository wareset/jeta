import {
  NODETYPE_STYLE,
  NODETYPE_SCRIPT,
  NODETYPE_TEMPLATE
} from '@jeta/dom/dist/lib/constants/index.mjs';

import {
  NODETYPE_CDATA,
  NODETYPE_COMMENT
} from '@jeta/dom/dist/lib/constants/index.mjs';

import {
  TAG_SAMELESS_CLOSER,
  TAG_CUSTOM_CLOSER,
  TAG_ONLY_OPENER,
  TAG_ONLY_CLOSER,
  // NODETYPE_CDATA_OPENER,
  NODETYPE_CDATA_CLOSER,
  // NODETYPE_COMMENT_OPENER,
  NODETYPE_COMMENT_CLOSER
} from '@jeta/dom/dist/lib/constants/index.mjs';

// export const TAG_SAMELESS_CLOSER = '/>';
// export const TAG_CUSTOM_CLOSER = '</>';
// export const TAG_ONLY_OPENER = '<';
// export const TAG_ONLY_CLOSER = '>';

const CDATA_OPENER = TAG_ONLY_OPENER + 'cmcdata' + TAG_ONLY_CLOSER;
const COMMENT_OPENER = TAG_ONLY_OPENER + 'cm' + TAG_ONLY_CLOSER;
// const CLOSER = ' ' + TAG_SAMELESS_CLOSER;

// '<![CDATA['
// '<cdatacmt'
// '<!--'
// '<cmt'

const regexp1 = (() =>
  new RegExp(
    '(<!\\[CDATA\\[)([^]*?)(\\]\\]>)|(<!--)([^]*?)(-->)|' +
      [NODETYPE_STYLE, NODETYPE_SCRIPT, NODETYPE_TEMPLATE]
        .map(v => `(<${v}[^]*?>)([^]*?)(<\\/${v}>)`)
        .join('|'),
    'gim'
  ))();

const regexp2 = /([^<]*)(>)([^<>]+?)(<)([^>]*)/g;

const replace = (len, CACHE, a, i) => {
  if (!(len in CACHE)) {
    (CACHE[len] = a[i]), (a[i] = a[i].replace(/[^\s-]/g, '%'));
  }
};

export function cacher(html, CACHE) {
  html = html.replace(regexp1, (...a) => {
    a = a.slice(1, -1).filter(v => v !== undefined);

    if (a[2] === NODETYPE_CDATA_CLOSER) {
      (a[0] = CDATA_OPENER), (a[2] = TAG_CUSTOM_CLOSER);
    }
    if (a[2] === NODETYPE_COMMENT_CLOSER) {
      (a[0] = COMMENT_OPENER), (a[2] = TAG_CUSTOM_CLOSER);
    }

    replace(a.pop() + a[0].length, CACHE, a, 1);
    return a.join('');
  });

  html = html.replace(regexp2, (...a) => {
    a = a.slice(1, -1);
    replace(a.pop() + a[0].length + a[1].length, CACHE, a, 2);
    return a.join('');
  });

  console.log(html);
  return html;
}
