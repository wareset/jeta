'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lib = require('rastree/lib');

// eslint-disable-next-line no-redeclare
function pullImports(content) {
    let i, token, tokenNext, tokenLast, isEndImport;
    const tokens = typeof content === 'string' ? lib.tokenize(content) : content;
    i = -1;
    while (++i < tokens.length) {
        token = tokens[i];
        if (isEndImport) {
            if (!token.raw.trim() || !(isEndImport = !(token.raw === ';'))) {
                (tokenLast = tokens[i - 1]), tokens.splice(i, 1), --i;
                (tokenLast.raw += token.raw), (tokenLast.end = token.end);
                continue;
            }
        }
        isEndImport = false;
        if (token.raw === 'import') {
            do {
                (tokenNext = tokens[i + 1]), tokens.splice(i + 1, 1);
                (token.raw += tokenNext.raw), (token.end = tokenNext.end);
            } while (!/['"`]/.test(tokenNext.raw) && tokens.length);
            isEndImport = true;
        }
    }
    if (tokens === content)
        return tokens;
    const imports = [];
    const scripts = [];
    i = -1;
    while (++i < tokens.length) {
        (/^import/.test(tokens[i].raw) ? imports : scripts).push(tokens[i]);
    }
    return {
        imports: imports.map((v) => v.raw.trim()).join('\n') + '\n',
        scripts: scripts.map((v) => v.raw).join('')
    };
}

exports.default = pullImports;
