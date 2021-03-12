import { tokenize } from 'rastree/lib'

// eslint-disable-next-line no-redeclare
function parseHTMLX(content: string): string
// eslint-disable-next-line no-redeclare
function parseHTMLX(content: string, isStr: true): string
// eslint-disable-next-line no-redeclare
function parseHTMLX(
  content: string,
  isStr: false
): { deep: number; raw: string }[]
// eslint-disable-next-line no-redeclare
function parseHTMLX(
  content: string,
  isStr: boolean = true
): string | { deep: number; raw: string }[] {
  const tokens = tokenize(content, { fakeQuotes: true })
  const cacheTokens = tokens.map((v) => v.raw)
  const res: any[] = []

  let token: any
  while (tokens.length) {
    token = { ...tokens.pop() }
    if (!token.deep) {
      token.raw = token.raw
        .replace(/(?<![\\])[{}]/g, '')
        .replace(/\\([{}])/g, '$1')
    }
    if (!token.raw) continue

    if (!res.length || !res[0].deep !== !token.deep) res.unshift(token)
    else res[0].raw = token.raw + res[0].raw

    if (token.deep) res[0].raw = res[0].raw.replace(/^\s+|\s+$/g, ' ')
  }

  let issetText
  res.forEach((v, k) => {
    if (!v.deep) {
      if (!k) issetText = true
      res[k].raw = JSON.stringify(res[k].raw)
    } else {
      res[k].raw = res[k].raw.trim()
      if (res.length > 1 && !cacheTokens.some((v) => v === res[k].raw)) {
        res[k].raw = '(' + res[k].raw + ')'
      }
    }
    res[k] = { deep: v.deep, raw: res[k].raw }
  })

  res.toString = (): string => {
    return res.map((v) => v.raw).join(' + ')
  }

  if (res.length !== 1 && !issetText) res.unshift({ deep: 0, raw: '""' })
  return isStr ? res.toString() : res
}

export default parseHTMLX
