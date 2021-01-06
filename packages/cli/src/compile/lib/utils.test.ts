// const getCID = require('./get-cid').default;
import {
  lower,
  isFirstNum,
  getAlias,
  toKebabCase,
  trimQuotes,
  trimBrackets
} from './utils'

test('compile/lib/utils: lower', () => {
  expect(lower('QWE')).toBe('qwe')
})

test('compile/lib/utils: isFirstNum', () => {
  expect(isFirstNum('0qwe')).toBe(true)
  expect(isFirstNum('qwe')).toBe(false)
})

test('compile/lib/utils: getAlias', () => {
  expect(getAlias('qwe', 'r')).toBe('r')
  expect(getAlias('rqwe', 'r')).toBe('r_0')
  expect(getAlias('rqwe', 'r', false)).toBe('r0')
  expect(getAlias('rqwe', 's', false)).toBe('s')
})

test('compile/lib/utils: toKebabCase', () => {
  expect(toKebabCase('0 app -- test--')).toBe('R0AppTest')
  expect(toKebabCase('app --_test')).toBe('App_test')
})

test('compile/lib/utils: trimQuotes', () => {
  expect(trimQuotes('" qwe "')).toBe('qwe')
})

test('compile/lib/utils: trimBrackets', () => {
  expect(trimBrackets('" qwe "')).toBe('qwe')
  expect(trimBrackets('"{ qwe} "')).toBe('qwe')
})
