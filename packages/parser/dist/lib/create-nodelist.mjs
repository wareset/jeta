import { TAGNAME_CDATA, TAGNAME_COMMENT, TAG_OPENER_CDATA, TAG_CLOSER_CDATA, TAG_OPENER_COMMENT, TAG_CLOSER_COMMENT } from '@rease/core';
const CDATA_AND_COMMENT = [// ['cdata', '<![CDATA[', ']]>'],
[TAGNAME_CDATA, TAG_OPENER_CDATA, TAG_CLOSER_CDATA], // ['comment', '<!--', '-->']
[TAGNAME_COMMENT, TAG_OPENER_COMMENT, TAG_CLOSER_COMMENT]];
import { TAGNAME_STYLE, TAGNAME_SCRIPT, TAGNAME_TEMPLATE } from '@rease/core'; // ['style', 'script', 'template']

const RESERVED_TAGS = [TAGNAME_STYLE, TAGNAME_SCRIPT, TAGNAME_TEMPLATE];
import { SIGN_LESS, SIGN_MORE, SIGN_SLASH, TAGNAME_TEXT, SIGN_LESS_SLASH_MORE, SIGN_SLASH_MORE, SIGN_LESS_SLASH } from '@rease/core';
export { TAGNAME_COMMENT };
export const OPENER = 'opener';
export const CLOSER = 'closer';
const SAMELESS = 'sameless';

const first = (tag, v) => tag.length >= v.length && tag.indexOf(v) === 0;

const last = (tag, v) => tag.length >= v.length && tag.lastIndexOf(v) === tag.length - v.length;

const getTagName = v => {
  return v.trim().split(/\s+/)[0].replace(/(^[\s<>/]+)|[\s<>/]+$/g, '');
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

const SAFE_QUOTES = /(\))|(\])|(\})|(\()|(\[)|(\{)|(\\?')|(\\?")|(\\?`)/g;
export default function createNodelist(html) {
  const resultDirty = [];
  const data = html.trim().replace(/\r*\n+(\/?>)/, '$1').replace(/(<\/?)\r*\n+/, '$1').replace(/(<!\[CDATA\[|<!--|\]\]>|-->)|(<\/?|--?\s+)|(\/?>)/g, (__, c, a, b) => c ? `\0${c}\0` : (b || '') + '\0' + (a || '')).split(/(\r*\n*\0\r*\n*|\r*\n+)/).map(v => v.replace(/\0/g, '')).filter(v => v.length);
  console.log([...data]);
  let deep = 0;
  let node = [];
  let index;

  data: for (let i = 0; i < data.length; i++) {
    const tag = data[i].trim();

    if (first(tag, SIGN_LESS) && !first(tag, TAG_OPENER_CDATA) && !first(tag, TAG_OPENER_COMMENT)) {
      let isQuote = false;
      const matches = [];
      tag.replace(SAFE_QUOTES, (...a) => {
        a.slice(1, -2).forEach((v, k, a) => {
          if (!v || v.length > 1) return;

          if (!isQuote) {
            if (k >= 3) matches.push(k);else if ((index = matches.indexOf(k + 3)) > -1) {
              matches.splice(index, 1);
            }
          }

          if (k === isQuote) matches.pop(), isQuote = false;else if (k >= 6) isQuote = k; // console.log(a, matches);
        });
      }); // console.log(data[i], matches);

      if (matches.length || !last(tag, SIGN_MORE)) {
        if (i + 1 >= data.length) throw new Error();
        data[i + 1] = data[i] + data[i + 1], data.splice(i, 1), --i;
        continue data;
      }
    }

    for (const block of RESERVED_TAGS) {
      if (first(tag, SIGN_LESS + block)) {
        index = SIGN_LESS_SLASH + block + SIGN_MORE;
        resultDirty.push(node = [deep, block, ...whilerForReserveds(data, i, index)]);
        continue data;
      }
    }

    for (const block of CDATA_AND_COMMENT) {
      index = false;

      if (first(tag, block[1]) || (index = first(tag, SIGN_LESS + block[0]))) {
        index = !index ? block[2] : SIGN_LESS_SLASH + block[0] + SIGN_MORE;
        resultDirty.push(node = [deep, block[0], ...whilerForReserveds(data, i, index)]);
        continue data;
      }
    }

    if (first(tag, SIGN_LESS) && tag[1].match(/[/!{\w]/)) {
      resultDirty.push(node = [deep, '', data[i]]);
      node.tagName = getTagName(data[i]);

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