import { __Rease__, TypeRease } from '..';
export interface IReaseComponent extends TypeRease {
    __?: () => (storeServiceProxy: any, tagCreator: any, textOrCommentCreator: any) => any[];
}
export declare type TypeReaseComponent = ReaseComponent;
export declare class ReaseComponent extends __Rease__ implements IReaseComponent {
}
