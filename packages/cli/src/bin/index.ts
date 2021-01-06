import fs from 'fs'
import path from 'path'
import kleur from 'kleur'
import minimist from 'minimist'
import nodeCompile from '../node-compile'

console.log('Rease CLI in progress')

const argv = minimist(process.argv.slice(2), {
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
})

// console.log(argv)
// console.log(process.argv)

let argvInput = argv.input || argv._[0] || 'app.rease'
let argvOutput = path.resolve(
  argv.output ||
    argv._[1] ||
    (argv._[0] && argvInput !== argv._[0] ? argv._[0] : argvInput + '.js')
)

argvInput = path.resolve(argvInput)
argvOutput = path.resolve(argvOutput)

const minify = argv.minify

const argvSilent = !!argv.silent
const verbose = (...a: any[]): void => {
  if (!argvSilent) console.log(...a)
}

;((): void => {
  if (argv.version || argv.help) {
    console.log(
      kleur.red(`
   _____  ____ ____  ____  ____   __________    _____
  /____/ /___ /___/ /___  /___   /  ____/  /   /   _/
 /    \\ /___ /   / ____/ /___   /  /   /  /    /  /
        ${kleur.yellow('     __ _ _ _ _ /_,_')}   /  /___/  /____/  /
        ${kleur.yellow('(/(/(_(/ (-_)(-/_ _)')}   \\_____/______/____/
`)
    )

    return
  }

  if (
    argvInput === argvOutput ||
    path.extname(argvOutput) !== '.js' ||
    (fs.existsSync(argvOutput) && fs.lstatSync(argvOutput).isDirectory())
  ) {
    argvOutput = path.resolve(argvOutput, path.basename(argvInput) + '.js')
  }

  verbose('\nInput/Output:')
  verbose(kleur.cyan().inverse(' DIR_INPUT: \n    ' + argvInput + ' '))
  verbose(kleur.cyan().inverse(' DIR_OUTPUT: \n    ' + argvOutput + ' '))

  if (!fs.existsSync(argvInput) || !fs.lstatSync(argvInput).isFile()) {
    console.log(
      kleur.bold().bgRed('\n ERROR_NOT_EXISTS_INPUT_FILE: \n    ' + argvInput)
    )
    return
  }

  const name = path.basename(argvInput, '.rease')
  const content = fs.readFileSync(argvInput).toString()
  const result = nodeCompile(content, { name, minify })

  verbose('\nResult:')
  verbose(result)

  fs.writeFileSync(argvOutput, result.final)
})()
