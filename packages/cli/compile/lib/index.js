'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var waresetUtilites = require('wareset-utilites');
var enumChars = require('enum-chars');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var enumChars__default = /*#__PURE__*/_interopDefaultLegacy(enumChars);

const lower = (v) => String(v).toLowerCase();
const isFirstNum = (v) => /^\W*\d/.test(v);
const getAlias = (content = '', salt, slash = true) => {
    if (!salt)
        throw new Error();
    if (content.indexOf(salt) === -1)
        return salt;
    if (slash && salt[salt.length - 1] !== '_')
        salt += '_';
    let rand = '';
    do
        rand = enumChars__default['default'].numbers(rand);
    while (content.indexOf(salt + rand) > -1);
    return salt + rand;
};
const trimQuotes = (v) => {
    v = v.trim();
    if (/^[`'"]/.test(v) && v[0] === v[v.length - 1])
        v = v.slice(1, -1).trim();
    return v;
};
const trimBrackets = (v) => {
    v = trimQuotes(v);
    if (/^[{]/.test(v) && /[}]$/.test(v))
        v = v.slice(1, -1).trim();
    return v;
};
const toKebabCase = (v) => {
    return waresetUtilites.trim(v, '\\W').replace(/([\W])*([^\W]+)/g, (__, _1, b) => {
        let res = b;
        if (isFirstNum(res))
            res = 'Rease' + res;
        else
            res = res[0].toUpperCase() + res.slice(1);
        // if (k) res = '_' + res;
        return res;
    });
};

function __CID__(content = '', cid = '') {
    if (cid) {
        if (cid.indexOf('=') > -1)
            cid = cid.split('=')[1];
        cid = waresetUtilites.trim(cid.replace(/[^\w-]/g, ''), '\\W');
    }
    cid = cid || 'r' + waresetUtilites.hash(String(content || Math.random()));
    if (isFirstNum(cid))
        cid = 'r' + cid;
    return cid;
}
function getCIDArr(content = '', type = null, cid = '') {
    cid = __CID__(content, cid);
    if (type === 'class')
        return ['class', cid];
    else if (type)
        return [`data-${type.replace(/data-/i, '').trim()}`, cid];
    else
        return [cid, true];
}
function getCID(content = '', type = null, cid = '') {
    cid = __CID__(content, cid);
    if (type === 'class')
        cid = '.' + cid;
    else if (type)
        cid = `[data-${type.replace(/data-/i, '').trim()}=${cid}]`;
    else
        cid = `[${cid}]`;
    return cid;
}

exports.getAlias = getAlias;
exports.getCID = getCID;
exports.getCIDArr = getCIDArr;
exports.isFirstNum = isFirstNum;
exports.lower = lower;
exports.toKebabCase = toKebabCase;
exports.trimBrackets = trimBrackets;
exports.trimQuotes = trimQuotes;
