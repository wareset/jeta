import compile from '../index'
import nodeCompile from '../../node-compile'

console.log(compile, nodeCompile)

test('compile/index: script', () => {
  const T1 = [
    `
<script context="module">
import wqe, { asd } from 'qwe'
</script>

<script>
let a = "1";
import {
  qw
} from 'qaz'
const q = "App";
const w = "<div>qwe</div>";
</script>
    `
  ]

  const res = compile(T1[0], {
    name: 'app',
    cidSalt: 'qwe',
    cidType: 'cid'
  })
  expect(res.options).toEqual({
    name: 'App_0',
    cid: '[data-cid=rh122gak0]',
    cidSalt: 'qwe',
    cidType: 'cid',
    __langs__: {},
    minifyCss: true,
    separateCss: false
  })

  expect(res.script).toEqual({
    module: "import {\n  qw\n} from 'qaz'\nimport wqe, { asd } from 'qwe'",
    main: 'let a = "1";\nconst q = "App";\nconst w = "<div>qwe</div>";'
  })
})

test('nodeCompile/index: script', () => {
  const res = nodeCompile(`
<script context="module" lang="ts">
import zxc, { asd } from 'qwe'
let fn = (a: any): any => zxc + asd;
</script>

<script lang="ts">
let a: string = "1";
</script>
  `)

  expect(res.script).toEqual({
    module: "import zxc, { asd } from 'qwe';\nlet fn = (a) => zxc + asd;",
    main: 'let a = "1";'
  })
})
