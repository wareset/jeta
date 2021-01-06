import compile from '../index'
import nodeCompile from '../../node-compile'

console.log(compile, nodeCompile)

test('compile/index: template', () => {
  const T1 = [
    `
<script context="module">
let a = 12
</script>

<script>
let b = 42
</script>

<template concise>
div(class={val})
  |asf {ASAAS}
  span text content
  span text content
{"er" ? custom || 45 : 'cvb'}
Cmp
//-0Rt
</template>

<style>
div {
  color: red;

  span {
    color: green;
  }
}
</style>
    `
  ]

  const res = compile(T1[0])
  expect(typeof res).toBe('object')
})

// test('nodeCompile/index: template', () => {
//   const T1 = [
//     `
// <template lang="pug">
// +tag("{Cmp1 || Cmp2}")
//   div1(class="{val}")
//     span2 text content
// </template>
//     `
//   ]

//   const res = nodeCompile(T1[0])
//   expect(res.template).toBe('')
// })
