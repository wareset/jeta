import compile from '../index'
import nodeCompile from '../../node-compile'

console.log(compile, nodeCompile)

test('compile/index: options.name', () => {
  expect(compile('', { name: '' }).options.name).toBe('AppRease')
})

test('compile/index: options.cid', () => {
  expect(compile('', { name: 'app', cidSalt: 'qwe' }).options.cid).toBe(
    '[rh122gak0]'
  )
  expect(
    compile('', { name: 'app', cidSalt: 'qwe', cidType: '' }).options.cid
  ).toBe('[rh122gak0]')
  expect(
    compile('', { name: 'app', cidSalt: 'qwe', cidType: null }).options.cid
  ).toBe('[rh122gak0]')
  expect(
    compile('', { name: 'app', cidSalt: 'qwe', cidType: 'class' }).options.cid
  ).toBe('.rh122gak0')
  expect(
    compile('', { name: 'app', cidSalt: 'qwe', cidType: 'cid' }).options.cid
  ).toBe('[data-cid=rh122gak0]')
})
