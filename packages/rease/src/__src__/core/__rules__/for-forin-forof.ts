import { forEachLeft } from '@wareset-utilites/array/forEachLeft'
import { findLeft } from '@wareset-utilites/array/findLeft'
// import { isObject } from '@wareset-utilites/is/isObject'
// import { isArray } from '@wareset-utilites/is/isArray'
import { keys } from '@wareset-utilites/object/keys'
// @ts-ignore
// import { isObject } from '@wareset-utilites/is/isObject'

import { ReaseRule, __RNode__ } from '..'

import { EH_SERVICE, EH_RNODE } from '..'
import { rnodeUtilsGetSystemProperty, getStoreValue } from '..'
import { rnodeUtilsGetFlagProperty, resolve, operate } from '..'
import { TypeStoreProxyFunction } from '..'
import { TypeStore, TypeServiceRease, TypeRNode, TypeProps } from '..'

type TypeSub = [any, any[]]

const __getSub__ = (
  _thisRNode: TypeRNode,
  storeProxy: TypeStoreProxyFunction,
  subs: TypeSub[],
  subsOld: TypeSub[],
  children: any,
  _key: any,
  _v: any,
  _k: any,
  _a?: any
): void => {
  const key = _key && _v[_key] ? _v[_key] : '' + _k + _v
  let sub = findLeft(subsOld, (v) => v[0] === key)
  if (!sub) {
    sub = [
      key,
      _thisRNode[EH_RNODE.childs](storeProxy, _v, _k, _a).map(
        (v: [any]) => new __RNode__(...v, _thisRNode)
      )
    ]
  }
  subs.push(sub)
  children.push(...sub[1])
}

export class RuleFor extends ReaseRule {
  _rule!: boolean
  $rule!: TypeStore<boolean>

  __(
    _serviceRease: TypeServiceRease,
    _thisRNode: TypeRNode,
    _props: TypeProps
  ): void {
    const store = _serviceRease[EH_SERVICE.store]
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    type TypeIter = { from?: number; to?: number; step?: number }
    const $rule = rnodeUtilsGetSystemProperty(store, _props, ':rule')
    const $iter = storeProxy(() => {
      const iter = (getStoreValue($rule) || {}) as TypeIter
      const step = +(getStoreValue(iter.step) || 1)
      const from = +(getStoreValue(iter.from) || 0)
      const to = +(getStoreValue(iter.to) || 0)
      return { from, to, step }
    })

    const isAsync = rnodeUtilsGetFlagProperty(_props, '--async')
    const caller: any = isAsync ? resolve : operate

    let subs: TypeSub[] = []
    let olds: TypeSub[]
    // prettier-ignore
    storeSubscribe([$iter], ({ from, to, step }) =>
      caller(() => {
        if (isAsync) { ;({ from, to, step } = getStoreValue($iter)) }
        ;(olds = subs), (subs = [])
        const children: any[] = []
        let _k = 0
        for (let _v = from; _v <= to; _v += step)
          __getSub__(_thisRNode,storeProxy,subs,olds,children,false,_v,_k++)
        _thisRNode[EH_RNODE.$children].set(children)
      })
    )
  }
}

export class RuleForIn extends ReaseRule {
  _rule!: boolean
  $rule!: TypeStore<boolean>

  __(
    _serviceRease: TypeServiceRease,
    _thisRNode: TypeRNode,
    _props: TypeProps
  ): void {
    const store = _serviceRease[EH_SERVICE.store]
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    const $object = rnodeUtilsGetSystemProperty(store, _props, ':rule')
    const $key = rnodeUtilsGetSystemProperty(store, _props, ':key')

    const isAsync = rnodeUtilsGetFlagProperty(_props, '--async')
    const caller: any = isAsync ? resolve : operate

    let subs: TypeSub[] = []
    let olds: TypeSub[]
    // prettier-ignore
    storeSubscribe([$object, $key], (_object: any, _key: any) =>
      caller(() => {
        if (isAsync) { ;(_object = getStoreValue($object)), (_key = getStoreValue($key)) }
        ;(olds = subs), (subs = [])
        const children: any[] = []
        forEachLeft(keys(_object), (_k: any) => {
          __getSub__(_thisRNode,storeProxy,subs,olds,children,_key,_object[_k],_k,_object) })
        _thisRNode[EH_RNODE.$children].set(children)
      })
    )
  }
}

export class RuleForOf extends ReaseRule {
  _rule!: boolean
  $rule!: TypeStore<boolean>

  __(
    _serviceRease: TypeServiceRease,
    _thisRNode: TypeRNode,
    _props: TypeProps
  ): void {
    const store = _serviceRease[EH_SERVICE.store]
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    const $array = rnodeUtilsGetSystemProperty(store, _props, ':rule')
    const $key = rnodeUtilsGetSystemProperty(store, _props, ':key')

    const isAsync = rnodeUtilsGetFlagProperty(_props, '--async')
    const caller: any = isAsync ? resolve : operate

    type TypeSub = [any, any[]]
    let subs: TypeSub[] = []
    let olds: TypeSub[]
    // prettier-ignore
    storeSubscribe([$array, $key], (_array: any, _key: any) =>
      caller(() => {
        if (isAsync) { ;(_array = getStoreValue($array)), (_key = getStoreValue($key)) }
        ;(olds = subs), (subs = [])
        const children: any[] = []
        forEachLeft(_array, (_v: any, _k: number) => {
          __getSub__(_thisRNode,storeProxy,subs,olds,children,_key,_v,_k,_array) })
        _thisRNode[EH_RNODE.$children].set(children)
      })
    )
  }
}
