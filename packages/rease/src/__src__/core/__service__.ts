import { defineProperty } from '@wareset-utilites/object/defineProperty'
import { forEachRight } from '@wareset-utilites/array/forEachRight'
import { spliceWith } from '@wareset-utilites/array/spliceWith'
import { clear } from '@wareset-utilites/array/clear'

import {
  // TypeStore,
  TypeStoreFunction,
  TypeStoreDestroyFunction,
  TypeStoreSubscribeFunction,
  TypeStoreOnSubscribeFunction,
  TypeStoreOnDestroyFunction,
  TypeStoreOnUpdateFunction,
  TypeStoreOnChangeFunction
} from '.'

import {
  isStore,
  storeModule,
  storeModuleDestroy,
  storeModuleSubscribe,
  storeModuleOnSubscribe,
  storeModuleOnDestroy,
  storeModuleOnUpdate,
  storeModuleOnChange
} from '.'

import {
  TypeReaseRefs,
  TypeRease$Refs,
  TypeReaseNode,
  TypeRease$Node,
  TypeReaseRoot,
  TypeRease$Root,
  TypeReaseParent,
  TypeRease$Parent,
  TypeReaseChildren,
  TypeRease$Children
} from '.'
import { TypeRNode } from '.'
import { storeReadonlyfy, storeProxyFactory, TypeStoreProxyFunction } from '.'
import { EH_SERVICE } from '.'
import { operate } from '.'

export declare type TypeServiceHook = () =>
  | void
  | (() => void)
  | Promise<void | (() => void)>

import { TypeRease } from '.'

export declare type TypeServiceRease = Readonly<{
  [EH_SERVICE.self]: TypeRease
  [EH_SERVICE.main]: any

  [EH_SERVICE.rnode]: [TypeRNode | null]

  [EH_SERVICE.readonly]: {
    [EH_SERVICE.refs]: TypeReaseRefs
    [EH_SERVICE.node]: TypeReaseNode | null
    [EH_SERVICE.home]: TypeReaseRoot | null
    [EH_SERVICE.parent]: TypeReaseParent | null
    [EH_SERVICE.children]: TypeReaseChildren
  }

  [EH_SERVICE.$refs]: TypeRease$Refs
  [EH_SERVICE.$node]: TypeRease$Node
  [EH_SERVICE.$home]: TypeRease$Root
  [EH_SERVICE.$parent]: TypeRease$Parent
  [EH_SERVICE.$children]: TypeRease$Children

  [EH_SERVICE.store]: TypeStoreFunction
  [EH_SERVICE.storeProxy]: TypeStoreProxyFunction
  [EH_SERVICE.storeDestroy]: TypeStoreDestroyFunction
  [EH_SERVICE.storeSubscribe]: TypeStoreSubscribeFunction

  [EH_SERVICE.storeOnSubscribe]: TypeStoreOnSubscribeFunction
  [EH_SERVICE.storeOnDestroy]: TypeStoreOnDestroyFunction
  [EH_SERVICE.storeOnUpdate]: TypeStoreOnUpdateFunction
  [EH_SERVICE.storeOnChange]: TypeStoreOnChangeFunction

  [EH_SERVICE.beforeCreateList]: TypeServiceHook[]
  [EH_SERVICE.onCreateList]: TypeServiceHook[]
  [EH_SERVICE.beforeMountList]: TypeServiceHook[]
  [EH_SERVICE.onMountList]: TypeServiceHook[]
  [EH_SERVICE.beforeDestroyList]: TypeServiceHook[]
  [EH_SERVICE.onDestroyList]: TypeServiceHook[]

  [EH_SERVICE.destroy]: () => void
  [EH_SERVICE.destroyed]: [boolean]
}>

const __null__ = null
const REASE_SERVICE_KEY = {}
export const __: {
  (v: TypeRease): TypeServiceRease
  // (v: TypeRNode): TypeServiceRNode
} = (v: any) => (v as any).__(REASE_SERVICE_KEY) as any

// const __defineServiceAccess__: {
//   (_self: TypeRease, _service: TypeServiceRease): void
//   (_self: TypeRNode, _service: TypeServiceRNode): void
// } = (_self: any, _service: any) => {
//   // prettier-ignore
//   defineProperty(_self, '__', {
//     value: (key: any): any => key === REASE_SERVICE_KEY ? _service : __null__ })
// }

// prettier-ignore
const __storeOn__ = (list: any[], fn: Function) => (...a: any): any =>
  (list.push((a = fn(...a))), (): void => { spliceWith(list, a, 1), a() })

