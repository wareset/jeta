import { instanceOf } from '@wareset-utilites/lang/instanceOf'

import { TypeStore } from '.'
import { createServiceRease } from '.'

export declare type TypeReaseRefs = { [key: string]: TypeRease$Node }
export declare type TypeRease$Refs = TypeStore<TypeReaseRefs>
export declare type TypeReaseNode = Node | undefined
export declare type TypeRease$Node = TypeStore<TypeReaseNode>
export declare type TypeReaseRoot = TypeRease | undefined
export declare type TypeRease$Root = TypeStore<TypeReaseRoot>
export declare type TypeReaseParent = TypeRease | undefined
export declare type TypeRease$Parent = TypeStore<TypeReaseParent>
export declare type TypeReaseChildren = TypeRease[]
export declare type TypeRease$Children = TypeStore<TypeReaseChildren>

export interface TypeRease {
  [key: string]: any
  readonly $refs: TypeRease$Refs
  readonly $node: TypeRease$Node
  readonly $home: TypeRease$Root
  readonly $parent: TypeRease$Parent
  readonly $children: TypeRease$Children
}

export const isRease = (v: any): v is __Rease__ => instanceOf(v, __Rease__)

export declare type TypeReaseClass = new (...a: any[]) => TypeRease
export class __Rease__ implements TypeRease {
  // readonly __!: '@rease-service@'
  static isRease = isRease
  public isRease(v: any): boolean {
    return isRease(v)
  }

  readonly $refs!: TypeRease$Refs
  readonly $node!: TypeRease$Node
  readonly $home!: TypeRease$Root
  readonly $parent!: TypeRease$Parent
  readonly $children!: TypeRease$Children

  constructor() {
    createServiceRease(this)
  }
}
