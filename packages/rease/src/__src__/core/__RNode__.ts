import { getPrototypeOf } from '@wareset-utilites/object/getPrototypeOf'
import { hasOwnProperty } from '@wareset-utilites/object/hasOwnProperty'
// import { defineProperty } from '@wareset-utilites/object/defineProperty'
import { forEachRight } from '@wareset-utilites/array/forEachRight'
import { forEachLeft } from '@wareset-utilites/array/forEachLeft'
import { instanceOf } from '@wareset-utilites/lang/instanceOf'
import { isFunction } from '@wareset-utilites/is/isFunction'
import { isString } from '@wareset-utilites/is/isString'
import { clear } from '@wareset-utilites/array/clear'
// import { isArray } from '@wareset-utilites/is/isArray'
// import { keys } from '@wareset-utilites/object/keys'
import { MAX_SAFE_INTEGER } from '@wareset-utilites/number/MAX_SAFE_INTEGER'

// import { resolve } from '.'

import { EH_SERVICE, EH_RNODE } from '.'
import { __, createStoresService, createProps, isRease } from '.'
import { isArrayNotStore, getStoreValue, operate } from '.'
import { rnodeUtilsSetRef } from '.'
// import {
//   TypeRease$Refs,
//   TypeRease$Node,
//   TypeRease$Root,
//   TypeRease$Parent,
//   TypeRease$Children
// } from '.'
import {
  // TypeStore,
  TypeStoreFunction,
  TypeStoreProxyFunction,
  TypeStoreDestroyFunction,
  TypeStoreSubscribeFunction
} from '.'
import {
  TypeStore,
  TypeRease,
  TypeReaseClass,
  TypeServiceRease,
  // TypeServiceRNode,
  TypeProps
} from '.'

export declare type TypeRNodeTag =
  | string
  | TypeRease
  | TypeReaseClass
  | TypeStore<TypeRNodeTag>

import {
  ReaseComment,
  ReaseComponent,
  ReaseElement,
  ReaseFragment,
  ReaseMixin,
  // ReaseRoot,
  ReaseRule,
  ReaseScript,
  ReaseSlot,
  ReaseStyle,
  ReaseText
} from '.'

import {
  RuleFor,
  RuleForIn,
  RuleForOf,
  RuleIf,
  RuleElseIf,
  RuleElse,
  RuleAwait,
  RuleThen,
  RuleCatch
} from '.'

const reases = {
  ['commentNode']: ReaseComment,
  ['component']: ReaseComponent,
  ['element']: ReaseElement,
  ['fragment']: ReaseFragment,
  ['mixin']: ReaseMixin,
  // ['home']: ReaseRoot,
  ['rule']: ReaseRule,
  ['script']: ReaseScript,
  ['slot']: ReaseSlot,
  ['style']: ReaseStyle,
  ['textNode']: ReaseText,

  ['for']: RuleFor,
  ['for-in']: RuleForIn,
  ['for-of']: RuleForOf,
  ['if']: RuleIf,
  ['else-if']: RuleElseIf,
  ['else']: RuleElse,
  ['await']: RuleAwait,
  ['then']: RuleThen,
  ['catch']: RuleCatch
}

const __noop__ = (): void => {}

const __normalizeChildsDirty__ = (_childs: any): any => {
  let res = (_childs = _childs || [])
  if (!isFunction(_childs)) {
    // prettier-ignore
    const childs = !_childs
      ? [] : !isArrayNotStore(_childs) ? [_childs] : _childs
    res = (): any => childs
  }
  return res
}

const __createComponentTemplate__ = (
  _RNode: TypeRNode,
  _serviceRease: TypeServiceRease,
  _template: any
): [TypeRNodeTag, TypeProps, any, TypeRNode][] => {
  const storeProxyRease = _serviceRease[EH_SERVICE.storeProxy]

  const createTag = (
    _tagOrRease: TypeRNodeTag,
    _props?: any,
    _childs?: any
  ): any => [_tagOrRease, createProps(_props), _childs, _RNode]

  const createText = (
    _childs?: any[],
    _isCmt?: boolean | number
  ): ReturnType<typeof createTag> =>
    createTag(_isCmt ? 'commentNode' : 'textNode', 0, _childs)

  return _template(storeProxyRease, createTag, createText)
}