export const createStoresService = (): [
  TypeStoreFunction,
  TypeStoreProxyFunction,
  TypeStoreDestroyFunction,
  TypeStoreSubscribeFunction,
  () => void,
  any[]
] => {
  const stores: ReturnType<TypeStoreFunction>[] = []
  const unlisteners: ReturnType<TypeStoreOnSubscribeFunction>[] = []
  const unsubscribers: ReturnType<TypeStoreSubscribeFunction>[] = []

  // prettier-ignore
  const store: TypeStoreFunction =
      (...a: any) => (stores.unshift((a = (storeModule as any)(...a))), a)
  const storeProxy = storeProxyFactory(store)
  // prettier-ignore
  const storeDestroy: TypeStoreDestroyFunction = (...a: any) => {
    forEachRight(isStore(a[0]) ? [a[0]] : a[0], (v: any) =>
    { spliceWith(stores, v, 1) }), (storeModuleDestroy as any)(...a) }
  const storeSubscribe = __storeOn__(unsubscribers, storeModuleSubscribe)

  const destroy = (): void => {
    forEachRight(unsubscribers, operate), clear(unsubscribers)
    forEachRight(unlisteners, operate), clear(unlisteners)
    storeModuleDestroy(stores), clear(stores)
  }

  return [store, storeProxy, storeDestroy, storeSubscribe, destroy, unlisteners]
}

export const createServiceRease = (_self: TypeRease): void => {
  const [
    store,
    storeProxy,
    storeDestroy,
    storeSubscribe,
    destroy,
    unlisteners
  ] = createStoresService()

  const readonly = {
    [EH_SERVICE.refs]: {},
    [EH_SERVICE.node]: __null__,
    [EH_SERVICE.home]: __null__,
    [EH_SERVICE.parent]: __null__,
    [EH_SERVICE.children]: []
  }

  // prettier-ignore
  const service: TypeServiceRease = {
    [EH_SERVICE.self]: _self,
    [EH_SERVICE.main]: (_self as any).__,

    [EH_SERVICE.rnode]: [__null__],
    [EH_SERVICE.readonly]: readonly,

    [EH_SERVICE.$refs]:
      storeReadonlyfy(storeProxy([], () => readonly[EH_SERVICE.refs])),

    [EH_SERVICE.$node]:
      storeReadonlyfy(storeProxy([], () => readonly[EH_SERVICE.node])),
    [EH_SERVICE.$home]:
      storeReadonlyfy(storeProxy([], () => readonly[EH_SERVICE.home])),
    [EH_SERVICE.$parent]:
      storeReadonlyfy(storeProxy([], () => readonly[EH_SERVICE.parent])),
    [EH_SERVICE.$children]:
      storeReadonlyfy(storeProxy([], () => readonly[EH_SERVICE.children])),

    [EH_SERVICE.store]: store,
    [EH_SERVICE.storeProxy]: storeProxy,
    [EH_SERVICE.storeDestroy]: storeDestroy,
    [EH_SERVICE.storeSubscribe]: storeSubscribe,

    [EH_SERVICE.storeOnSubscribe]: __storeOn__(unlisteners, storeModuleOnSubscribe),
    [EH_SERVICE.storeOnDestroy]: __storeOn__(unlisteners, storeModuleOnDestroy),
    [EH_SERVICE.storeOnUpdate]: __storeOn__(unlisteners, storeModuleOnUpdate),
    [EH_SERVICE.storeOnChange]: __storeOn__(unlisteners, storeModuleOnChange),

    [EH_SERVICE.beforeCreateList]: [],  [EH_SERVICE.onCreateList]: [],
    [EH_SERVICE.beforeMountList]: [],   [EH_SERVICE.onMountList]: [],
    [EH_SERVICE.beforeDestroyList]: [], [EH_SERVICE.onDestroyList]: [],

    [EH_SERVICE.destroy]: destroy,
    [EH_SERVICE.destroyed]: [false]
  }

  // __defineServiceAccess__(_self, service)
  // prettier-ignore
  defineProperty(_self, '__', {
    value: (key: any): any => key === REASE_SERVICE_KEY ? service : __null__ })

  // prettier-ignore
  forEachRight([
    [EH_SERVICE.$refs, '$refs'],
    [EH_SERVICE.$node, '$node'], [EH_SERVICE.$parent, '$parent'],
    [EH_SERVICE.$home, '$home'], [EH_SERVICE.$children, '$children'] ],
  (v) => { defineProperty(_self, v[1], {
    enumerable: true, value: (service as any)[v[0]] }) })
}

// export declare type TypeServiceRNode = Readonly<{
//   [EH_SERVICE.self]: TypeRNode

//   [EH_SERVICE.store]: TypeStoreFunction
//   [EH_SERVICE.storeProxy]: TypeStoreProxyFunction
//   [EH_SERVICE.storeDestroy]: TypeStoreDestroyFunction
//   [EH_SERVICE.storeSubscribe]: TypeStoreSubscribeFunction

//   [EH_SERVICE.destroy]: () => void
//   [EH_SERVICE.destroyed]: [boolean]
// }>

// export const createServiceRNode = (_self: TypeRNode): void => {
//   const [
//     store,
//     storeProxy,
//     storeDestroy,
//     storeSubscribe,
//     destroy
//   ] = __createStores__()

//   // prettier-ignore
//   const service: TypeServiceRNode = {
//     [EH_SERVICE.self]: _self,

//     [EH_SERVICE.store]: store,
//     [EH_SERVICE.storeProxy]: storeProxy,
//     [EH_SERVICE.storeDestroy]: storeDestroy,
//     [EH_SERVICE.storeSubscribe]: storeSubscribe,

//     [EH_SERVICE.destroy]: destroy,
//     [EH_SERVICE.destroyed]: [false]
//   }

//   __defineServiceAccess__(_self, service)
// }
