import compile from '../index'
import nodeCompile from '../../node-compile'

console.log(compile, nodeCompile)

const dataPrecise = `
div {
  display: block;
  :scoped span {
    display: inline;
    :global i {
      display: none;
    }
  }
}
`

const dataConcise = `
div
  display block
  :scoped span
    display inline
    :global i
      display none
`

const result = {
  css:
    'div[test_scope] { display: block; } ' +
    'div[test_scope] span[test_scope] { display: inline; } ' +
    'div[test_scope] span[test_scope] i { display: none; }',
  code:
    '"divS { display: block; }' +
    ' divS spanS { display: inline; }' +
    ' divS spanS i { display: none; }".replace(/S/g, this.cid)'
}

test('compile/index: style', () => {
  expect(
    compile(
      `
<style>
${dataPrecise}
</style>
  `,
      { name: 'app', cid: 'test_scope' }
    ).style
  ).toEqual(result)
})

test('compile/index: style concise', () => {
  expect(
    compile(
      `
<style concise>
${dataConcise}
</style>
  `,
      { name: 'app', cid: 'test_scope' }
    ).style
  ).toEqual(result)
})

test('nodeCompile/index: style less', () => {
  expect(
    nodeCompile(
      `
<style lang="less">
${dataPrecise}
</style>
  `,
      { name: 'app', cid: 'test_scope' }
    ).style
  ).toEqual(result)
})

test('nodeCompile/index: style scss', () => {
  expect(
    nodeCompile(
      `
<style lang="scss">
${dataPrecise}
</style>
  `,
      { name: 'app', cid: 'test_scope' }
    ).style
  ).toEqual(result)
})

test('nodeCompile/index: style stylus', () => {
  expect(
    nodeCompile(
      `
<style lang="stylus">
${dataConcise}
</style>
  `,
      { name: 'app', cid: 'test_scope' }
    ).style
  ).toEqual(result)
})
