import { splitSpaces, splitAttr } from '@rease/common';
import { TAGNAME_CDATA, TAGNAME_COMMENT, TAG_OPENER_CDATA, TAG_CLOSER_CDATA, TAG_OPENER_COMMENT, TAG_CLOSER_COMMENT } from '@rease/core';
const CDATA_AND_COMMENT = [// ['cdata', '<![CDATA[', ']]>'],
[TAGNAME_CDATA, TAG_OPENER_CDATA, TAG_CLOSER_CDATA], // ['comment', '<!--', '-->']
[TAGNAME_COMMENT, TAG_OPENER_COMMENT, TAG_CLOSER_COMMENT]];
import { TAGNAME_STYLE, TAGNAME_SCRIPT, TAGNAME_TEMPLATE } from '@rease/core'; // ['style', 'script', 'template']

const RESERVED_TAGS = [TAGNAME_STYLE, TAGNAME_SCRIPT, TAGNAME_TEMPLATE];
import { SIGN_LESS, SIGN_MORE, SIGN_SLASH, TAGNAME_TEXT, SIGN_SLASH_MORE, SIGN_LESS_SLASH, SIGN_LESS_SLASH_MORE } from '@rease/core';
export { TAGNAME_COMMENT };
export const OPENER = 'opener';
export const CLOSER = 'closer';
export const SAMELESS = 'sameless';

const first = (tag, v) => tag.length >= v.length && tag.indexOf(v) === 0;

const last = (tag, v) => tag.length >= v.length && tag.lastIndexOf(v) === tag.length - v.length;

const parseTagOpener = (v, node = []) => {
  const arr = splitSpaces(v.replace(/(^[\s<>/]+)|[\s<>/]+$/g, ''));
  return [node.tagName, node.attrs] = [arr.shift(), arr.map(v => splitAttr(v))];
};

const whilerForReserveds = (data, i, end) => {
  const res = [data[i], '', ''];

  while (!last(res[2].trim(), end)) {
    res[1] += res[2];

    if (i + 1 >= data.length) {
      if (end) res[2] = end;else throw new Error();
    } else res[2] = data[i + 1], data.splice(i + 1, 1);
  }

  return res;
};

const SAFE_QUOTES = /(\\?')|(\\?")|(\\?`)|(\()|(\[)|(\{)|(\))|(\])|(\})/g;
export default function createNodelist(html) {
  const resultDirty = [];
  const data = html.trim().replace(/\r*\n+(\/?>)/, '$1').replace(/(<\/?)\r*\n+/, '$1').replace(/(<!\[CDATA\[|\]\]>|<!--|-->)|(<\/?|--?\s+)|(\/?>)/g, (__, c, a, b) => c ? `\0${c}\0` : (b || '') + '\0' + (a || '')).split(/(\r*\n*\0\r*\n*|\r*\n+)/).map(v => v.replace(/\0/g, '')).filter(v => v.length);
  console.log([...data]);
  let deep = 0;
  let node = [];
  let tag, index, column;

  data: for (let i = 0; i < data.length; i++) {
    tag = data[i].trim();

    if (first(tag, SIGN_LESS) && !first(tag, TAG_OPENER_CDATA) && !first(tag, TAG_OPENER_COMMENT)) {
      let pusher = '';
      let isWhile = true;
      let isQuote = false;
      const matches = [];

      do {
        column = data[i];
        column.replace(SAFE_QUOTES, (...a) => {
          a.slice(1, -2).forEach((v, k, a) => {
            if (!v || k <= 2 && v.length > 1) return;

            if (isQuote === false) {
              if (k <= 2) isQuote = k;
              if (k <= 5) matches.push(k);else if ((index = matches.indexOf(k - 3)) > -1) {
                matches.splice(index, 1);
              }
            } else if (k === isQuote) matches.pop(), isQuote = false;
          });
        });
        pusher += column;

        if (isWhile = matches.length || !last(pusher.trim(), SIGN_MORE)) {
          if (++i >= data.length) throw new Error();
        }
      } while (isWhile);

      data[i] = pusher;
      tag = pusher.trim();
    }

    for (const block of RESERVED_TAGS) {
      if (first(tag, SIGN_LESS + block)) {
        index = SIGN_LESS_SLASH + block + SIGN_MORE;
        resultDirty.push(node = [deep, block, ...whilerForReserveds(data, i, index)]);
        parseTagOpener(node[2], node);
        continue data;
      }
    }

    for (const block of CDATA_AND_COMMENT) {
      index = false;

      if (first(tag, block[1]) || (index = first(tag, SIGN_LESS + block[0]))) {
        index = !index ? block[2] : SIGN_LESS_SLASH + block[0] + SIGN_MORE;
        resultDirty.push(node = [deep, block[0], ...whilerForReserveds(data, i, index)]);
        parseTagOpener(node[2], node);
        continue data;
      }
    }

    if (first(tag, SIGN_LESS) && tag[1].match(/[/!{\w]/)) {
      resultDirty.push(node = [deep, '', data[i]]);
      parseTagOpener(node[2], node);

      if (tag === SIGN_LESS_SLASH_MORE) {
        resultDirty.forEach(v => v[1] === OPENER && (node.tagName = v.tagName));
      } else if (tag[1] === '!') node.tagName = node.tagName.toLowerCase();

      if (tag[1] === SIGN_SLASH) node[1] = CLOSER, deep--;else if (tag[1] === '!' || last(tag, SIGN_SLASH_MORE)) node[1] = SAMELESS;else node[1] = OPENER, deep++, node[0] = deep;
    } else {
      index = resultDirty[resultDirty.length - 1];
      if (index && index[1] === TAGNAME_TEXT) index[3] += data[i];else resultDirty.push(node = [deep, TAGNAME_TEXT, '', data[i], '']);
    }
  }

  return resultDirty;
}