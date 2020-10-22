"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNodelist;
Object.defineProperty(exports, "TAGNAME_COMMENT", {
  enumerable: true,
  get: function () {
    return _core().TAGNAME_COMMENT;
  }
});
exports.SAMELESS = exports.CLOSER = exports.OPENER = void 0;

function _common() {
  const data = require("@rease/common");

  _common = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@rease/core");

  _core = function () {
    return data;
  };

  return data;
}

const CDATA_AND_COMMENT = [// ['cdata', '<![CDATA[', ']]>'],
[_core().TAGNAME_CDATA, _core().TAG_OPENER_CDATA, _core().TAG_CLOSER_CDATA], // ['comment', '<!--', '-->']
[_core().TAGNAME_COMMENT, _core().TAG_OPENER_COMMENT, _core().TAG_CLOSER_COMMENT]];
// ['style', 'script', 'template']
const RESERVED_TAGS = [_core().TAGNAME_STYLE, _core().TAGNAME_SCRIPT, _core().TAGNAME_TEMPLATE];
const OPENER = 'opener';
exports.OPENER = OPENER;
const CLOSER = 'closer';
exports.CLOSER = CLOSER;
const SAMELESS = 'sameless';
exports.SAMELESS = SAMELESS;

const first = (tag, v) => tag.length >= v.length && tag.indexOf(v) === 0;

const last = (tag, v) => tag.length >= v.length && tag.lastIndexOf(v) === tag.length - v.length;

const parseTagOpener = (v, node = []) => {
  const arr = (0, _common().splitSpaces)(v.replace(/(^[\s<>/]+)|[\s<>/]+$/g, ''));
  return [node.tagName, node.attrs] = [arr.shift(), arr.map(v => (0, _common().splitAttr)(v))];
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

function createNodelist(html) {
  const resultDirty = [];
  const data = html.trim().replace(/\r*\n+(\/?>)/, '$1').replace(/(<\/?)\r*\n+/, '$1').replace(/(<!\[CDATA\[|\]\]>|<!--|-->)|(<\/?|--?\s+)|(\/?>)/g, (__, c, a, b) => c ? `\0${c}\0` : (b || '') + '\0' + (a || '')).split(/(\r*\n*\0\r*\n*|\r*\n+)/).map(v => v.replace(/\0/g, '')).filter(v => v.length);
  console.log([...data]);
  let deep = 0;
  let node = [];
  let tag, index, column;

  data: for (let i = 0; i < data.length; i++) {
    tag = data[i].trim();

    if (first(tag, _core().SIGN_LESS) && !first(tag, _core().TAG_OPENER_CDATA) && !first(tag, _core().TAG_OPENER_COMMENT)) {
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

        if (isWhile = matches.length || !last(pusher.trim(), _core().SIGN_MORE)) {
          if (++i >= data.length) throw new Error();
        }
      } while (isWhile);

      data[i] = pusher;
      tag = pusher.trim();
    }

    for (const block of RESERVED_TAGS) {
      if (first(tag, _core().SIGN_LESS + block)) {
        index = _core().SIGN_LESS_SLASH + block + _core().SIGN_MORE;
        resultDirty.push(node = [deep, block, ...whilerForReserveds(data, i, index)]);
        parseTagOpener(node[2], node);
        continue data;
      }
    }

    for (const block of CDATA_AND_COMMENT) {
      index = false;

      if (first(tag, block[1]) || (index = first(tag, _core().SIGN_LESS + block[0]))) {
        index = !index ? block[2] : _core().SIGN_LESS_SLASH + block[0] + _core().SIGN_MORE;
        resultDirty.push(node = [deep, block[0], ...whilerForReserveds(data, i, index)]);
        parseTagOpener(node[2], node);
        continue data;
      }
    }

    if (first(tag, _core().SIGN_LESS) && tag[1].match(/[/!{\w]/)) {
      resultDirty.push(node = [deep, '', data[i]]);
      parseTagOpener(node[2], node);

      if (tag === _core().SIGN_LESS_SLASH_MORE) {
        resultDirty.forEach(v => v[1] === OPENER && (node.tagName = v.tagName));
      } else if (tag[1] === '!') node.tagName = node.tagName.toLowerCase();

      if (tag[1] === _core().SIGN_SLASH) node[1] = CLOSER, deep--;else if (tag[1] === '!' || last(tag, _core().SIGN_SLASH_MORE)) node[1] = SAMELESS;else node[1] = OPENER, deep++, node[0] = deep;
    } else {
      index = resultDirty[resultDirty.length - 1];
      if (index && index[1] === _core().TAGNAME_TEXT) index[3] += data[i];else resultDirty.push(node = [deep, _core().TAGNAME_TEXT, '', data[i], '']);
    }
  }

  return resultDirty;
}