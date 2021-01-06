import rastree from 'rastree'
import { regexp, escape } from 'rastree/lib'

import { lower, toKebabCase, getCID, getCIDArr, getAlias } from './lib'
import parseHTMLX from './lib/parse-htmlx'
import pullImports from './lib/pull-imports'

type IAttr = [string, any]

interface INode {
  type: string
  attributes: IAttr[]
  children: INode[]
  data: string | any[]
  indent: Function
  tagName: string
  isCustomTag: boolean
  typeDirty: string
  index: number
}

interface INodeArr extends Array<INode> {
  normalize(): this
  children: INode[]
}

interface ITheme {
  style: INode[]
  script: INode[]
  template: INode[]
}

export interface IOptionsStart {
  name: string
  cid?: string
  cidSalt?: string
  cidType?: string | null
  __langs__?: object
  minify?: boolean
  separateCss?: boolean
}

export interface IOptions extends IOptionsStart {
  name: string
  cid: string
  cidSalt: string
  cidType: string | null
  __langs__: any
  minify: boolean
  separateCss: boolean
}

export const OPTIONS: IOptions = {
  name: 'app.rease',
  cid: '',
  cidSalt: '',
  cidType: '',
  __langs__: {},
  minify: true,
  separateCss: false
}

export interface IResult {
  content: string
  temp: any
  options: IOptions
  style: { css: string; code: string }
  script: { server: string; client: string; module: string; main: string }
  template: { htmlx: string[]; code: string }
  final: string
}

// const __CACHE = {
//   CID__: '\0CID\0'
// }

const moop = (v: any): any => v
// const strigly = JSON.stringify

const prebuildStyle = (node: INode, result: IResult): void => {
  let lang: string = ''
  let isConcise = false
  let global = false

  let minify = result.options.minify
  node.attributes.forEach(([k, v]) => {
    k = lower(k).trim()
    if (k === 'lang') lang = lower(v).trim()
    else if (k === 'concise') isConcise = !!v
    else if (k === 'no-concise') isConcise = !v
    else if (k === 'scoped' || k === 'no-global') global = !v
    else if (k === 'global' || k === 'no-scoped') global = !!v
    else if (k === 'minify') minify = !!v
  })

  let parseLang = moop
  if (lang) (parseLang = result.options.__langs__[lang]), (isConcise = false)
  if (!parseLang) throw new Error('lang ' + lang + 'not support')
  const css = isConcise
    ? (v: string): INode[] => rastree.css.concise(v)
    : (v: string): INode[] => rastree.css(parseLang(v))

  const styles: any[] = []
  node.children.forEach((v) => {
    if (typeof v.data === 'string') styles.push(css(v.data))
  })

  // prettier-ignore
  result.style.css = [result.style.css, ...styles.map((v) =>
    v.toString({ global, scoper: result.options.cid, minify }).trim())]
    .join(minify ? '\n' : '\n\n').trim()

  if (result.style.css) {
    const regCid = regexp(escape(result.options.cid), 'g')
    const scoper = getAlias(result.style.css, 'S', false)
    const regScoper = regexp(escape(scoper), 'g')

    result.style.code =
      // '\n\t\t\t' +
      JSON.stringify(result.style.css.replace(regCid, scoper)) +
      `.replace(${regScoper}, ${result.temp.self}.cid(this.cid))`
  }
}

const prebuildScript = (node: INode, result: IResult): void => {
  let lang: string = ''
  let isModule = false
  let isServer = false
  let isClient = false

  node.attributes.forEach(([k, v]) => {
    k = lower(k).trim()
    if (k === 'lang') lang = lang = lower(v).trim()
    else if (k === 'client' || k === 'browser') isClient = !!v
    else if (k === 'server') isServer = !!v
    else if (k === 'module') isModule = !!v
    else if (k === 'context') {
      v = lower(v).trim()
      if (/^(client|browser)$/.test(v)) isClient = true
      else if (/^(server)$/.test(v)) isServer = true
      else if (/^(module)$/.test(v)) isModule = true
    }
  })

  let parseLang = moop
  if (lang) parseLang = result.options.__langs__[lang]
  if (!parseLang) throw new Error('lang ' + lang + 'not support')

  node.children.forEach((v) => {
    if (typeof v.data !== 'string') return
    const content: string = parseLang(v.data).trim()
    if (isModule) {
      result.script.module = result.script.module.trim() + '\n' + content
    } else if (isServer) {
      result.script.server = result.script.server.trim() + '\n' + content
    } else if (isClient) {
      result.script.client = result.script.client.trim() + '\n' + content
    } else {
      const { imports, scripts } = pullImports(content)
      result.script.module = imports.trim() + '\n' + result.script.module.trim()
      result.script.main = result.script.main.trim() + '\n' + scripts.trim()
    }
  })

  result.script.module = result.script.module.trim()
  result.script.main = result.script.main.trim()
}

