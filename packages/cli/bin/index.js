'use strict';

var fs = require('fs');
var path = require('path');
var kleur = require('kleur');
var minimist = require('minimist');
var nodeCompile = require('../node-compile');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var kleur__default = /*#__PURE__*/_interopDefaultLegacy(kleur);
var minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);
var nodeCompile__default = /*#__PURE__*/_interopDefaultLegacy(nodeCompile);

console.log('Rease CLI in progress');
const argv = minimist__default['default'](process.argv.slice(2), {
    default: { minify: true },
    string: ['input', 'output'],
    boolean: ['help', 'version', 'silent', 'minify'],
    alias: {
        h: 'help',
        v: 'version',
        i: 'input',
        o: 'output',
        s: 'silent'
    }
});
// console.log(argv)
// console.log(process.argv)
let argvInput = argv.input || argv._[0] || 'app.rease';
let argvOutput = path__default['default'].resolve(argv.output ||
    argv._[1] ||
    (argv._[0] && argvInput !== argv._[0] ? argv._[0] : argvInput + '.js'));
argvInput = path__default['default'].resolve(argvInput);
argvOutput = path__default['default'].resolve(argvOutput);
const minify = argv.minify;
const argvSilent = !!argv.silent;
const verbose = (...a) => {
    if (!argvSilent)
        console.log(...a);
};
(() => {
    if (argv.version || argv.help) {
        console.log(kleur__default['default'].red(`
   _____  ____ ____  ____  ____   __________    _____
  /____/ /___ /___/ /___  /___   /  ____/  /   /   _/
 /    \\ /___ /   / ____/ /___   /  /   /  /    /  /
        ${kleur__default['default'].yellow('     __ _ _ _ _ /_,_')}   /  /___/  /____/  /
        ${kleur__default['default'].yellow('(/(/(_(/ (-_)(-/_ _)')}   \\_____/______/____/
`));
        return;
    }
    if (argvInput === argvOutput ||
        path__default['default'].extname(argvOutput) !== '.js' ||
        (fs__default['default'].existsSync(argvOutput) && fs__default['default'].lstatSync(argvOutput).isDirectory())) {
        argvOutput = path__default['default'].resolve(argvOutput, path__default['default'].basename(argvInput) + '.js');
    }
    verbose('\nInput/Output:');
    verbose(kleur__default['default'].cyan().inverse(' DIR_INPUT: \n    ' + argvInput + ' '));
    verbose(kleur__default['default'].cyan().inverse(' DIR_OUTPUT: \n    ' + argvOutput + ' '));
    if (!fs__default['default'].existsSync(argvInput) || !fs__default['default'].lstatSync(argvInput).isFile()) {
        console.log(kleur__default['default'].bold().bgRed('\n ERROR_NOT_EXISTS_INPUT_FILE: \n    ' + argvInput));
        return;
    }
    const name = path__default['default'].basename(argvInput, '.rease');
    const content = fs__default['default'].readFileSync(argvInput).toString();
    const result = nodeCompile__default['default'](content, { name, minify });
    verbose('\nResult:');
    verbose(result);
    fs__default['default'].writeFileSync(argvOutput, result.final);
})();
