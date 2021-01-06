import PUG_MIXINS from './pug-mixins'

let SUCRASE: any, TYPESCRIPT: any
let PUG: any
let LESS: any, SASS: any, STYLUS: any

function sucrase(content = ''): string {
  const compiler = SUCRASE || (SUCRASE = require('sucrase'))
  content = compiler.transform(content, {
    transforms: ['imports', 'typescript']
  }).code
  // console.log('sucrase', content)
  return content
}

function typescript(content = ''): string {
  const compiler = TYPESCRIPT || (TYPESCRIPT = require('typescript'))
  content = compiler.transpileModule(content, {
    compilerOptions: {
      module: TYPESCRIPT.ModuleKind.ESNext, // CommonJS,
      target: TYPESCRIPT.ScriptTarget.ESNext
    }
  }).outputText
  // console.log('typescript', content)
  return content
}
const ts = typescript

function pug(content = ''): string {
  const compiler = PUG || (PUG = require('pug'))
  content = compiler.render(PUG_MIXINS(content), {
    pretty: true,
    debug: false
  })
  // console.log(['pug', content])
  return content
}
const jade = pug

function less(content = ''): string {
  const compiler = LESS || (LESS = require('less'))
  compiler.render(
    content,
    { sync: true },
    (_: any, res: any) => (content = res.css)
  )
  // console.log('less', content)
  return content
}
function sass(content = ''): string {
  const compiler = SASS || (SASS = require('sass'))
  content = compiler.renderSync({ data: content }).css.toString()
  // console.log('sass', content)
  return content
}
const scss = sass
function stylus(content = ''): string {
  const compiler = STYLUS || (STYLUS = require('stylus'))
  content = compiler(content).render()
  // console.log('stylus', content)
  return content
}
const styl = stylus

export { sucrase, ts, typescript, jade, pug, less, scss, sass, styl, stylus }
