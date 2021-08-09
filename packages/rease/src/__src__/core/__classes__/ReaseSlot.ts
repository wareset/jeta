import { forEachLeft } from '@wareset-utilites/array/forEachLeft'
import { values } from '@wareset-utilites/object/values'
import { is } from '@wareset-utilites/object/is'

import { __Rease__, __RNode__ } from '..'

import { EH_SERVICE, EH_RNODE } from '..'
import {
  storeReadonlyfy,
  rnodeUtilsSetChildrens,
  rnodeUtilsGetSystemProperty
} from '..'
import { TypeStore, TypeServiceRease, TypeRNode, TypeProps } from '..'

/*
ReaseSlot
*/
export type TypeReaseSlot = ReaseSlot
export class ReaseSlot extends __Rease__ {
  _name!: any
  $name!: TypeStore<any>

  __(
    _serviceRease: TypeServiceRease,
    _thisRNode: TypeRNode,
    _props: TypeProps
  ): void {
    const store = _serviceRease[EH_SERVICE.store]
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeProxyRNode = _thisRNode[EH_RNODE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    const $name = rnodeUtilsGetSystemProperty(store, _props, ':name', 'default')
    // prettier-ignore
    this.$name = storeReadonlyfy(
      storeProxy([$name], () => (this._name = $name.get())))

    // const defaultNodes = _thisRNode[EH_RNODE.childs](storeProxy)
    // prettier-ignore
    const outsideNodes = _thisRNode[EH_RNODE.home]
      ? _thisRNode[EH_RNODE.home]![EH_RNODE.childrenForSlots] ||
      (_thisRNode[EH_RNODE.home]![EH_RNODE.childrenForSlots] =
        _thisRNode[EH_RNODE.home]![EH_RNODE.childs](storeProxyRNode))
      : []

    const _children: { [key: string]: any } = {}
    const $children = store()

    forEachLeft(outsideNodes, (_node: [any, any], _key) => {
      // prettier-ignore
      const $slot =
        rnodeUtilsGetSystemProperty(store, _node[1], ':slot', 'default')

      let isEqual = false
      storeSubscribe([$name, $slot], (_name, _slot) => {
        if (isEqual !== (isEqual = is(_name, _slot))) {
          // console.log('rease-slot', _name, _slot)
          if (isEqual) _children[_key] = new __RNode__(..._node, _thisRNode)
          else delete _children[_key]

          $children.update()
        }
      })
    })

    storeSubscribe($children, () => {
      const outside = values(_children)
      if (outside[0]) {
        _thisRNode[EH_RNODE.$children].set(outside)
      } else {
        rnodeUtilsSetChildrens(true, _thisRNode, storeProxy)
      }
    })
  }
}
