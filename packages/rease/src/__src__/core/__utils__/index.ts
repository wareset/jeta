import { isArray } from '@wareset-utilites/is/isArray'
import { timeout } from '@wareset-utilites/timeout'

import { typed, typedOf } from '@wareset-utilites/typed'
import { isStore, TypeStore } from '..'

export { typed, typedOf }

export const isArrayNotStore: {
  (value: TypeStore<any>): false
  (value: any): boolean
} = (value: any): any => isArray(value) && !isStore(value)

export { timeout }

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask
// prettier-ignore
export const resolve: {
  <T>(callback: (...a: any[]) => Promise<T> | T): Promise<T>
  (): undefined
} = (cb?: any): any => Promise.resolve().then(cb).catch((e) => { throw e })

export { getProperty } from './getProperty'

// prettier-ignore
export const operate: {
  <T extends (...a: any) => any>(a: T, ...args: any): ReturnType<T>
} = (a) => a()
