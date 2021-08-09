import { hasOwnProperty } from '@wareset-utilites/object/hasOwnProperty'

import { __Rease__, __RNode__ } from '..'

import { EH_SERVICE, EH_RNODE } from '..'
import { storeReadonlyfy, rnodeUtilsSetChildrens } from '..'
import { TypeStore, TypeServiceRease, TypeRNode } from '..'

// prettier-ignore
const CHILDLESS_TAGNAMES = {
  ['img']: 1, ['area']: 1, ['base']: 1, ['br']: 1,
  ['col']: 1, ['embed']: 1, ['hr']: 1, ['input']: 1, ['link']: 1,
  ['meta']: 1, ['param']: 1, ['source']: 1, ['track']: 1, ['wbr']: 1
}
export const isChildlessTagName = (tagName: string): boolean =>
  hasOwnProperty(CHILDLESS_TAGNAMES, tagName)

/*
ReaseElement
*/
export type TypeReaseElement = ReaseElement
export class ReaseElement extends __Rease__ {
  _tagName!: string
  $tagName!: TypeStore<string>

  __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode): void {
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    const $tagName = _thisRNode[EH_RNODE.$tagName]
    // console.log($tagName.$)

    let isNU = false
    storeSubscribe(
      // prettier-ignore
      this.$tagName = storeReadonlyfy(
        storeProxy([$tagName], () => (this._tagName = $tagName.get() || 'div'))),
      (_tagName) => {
        if (isNU !== (isNU = !isChildlessTagName(_tagName))) {
          rnodeUtilsSetChildrens(isNU, _thisRNode, storeProxy)
        }
      }
    )
  }
}