const normalizeAttr = (raw: any, result: IResult, minify: boolean): any => {
  const resArr =
    typeof raw === 'string' ? parseHTMLX(raw, false) : [{ deep: 0, raw }]

  const __ = result.temp.__
  if (
    resArr.length === 1 &&
    (!resArr[0].deep ||
      resArr[0].raw === '' + +resArr[0].raw ||
      !/[^$\w]/.test(resArr[0].raw))
  ) {
    if (!minify) return resArr[0].raw
    if (!result.temp.attributes[resArr[0].raw]) {
      result.temp.attributes[resArr[0].raw] = `${__}${resArr[0].raw}${__}`
    }
    return result.temp.attributes[resArr[0].raw]
  }

  let res = resArr.toString()
  if (/^\.\.\./.test(res)) {
    res = '({ ' + res + ' })'
    if (!minify) res = `${result.temp.self}.spread${res}`
    else {
      if (!result.temp.spread) result.temp.spread = `${__}spread${__}`
      res = `${result.temp.spread}${res}`
    }
  }

  if (!minify) return `${result.temp.self}.store(() => ${res})`
  if (!result.temp.store) result.temp.store = `${__}store${__}`
  return `${result.temp.store}(() => ${res})`
}

const parseAttr = (attr: IAttr, result: IResult, minify: boolean): string => {
  const na = normalizeAttr
  let [key, value] = attr
  if (key === value) value = true
  return `[${na(key, result, minify)}, ${na(value, result, minify)}]`
}

const getTagName = (node: INode, result: IResult, minify: boolean): string => {
  // if (!node.tagName) return parseHTMLX(node.type) as string
  let res = node.tagName || node.type
  if (node.isCustomTag && res[0] !== '{') res = '{' + res + '}'
  return normalizeAttr(res, result, minify)
  // const resArr = parseHTMLX(res, false)
  // if (resArr.length === 1 && !resArr[0].deep) {
  //   return normalizeAttr(res, result, minify)
  // }

  // if (!minify) return `${result.temp.self}.store(() => ${resArr})`
  // const __ = result.temp.__
  // if (!result.temp.store) result.temp.store = `${__}store${__}`
  // return `${result.temp.store}(() => ${resArr})`
}

const generateTemplate = (
  node: INode,
  result: IResult,
  minify: boolean
): string => {
  let res = `\n\t\t\t${node.indent('\t')}`
  res = `${res}/* ${node.index}: ${JSON.stringify(node.data)} */${res}`

  const __ = result.temp.__
  const attributes = node.attributes || []

  // if (node.typeDirty === 'text') {
  //   attributes.push(['re:' + node.type, node.data || '\n'])
  // }

  if (node.typeDirty === 'text') {
    const type = node.type
    if (type !== 'text' && type !== 'comment' && type !== 'cdata') {
      throw new Error()
    }
    const data = normalizeAttr(node.data || '\n', result, minify)

    if (!minify) return `${res}${result.temp.self}.${type}(${data})`
    if (!result.temp[type]) result.temp[type] = `${__}${node.type}${__}`
    return `${res}${result.temp[type]}(${data})`
  }

  const tagName = getTagName(node, result, minify)

  if (!minify) res += `${result.temp.self}.tag(${tagName}`
  else {
    if (!result.temp.tag) result.temp.tag = `${__}tag${__}`
    res += `${result.temp.tag}(${tagName}`
  }

  res += ', ['
  if (attributes.length) {
    res += attributes
      .map(([k, v]) => parseAttr([k, v], result, minify))
      .join(', ')
  }
  res += ']'

  // if (node.typeDirty === 'text') {
  //   res += '(' + normalizeAttr(node.data || '\n', result, minify) + ')'
  // }

  // prettier-ignore
  const child = node.children
    .map((v) => generateTemplate(v, result, minify)).join(',\n')
  if (child) res += ', ' + child

  res += ')'
  return res
}

const pregenerateTemplate = (
  nodes: INodeArr,
  result: IResult,
  minify: boolean
): string => {
  const res: string[] = []
  nodes.normalize()
  nodes.children.forEach((v) => res.push(generateTemplate(v, result, minify)))
  return res.filter((v) => v.trim().length).join(',\n')
}

