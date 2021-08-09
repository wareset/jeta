import { __Rease__, __RNode__ } from '..'

import { EH_RNODE, EH_PROPS } from '..'
import { TypeServiceRease, TypeRNode, TypeProps } from '..'

/*
ReaseRoot
*/
export type TypeReaseRoot = ReaseRoot
export class ReaseRoot extends __Rease__ {
  __(
    _serviceRease: TypeServiceRease,
    _thisRNode: TypeRNode,
    _props: TypeProps
  ): void {
    const tagName = _props[EH_PROPS.system][':tag'][0][0]
    const props = _props[EH_PROPS.system][':props'][0][0]
    const node = _props[EH_PROPS.system][':target'][0][0]
    // const cb = _props[EH_PROPS.system][':renderer'][0][0]

    if (node) _thisRNode[EH_RNODE.$node].set(node)

    _thisRNode[EH_RNODE.$children].set([
      new __RNode__(tagName, props, [], _thisRNode, _thisRNode)
    ])
    // console.log(33, tagName)
  }
}