const __destroyRease__ = (_thisRease: TypeRease, _full?: boolean): void => {
  const _serviceRease = __(_thisRease)
  if (!_serviceRease[EH_SERVICE.destroyed][0]) {
    _serviceRease[EH_SERVICE.destroyed][0] = true

    // prettier-ignore
    forEachLeft(_serviceRease[EH_SERVICE.beforeDestroyList], operate)
    // prettier-ignore
    forEachRight(_serviceRease[EH_SERVICE.readonly][EH_SERVICE.children],
      (rease) => { __destroyRease__(rease, true) })
    // prettier-ignore
    forEachLeft(_serviceRease[EH_SERVICE.onDestroyList], operate)

    _serviceRease[EH_SERVICE.destroy]()

    clear(_serviceRease[EH_SERVICE.beforeCreateList])
    clear(_serviceRease[EH_SERVICE.onCreateList])
    clear(_serviceRease[EH_SERVICE.beforeMountList])
    clear(_serviceRease[EH_SERVICE.onMountList])
    clear(_serviceRease[EH_SERVICE.beforeDestroyList])
    clear(_serviceRease[EH_SERVICE.onDestroyList])

    // console.log('__destroyRease__', _thisRease)

    if (_full) __destroyRNode__(_serviceRease[EH_SERVICE.rnode][0]!)
  }
}

const __destroyRNode__ = (_thisRNode: TypeRNode): void => {
  if (!_thisRNode[EH_RNODE.destroyed][0]) {
    _thisRNode[EH_RNODE.destroyed][0] = true

    __destroyRease__(_thisRNode[EH_RNODE.rease])

    // prettier-ignore
    forEachRight(_thisRNode[EH_RNODE.$children].get(),
      (v) => { __destroyRNode__(v) })

    _thisRNode[EH_RNODE.destroy]()

    // console.log('__destroyRNode__', _thisRNode)
  }
}

export type TypeRNode = __RNode__
export class __RNode__ {
  [EH_RNODE.store]: TypeStoreFunction;
  [EH_RNODE.storeProxy]: TypeStoreProxyFunction;
  [EH_RNODE.storeDestroy]: TypeStoreDestroyFunction;
  [EH_RNODE.storeSubscribe]: TypeStoreSubscribeFunction;
  [EH_RNODE.destroy]: () => void;
  [EH_RNODE.destroyed]: [boolean];

  [EH_RNODE.id]: string; //  = randomTo(1e9, 4e9, false);
  [EH_RNODE.childIdExecute]: () => string;
  [EH_RNODE.childIdZeroize]: () => void;

  [EH_RNODE.$rule]?: TypeStore<any>;
  [EH_RNODE.rease]: TypeRease;
  [EH_RNODE.$reaseClass]: TypeStore<TypeReaseClass>;
  /* ReaseElement */
  [EH_RNODE.$tagName]: TypeStore<string>;
  /* ReaseSlot */
  [EH_RNODE.childrenForSlots]?: any[];

  [EH_RNODE.home]?: TypeRNode;
  [EH_RNODE.parent]?: TypeRNode;
  [EH_RNODE.$children]: TypeStore<TypeRNode[]>;

  [EH_RNODE.props]: TypeProps;
  [EH_RNODE.$node]: TypeStore<Node | undefined>;
  [EH_RNODE.childs]: (storeProxy: TypeStoreProxyFunction, ...a: any) => any[];

  [EH_RNODE.mark]: any

  _children: any
  _tagName: any
  _rease: any
  _class: any

