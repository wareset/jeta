/* eslint-disable camelcase */

import { __RNode__, ReaseRoot, TypeRNodeTag, TypeRNode } from '../core'

const __createTree__ = (
  _tagOrRease: TypeRNodeTag,
  _props?: 0 | null | undefined | any[] | { [key: string]: any }
): TypeRNode => new __RNode__(_tagOrRease, _props, [])

export const createTree = (
  _tagOrRease: TypeRNodeTag,
  _target?: HTMLElement | null | 0,
  _props?: 0 | null | undefined | any[] | { [key: string]: any }
): TypeRNode =>
  __createTree__(ReaseRoot, [
    [':tag', _tagOrRease],
    [':target', _target],
    [':props', _props]
  ])
