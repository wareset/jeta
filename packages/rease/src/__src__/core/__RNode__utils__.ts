import { forEachLeft } from '@wareset-utilites/array/forEachLeft'
import { isUndefined } from '@wareset-utilites/is/isUndefined'
import { concat } from '@wareset-utilites/array/concat'
import { last } from '@wareset-utilites/array/last'

import { __RNode__ } from '.'
import { EH_RNODE, EH_PROPS } from '.'
import { isStore } from '.'
import {
  TypeRease,
  TypeRNode,
  TypeStoreFunction,
  TypeStoreProxyFunction,
  TypeProps,
  TypeStore
} from '.'

// export const getChildsTokensList = (
//   storeProxy: TypeStoreProxyFunction,
//   childsFn: (storeProxy: TypeStoreProxyFunction, ...a: any[]) => any[]
// ): any[] => childsFn(storeProxy)

export const rnodeUtilsSetChildrens = (
  _isNU: any,
  _thisRNode: TypeRNode,
  _storeProxy: TypeStoreProxyFunction
): void => {
  // _thisRNode[EH_RNODE.childIdZeroize]()
  // prettier-ignore
  _thisRNode[EH_RNODE.$children].set(_isNU
    ? _thisRNode[EH_RNODE.childs](_storeProxy)
      .map((v: [any]) => new __RNode__(...v, _thisRNode))
    : [])
}

export const rnodeUtilsGetSystemProperty = <T>(
  _store: TypeStoreFunction,
  _props: TypeProps,
  _name: string,
  _default?: any
): TypeStore<T> => {
  const rules = concat(...(_props[EH_PROPS.system][_name] || []))
  const $rule = _store(last(rules), rules)
  return isUndefined(_default)
    ? $rule
    : _store($rule, (a) => (isUndefined((a = $rule.get())) ? _default : a))
}

export const rnodeUtilsGetFlagProperty = (
  _props: TypeProps,
  _name: string
): boolean => !!_props[EH_PROPS.flags][_name]

export const rnodeUtilsSetRef = (
  _thisRease: TypeRease,
  _props: TypeProps
): (() => void) => {
  const stores: TypeStore<any>[] = []
  const refs = _props[EH_PROPS.system][':ref']
  if (refs) {
    forEachLeft(refs, (ref) => {
      if (isStore(ref[0])) ref[0].set(_thisRease), stores.push(ref[0])
    })
  }

  return (): void => {
    forEachLeft(stores, (v) => {
      v.set(null)
    })
  }
}
