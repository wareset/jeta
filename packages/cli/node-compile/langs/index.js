'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// const MIXINS = `
// mixin if(condition)
// %_| {#if !{condition}}
// %_block
// %_| {/if}
// mixin else
// %_| {:else}
// %_block
// mixin elseif(condition)
// %_| {:else if !{condition}}
// %_block
// mixin key(expression)
// %_| {#key !{expression}}
// %_block
// %_| {/key}
// mixin each(loop)
// %_| {#each !{loop}}
// %_block
// %_| {/each}
// mixin await(promise)
// %_| {#await !{promise}}
// %_block
// %_| {/await}
// mixin then(answer)
// %_| {:then !{answer}}
// %_block
// mixin catch(error)
// %_| {:catch !{error}}
// %_block
// mixin html(expression)
// %_| {@html !{expression}}
// mixin debug(variables)
// %_| {@debug !{variables}}
// `;
const MIXINS = `



mixin tag(condition)
%_- var attrs = ''
%_- for (attr in attributes) {
%_-   attrs += ' ' + attr + '=' + JSON.stringify(attributes[attr])
%_- }
%_| <!{condition}!{attrs}>
%_block
%_| </>

mixin if(condition)
%_| {#if !{condition}}
%_block
%_| {/if}

mixin else
%_| {:else}
%_block

mixin elseif(condition)
%_| {:else if !{condition}}
%_block

mixin each(loop)
%_| {#each !{loop}}
%_block
%_| {/each}
`;
const getIndent = (str) => {
    return str.match(/^\t/m) ? '\t' : '  ';
};
var PUG_MIXINS = (str) => MIXINS.replace(/%_/g, getIndent(str)) + str;

let SUCRASE, TYPESCRIPT;
let PUG;
let LESS, SASS, STYLUS;
function sucrase(content = '') {
    const compiler = SUCRASE || (SUCRASE = require('sucrase'));
    content = compiler.transform(content, {
        transforms: ['imports', 'typescript']
    }).code;
    // console.log('sucrase', content)
    return content;
}
function typescript(content = '') {
    const compiler = TYPESCRIPT || (TYPESCRIPT = require('typescript'));
    content = compiler.transpileModule(content, {
        compilerOptions: {
            module: TYPESCRIPT.ModuleKind.ESNext,
            target: TYPESCRIPT.ScriptTarget.ESNext
        }
    }).outputText;
    // console.log('typescript', content)
    return content;
}
const ts = typescript;
function pug(content = '') {
    const compiler = PUG || (PUG = require('pug'));
    content = compiler.render(PUG_MIXINS(content), {
        pretty: true,
        debug: false
    });
    // console.log(['pug', content])
    return content;
}
const jade = pug;
function less(content = '') {
    const compiler = LESS || (LESS = require('less'));
    compiler.render(content, { sync: true }, (_, res) => (content = res.css));
    // console.log('less', content)
    return content;
}
function sass(content = '') {
    const compiler = SASS || (SASS = require('sass'));
    content = compiler.renderSync({ data: content }).css.toString();
    // console.log('sass', content)
    return content;
}
const scss = sass;
function stylus(content = '') {
    const compiler = STYLUS || (STYLUS = require('stylus'));
    content = compiler(content).render();
    // console.log('stylus', content)
    return content;
}
const styl = stylus;

exports.jade = jade;
exports.less = less;
exports.pug = pug;
exports.sass = sass;
exports.scss = scss;
exports.styl = styl;
exports.stylus = stylus;
exports.sucrase = sucrase;
exports.ts = ts;
exports.typescript = typescript;
