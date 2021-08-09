import { someRight } from '@wareset-utilites/array/someRight'
import { someLeft } from '@wareset-utilites/array/someLeft'

import { ReaseRule, __RNode__ } from '..'

import { EH_SERVICE, EH_RNODE } from '..'
import {
  storeReadonlyfy,
  rnodeUtilsSetChildrens,
  rnodeUtilsGetSystemProperty
} from '..'
import { TypeStoreProxyFunction, TypeStoreSubscribeFunction } from '..'
import { TypeStore, TypeServiceRease, TypeRNode, TypeProps } from '..'

const __subsAndSetChilds__ = (
  _thisRNode: TypeRNode,
  _storeProxy: TypeStoreProxyFunction,
  _storeSubscribe: TypeStoreSubscribeFunction,
  $rule: TypeStore<any>
): void => {
  let isNU = false
  _storeSubscribe($rule, (_rule) => {
    if (isNU !== (isNU = !!_rule))
      rnodeUtilsSetChildrens(isNU, _thisRNode, _storeProxy)
  })
}

const __ruleElse__ = (
  _thisRNode: TypeRNode,
  storeSubscribe: TypeStoreSubscribeFunction,
  _$ruleElse: TypeStore<any>
): void => {
  const childrenParent = _thisRNode[EH_RNODE.parent]
    ? _thisRNode[EH_RNODE.parent]![EH_RNODE.$children].get()
    : []

  const reaseClassesPrev: any[] = []
  someLeft(childrenParent, (_rnode) => {
    const isThisRNode = _rnode === _thisRNode
    if (!isThisRNode) reaseClassesPrev.push(_rnode[EH_RNODE.$reaseClass])
    return isThisRNode
  })

  if (reaseClassesPrev[0]) {
    let destroy: any
    storeSubscribe(reaseClassesPrev, (...a: any[]) => {
      if (destroy) destroy()
      let isRNodeId = -1
      // prettier-ignore
      someRight(a, (_class, _k) => (
        (_class === RuleIf || _class === RuleElseIf) && (isRNodeId = _k),
        _class === RuleElse || isRNodeId > -1
      ))

      let thisRNodeIf: TypeRNode
      if ((thisRNodeIf = childrenParent[isRNodeId])) {
        const $ruleIf = thisRNodeIf[EH_RNODE.$rule]!.get()

        const unsub = storeSubscribe($ruleIf, (_ruleIf) => {
          _$ruleElse.set(_ruleIf === false)
        })

        destroy = (): void => {
          unsub(), (destroy = 0)
        }
      }
    })
  }
}

export class RuleIf extends ReaseRule {
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

    const $ruleIf = rnodeUtilsGetSystemProperty(store, _props, ':rule')

    // prettier-ignore
    this.$rule = _thisRNode[EH_RNODE.$rule] = storeReadonlyfy(
      storeProxy([$ruleIf], () => (this._rule = !!$ruleIf.get())))

    __subsAndSetChilds__(_thisRNode, storeProxy, storeSubscribe, $ruleIf)
  }
}

export class RuleElseIf extends ReaseRule {
  _rule!: boolean | null
  $rule!: TypeStore<boolean | null>

  __(
    _serviceRease: TypeServiceRease,
    _thisRNode: TypeRNode,
    _props: TypeProps
  ): void {
    const store = _serviceRease[EH_SERVICE.store]
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    const $ruleIf = rnodeUtilsGetSystemProperty(store, _props, ':rule')
    const $ruleElse = store(false)
    __ruleElse__(_thisRNode, storeSubscribe, $ruleElse)

    // prettier-ignore
    const $ruleElseIf = this.$rule = _thisRNode[EH_RNODE.$rule] =
      storeReadonlyfy(storeProxy([$ruleElse, $ruleIf],
        (a: any) => (this._rule = (a = $ruleElse.get()) ? !!a : null)))

    __subsAndSetChilds__(_thisRNode, storeProxy, storeSubscribe, $ruleElseIf)
  }
}

export class RuleElse extends ReaseRule {
  __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode): void {
    const store = _serviceRease[EH_SERVICE.store]
    const storeProxy = _serviceRease[EH_SERVICE.storeProxy]
    const storeSubscribe = _serviceRease[EH_SERVICE.storeSubscribe]

    const $ruleElse = store(false)
    __ruleElse__(_thisRNode, storeSubscribe, $ruleElse)

    __subsAndSetChilds__(_thisRNode, storeProxy, storeSubscribe, $ruleElse)
  }
}
