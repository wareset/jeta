import { jsonStringify } from '@wareset-utilites/lang/jsonStringify'
import { isObject } from '@wareset-utilites/is/isObject'
import { isNill } from '@wareset-utilites/is/isNill'
import { trycatch } from '@wareset-utilites/trycatch'

import { __Rease__ } from '..'

import { EH_SERVICE, EH_RNODE } from '..'
import { storeReadonlyfy, getStoreValue } from '..'
import { TypeStore, TypeServiceRease, TypeRNode } from '..'

let undef: undefined
/*
ReaseText
*/
export type TypeReaseText = ReaseText
export class ReaseText extends __Rease__ {
  _wholeText!: string
  $wholeText!: TypeStore<string>

  __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode): void {
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]

    const childs = _thisRNode[EH_RNODE.childs](storeProxy)
    // prettier-ignore
    const $wholeText = storeProxy(childs,
      () => childs.map((v) => isNill(v = getStoreValue(v)) ? '' : isObject(v)
        ? trycatch(() => jsonStringify(v, undef, 2), () => v) : v).join(''))
    // prettier-ignore
    this.$wholeText = storeReadonlyfy(
      storeProxy([$wholeText], () => (this._wholeText = $wholeText.get())))

    // console.log(this._wholeText)
  }
}
