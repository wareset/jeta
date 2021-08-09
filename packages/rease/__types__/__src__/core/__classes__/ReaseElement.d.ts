import { __Rease__ } from '..';
import { TypeStore, TypeServiceRease, TypeRNode } from '..';
export declare const isChildlessTagName: (tagName: string) => boolean;
export declare type TypeReaseElement = ReaseElement;
export declare class ReaseElement extends __Rease__ {
    _tagName: string;
    $tagName: TypeStore<string>;
    __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode): void;
}
