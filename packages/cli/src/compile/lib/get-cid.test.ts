// const getCID = require('./get-cid').default;
import getCID from './get-cid'

test('compile/lib/get-cid', () => {
  expect(getCID('1')).toBe('[rh84g11gf]')
  expect(getCID('1', null)).toBe('[rh84g11gf]')
  expect(getCID('1', null, ' qwe')).toBe('[qwe]')

  expect(getCID('1', 'class')).toBe('.rh84g11gf')
  expect(getCID('1', 'class', '[.Qwe]')).toBe('.Qwe')
  expect(getCID('1', 'class', '[data-asd=Qwe]')).toBe('.Qwe')

  expect(getCID('1', 'CID')).toBe('[data-CID=rh84g11gf]')
  expect(getCID('1', 'DATA-CID')).toBe('[data-CID=rh84g11gf]')
})