  constructor(
    _tagOrRease: TypeRNodeTag,
    _props?: 0 | null | undefined | any[] | { [key: string]: any },
    _childs?: any,
    _homeRNode?: TypeRNode,
    _parentRNode?: TypeRNode
  ) {
    const thisRNode = this

    const [
      storeRNode,
      storeProxyRNode,
      storeDestroyRNode,
      storeSubscribeRNode,
      destroyRNode
    ] = createStoresService()

    thisRNode[EH_RNODE.store] = storeRNode
    thisRNode[EH_RNODE.storeProxy] = storeProxyRNode
    thisRNode[EH_RNODE.storeDestroy] = storeDestroyRNode
    thisRNode[EH_RNODE.storeSubscribe] = storeSubscribeRNode
    thisRNode[EH_RNODE.destroy] = destroyRNode
    thisRNode[EH_RNODE.destroyed] = [false]

    /* Set 'id' and create functions 'childIdExecute' and 'childIdZeroize' */
    let childId = 0
    let childIdTemp = ''
    thisRNode[EH_RNODE.childIdExecute] = (): string => (
      ++childId < MAX_SAFE_INTEGER || ((childIdTemp += childId), (childId = 1)),
      thisRNode[EH_RNODE.id] + '-' + childIdTemp + childId
    )
    thisRNode[EH_RNODE.childIdZeroize] = (): void => {
      ;(childId = 0), (childIdTemp = '')
    }
    thisRNode[EH_RNODE.id] = _parentRNode
      ? _parentRNode[EH_RNODE.childIdExecute]()
      : '0'
    /* --- */

    thisRNode[EH_RNODE.$node] = storeRNode()
    thisRNode[EH_RNODE.home] = _homeRNode
    thisRNode[EH_RNODE.parent] = _parentRNode
    thisRNode[EH_RNODE.$children] = storeRNode([] as TypeRNode[])
    thisRNode[EH_RNODE.childs] = __normalizeChildsDirty__(_childs)
    const props = (thisRNode[EH_RNODE.props] = createProps(_props))

    // console.log(22, _tagOrRease, _props, thisRNode[EH_RNODE.childs])

    let destroyerRease = __noop__
    let reaseClassOld: TypeReaseClass
    let serviceRease!: TypeServiceRease
    thisRNode[EH_RNODE.$tagName] = storeRNode('')
    thisRNode[EH_RNODE.$reaseClass] = storeRNode()
    storeProxyRNode([_tagOrRease], () => {
      if (!thisRNode[EH_RNODE.destroyed][0]) {
        let tagName = ''
        const tagOrRease = getStoreValue(_tagOrRease)
        // prettier-ignore
        const reaseClass = isString(tagOrRease)
          ? ((tagName = this._tagName = tagOrRease),
          hasOwnProperty(reases, tagOrRease) ? reases[tagOrRease] : ReaseElement)
          : isRease(tagOrRease) ? getPrototypeOf(tagOrRease) : tagOrRease

        if (reaseClassOld === (reaseClassOld = reaseClass)) {
          thisRNode[EH_RNODE.$tagName].set(tagName)
        } else {
          destroyerRease()
          thisRNode[EH_RNODE.$tagName].set(tagName)

          this._class = reaseClass
          // prettier-ignore
          const thisRease: TypeRease =
            (thisRNode[EH_RNODE.rease] = this._rease = new reaseClass())
          serviceRease = __(thisRease)
          serviceRease[EH_SERVICE.rnode][0] = thisRNode

          forEachLeft(
            [
              [_homeRNode, EH_SERVICE.$home, EH_SERVICE.home],
              [_parentRNode, EH_SERVICE.$parent, EH_SERVICE.parent]
            ],
            (v: any[]) => {
              if (v[0])
                (serviceRease as any)[v[1]].set(
                  ((serviceRease as any)[EH_SERVICE.readonly][v[2]] =
                    v[0][EH_RNODE.rease])
                )
            }
          )

          const main = serviceRease[EH_SERVICE.main]
          if (instanceOf(thisRease, ReaseComponent)) {
            // resolve(() => {
            // prettier-ignore
            thisRNode[EH_RNODE.$children].set(
              __createComponentTemplate__(thisRNode, serviceRease, main.call(thisRease))
                .map((v) => new __RNode__(...v, thisRNode)))
            // })
          } else if (main) {
            // resolve(() => {
            main.call(thisRease, serviceRease, thisRNode, props)
            // })
          }

          thisRNode[EH_RNODE.$reaseClass].set(reaseClass)
          rnodeUtilsSetRef(thisRease, props)
          destroyerRease = (): void => {
            ;(destroyerRease = __noop__), __destroyRease__(thisRease)
          }
        }
      }
    })

    let mark = 0
    let childrenOld: TypeRNode[] = []
    storeSubscribeRNode(thisRNode[EH_RNODE.$children], (children) => {
      this._children = children
      mark += mark > 9e9 ? -9e9 : 1
      const reases: TypeRease[] = []

      let needUpdate = childrenOld.length - children.length

      forEachLeft(children, (rnode) => {
        reases.push(rnode[EH_RNODE.rease]), (rnode[EH_RNODE.mark] = mark)
      })

      forEachLeft(childrenOld, (rnode) => {
        if (rnode[EH_RNODE.mark] !== mark)
          __destroyRNode__(rnode), (needUpdate = 1)
      })
      childrenOld = children

      if (needUpdate) {
        const arr = serviceRease[EH_SERVICE.readonly][EH_SERVICE.children]
        clear(arr), arr.push(...reases)
        serviceRease[EH_SERVICE.$children].update()
      }
    })
  }
}
