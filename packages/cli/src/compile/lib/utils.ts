import enumChars from 'enum-chars'
import { trim } from 'wareset-utilites'

export const lower = (v: string | any): string => String(v).toLowerCase()
export const isFirstNum = (v: string): boolean => /^\W*\d/.test(v)

export const getAlias = (content = '', salt: string, slash = true): string => {
  if (!salt) throw new Error()
  if (content.indexOf(salt) === -1) return salt
  if (slash && salt[salt.length - 1] !== '_') salt += '_'
  let rand = ''
  do rand = enumChars.numbers(rand)
  while (content.indexOf(salt + rand) > -1)
  return salt + rand
}

export const trimQuotes = (v: string): string => {
  v = v.trim()
  if (/^[`'"]/.test(v) && v[0] === v[v.length - 1]) v = v.slice(1, -1).trim()
  return v
}

export const trimBrackets = (v: string): string => {
  v = trimQuotes(v)
  if (/^[{]/.test(v) && /[}]$/.test(v)) v = v.slice(1, -1).trim()
  return v
}

export const toKebabCase = (v: string): string => {
  return trim(v, '\\W').replace(/([\W])*([^\W]+)/g, (__, _1, b) => {
    let res = b
    if (isFirstNum(res)) res = 'Rease' + res
    else res = res[0].toUpperCase() + res.slice(1)
    // if (k) res = '_' + res;
    return res
  })
}
