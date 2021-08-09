/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { __Rease__, TypeRease } from '..'

/*
ReaseComponent
*/
export interface IReaseComponent extends TypeRease {
  __?: () => (
    storeServiceProxy: any,
    tagCreator: any,
    textOrCommentCreator: any
  ) => any[]
}

export type TypeReaseComponent = ReaseComponent
export class ReaseComponent extends __Rease__ implements IReaseComponent {}
