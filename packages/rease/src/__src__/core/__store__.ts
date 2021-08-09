import { defineProperty } from '@wareset-utilites/object/defineProperty'
import { isNill } from '@wareset-utilites/is/isNill'

import {
  TypeStore,
  TypeStoreClass,
  TypeStoreFunction,
  TypeStoreDestroyFunction,
  TypeStoreSubscribeFunction,
  TypeStoreOnSubscribeFunction,
  TypeStoreOnDestroyFunction,
  TypeStoreOnUpdateFunction,
  TypeStoreOnChangeFunction
} from '@wareset/store'

export {
  TypeStore,
  TypeStoreClass,
  TypeStoreFunction,
  TypeStoreDestroyFunction,
  TypeStoreSubscribeFunction,
  TypeStoreOnSubscribeFunction,
  TypeStoreOnDestroyFunction,
  TypeStoreOnUpdateFunction,
  TypeStoreOnChangeFunction
}

import {
  Store,
  isStore,
  store as storeModule,
  storeDestroy as storeModuleDestroy,
  storeSubscribe as storeModuleSubscribe,
  storeOnSubscribe as storeModuleOnSubscribe,
  storeOnDestroy as storeModuleOnDestroy,
  storeOnUpdate as storeModuleOnUpdate,
  storeOnChange as storeModuleOnChange
} from '@wareset/store'

export { Store, isStore, storeModule, storeModuleDestroy, storeModuleSubscribe }

export {
  storeModuleOnSubscribe,
  storeModuleOnDestroy,
  storeModuleOnUpdate,
  storeModuleOnChange
}

import { __, EH_SERVICE, TypeRease } from '.'

// prettier-ignore
export const storeReadonlyfy = <V, T extends TypeStore<V>>(store: T): T =>
  (defineProperty(store, 'readonly', { value: true }), store)

// prettier-ignore
export const storeProxyFactory = (store: TypeStoreFunction) =>
  (...a: any[]): TypeStore<any> => store(a[-1], ...a)
// prettier-ignore
export declare type TypeStoreProxyFunction = ReturnType<typeof storeProxyFactory>
export const storeModuleProxy = storeProxyFactory(storeModule)

const storeFactory = (type: EH_SERVICE, fn: Function) => (
  rease?: TypeRease | null
): any => (isNill(rease) ? fn : (__(rease!) as any)[type])

// prettier-ignore
export const store: (rease?: TypeRease | null) => TypeStoreFunction =
  storeFactory(EH_SERVICE.store, storeModule)
// prettier-ignore
export const storeProxy: (rease?: TypeRease | null) => TypeStoreProxyFunction =
  storeFactory(EH_SERVICE.storeProxy, storeModuleProxy)
// prettier-ignore
export const storeDestroy: (rease?: TypeRease | null) => TypeStoreDestroyFunction =
  storeFactory(EH_SERVICE.storeDestroy, storeModuleDestroy)
// prettier-ignore
export const storeSubscribe: (rease?: TypeRease | null) => TypeStoreSubscribeFunction =
  storeFactory(EH_SERVICE.storeSubscribe, storeModuleSubscribe)
// prettier-ignore
export const storeOnSubscribe: (rease?: TypeRease | null) => TypeStoreOnSubscribeFunction =
  storeFactory(EH_SERVICE.storeOnSubscribe, storeModuleOnSubscribe)
// prettier-ignore
export const storeOnDestroy: (rease?: TypeRease | null) => TypeStoreOnDestroyFunction =
  storeFactory(EH_SERVICE.storeOnDestroy, storeModuleOnDestroy)
// prettier-ignore
export const storeOnUpdate: (rease?: TypeRease | null) => TypeStoreOnUpdateFunction =
  storeFactory(EH_SERVICE.storeOnUpdate, storeModuleOnUpdate)
// prettier-ignore
export const storeOnChange: (rease?: TypeRease | null) => TypeStoreOnChangeFunction =
  storeFactory(EH_SERVICE.storeOnChange, storeModuleOnChange)

/* utils */
export const getStoreValue = <T>(value: TypeStore<T> | T): T =>
  (isStore(value) ? value.get() : value) as T

// prettier-ignore
export const storefy = (rease?: TypeRease | null) =>
  <T>(value: TypeStore<T> | T, instance?: boolean): TypeStore<T> =>
    (instance || !isStore(value) ? store(rease)(value) : value) as TypeStore<T>