const prebuildTemplate = (node: INode, result: IResult): void => {
  let lang: string = ''
  let isConcise = false

  let minify = result.options.minify
  node.attributes.forEach(([k, v]) => {
    k = lower(k).trim()
    if (k === 'lang') lang = v
    else if (k === 'concise') isConcise = !!v
    else if (k === 'no-concise') isConcise = !v
    else if (k === 'minify') minify = !!v
  })

  let parseLang = moop
  if (lang) (parseLang = result.options.__langs__[lang]), (isConcise = false)
  if (!parseLang) throw new Error('lang ' + lang + 'not support')
  const html = isConcise
    ? (v: string): INode[] => rastree.html.concise(v)
    : (v: string): INode[] => rastree.html(parseLang(v))

  const templates: any[] = []
  node.children.forEach((v) => {
    if (typeof v.data === 'string')
      templates.push((html(v.data) as INodeArr).normalize())
  })

  result.template.htmlx = templates.map((v) => v.toString().trim())
  result.template.code +=
    (result.template.code ? ',\n' : '') +
    templates
      .map((v) => pregenerateTemplate(v, result, minify))
      .filter((v) => v.trim().length)
      .join(',\n\n')
}

const createFinal = (result: IResult): void => {
  const alias = (v: string): string =>
    (result.temp['__' + v] = getAlias(JSON.stringify(result), v, false))

  const __rease__ = alias('RS')
  const __self__ = result.temp.self
  // const __props__ = alias('p')
  // const __args__ = alias('a')
  const __cache__ = alias('tp')
  const __helpers__ = alias('sf')

  const cache: string[] = []
  let template = result.template.code
  Object.keys(result.temp.attributes).forEach((origin, key) => {
    cache.push('\n\t' + origin)
    // prettier-ignore
    template = template.replace(
      regexp(escape(result.temp.attributes[origin]), 'g'),
      `${__cache__}[${key}]`)
  })

  let key = -1
  const helpers: string[] = []
  // if (result.temp.tag) {
  //   helpers.push('this.tag')
  //   // prettier-ignore
  //   template = template.replace(
  //     regexp(escape(result.temp.tag), 'g'), `${__helpers__}[${++k}]`)
  // }

  // if (result.temp.store) {
  //   helpers.push('(a) => this.store().run(a)')
  //   // prettier-ignore
  //   template = template.replace(
  //     regexp(escape(result.temp.store), 'g'), `${__helpers__}[${++k}]`)
  // }

  ;['tag', 'store', 'text', 'cdata', 'comment', 'spread'].forEach((v) => {
    if (!result.temp[v]) return
    helpers.push(`${__self__}.${v}`)
    // prettier-ignore
    template = template.replace(
      regexp(escape(result.temp[v]), 'g'), `${__helpers__}[${++key}]`)
  })

  // \tinit(/* ${__props__}, ...${__args__} */) {
  // \t\t/* super('', ${__props__}, ...${__args__})); */

  // prettier-ignore
  result.final =
    `
import { Rease as ${__rease__} } from 'rease';\n${
  result.script.module ? `\n${result.script.module}\n` : ''
}${
  cache.length ? `\nconst ${__cache__} = [${cache.join(',')}\n];\n` : ''
}
export default class ${result.options.name} extends ${__rease__} {
\tget cid() {
\t\treturn ${JSON.stringify(result.temp.cssid)};
\t}

\tinit(${__self__}) {${
  result.script.main ? `\n${result.script.main}\n` : ''
}${
  helpers.length ? `\n\t\tconst ${__helpers__} = [${helpers.join(', ')}];` : ''
}${
  template ? `\n\t\t${__self__}.template(${template}\n\t\t);\n` : ''
}${
  !result.options.separateCss && result.style.code
    ? `\n\t\t/* ${JSON.stringify(result.style.css)} */`
    + `\n\t\t${__self__}.style(() => ${result.style.code});\n`
    : ''
}\t}
}`.trim() + '\n'
}

export default function compile(
  content = '',
  optionsStart: IOptionsStart = OPTIONS
): IResult {
  const THEME: ITheme = { style: [], script: [], template: [] }
  rastree
    .html(content)
    .children.forEach(
      (v: { type: 'style' | 'script' | 'template' }) =>
        v.type in THEME && THEME[v.type].push(v as INode)
    )

  const options: IOptions = { ...OPTIONS, ...optionsStart }
  options.name = getAlias(content, toKebabCase(options.name || OPTIONS.name))
  options.cid = getCID(
    options.cidSalt || options.name || '',
    options.cidType,
    options.cid
  )

  const res: IResult = {
    content,
    options,
    temp: { attributes: {} },
    style: { css: '', code: '' },
    script: { server: '', client: '', module: '', main: '' },
    template: { htmlx: [], code: '' },
    final: ''
  }

  res.temp.__ = getAlias(JSON.stringify(res), '__', false)
  res.temp.self = getAlias(JSON.stringify(res), 'self', false)
  res.temp.cssid = getCIDArr('', options.cidType, options.cid)

  THEME.style.forEach((v) => prebuildStyle(v, res))
  THEME.script.forEach((v) => prebuildScript(v, res))
  THEME.template.forEach((v) => prebuildTemplate(v, res))

  createFinal(res)

  // console.log(res.final)

  return res
}
