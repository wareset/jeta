import { EH_RNODE } from '.';
import { TypeStoreFunction, TypeStoreProxyFunction, TypeStoreDestroyFunction, TypeStoreSubscribeFunction } from '.';
import { TypeStore, TypeRease, TypeReaseClass, TypeProps } from '.';
export declare type TypeRNodeTag = string | TypeRease | TypeReaseClass | TypeStore<TypeRNodeTag>;
export declare type TypeRNode = __RNode__;
export declare class __RNode__ {
    [EH_RNODE.store]: TypeStoreFunction;
    [EH_RNODE.storeProxy]: TypeStoreProxyFunction;
    [EH_RNODE.storeDestroy]: TypeStoreDestroyFunction;
    [EH_RNODE.storeSubscribe]: TypeStoreSubscribeFunction;
    [EH_RNODE.destroy]: () => void;
    [EH_RNODE.destroyed]: [boolean];
    [EH_RNODE.id]: string;
    [EH_RNODE.childIdExecute]: () => string;
    [EH_RNODE.childIdZeroize]: () => void;
    [EH_RNODE.$rule]?: TypeStore<any>;
    [EH_RNODE.rease]: TypeRease;
    [EH_RNODE.$reaseClass]: TypeStore<TypeReaseClass>;
    [EH_RNODE.$tagName]: TypeStore<string>;
    [EH_RNODE.childrenForSlots]?: any[];
    [EH_RNODE.home]?: TypeRNode;
    [EH_RNODE.parent]?: TypeRNode;
    [EH_RNODE.$children]: TypeStore<TypeRNode[]>;
    [EH_RNODE.props]: TypeProps;
    [EH_RNODE.$node]: TypeStore<Node | undefined>;
    [EH_RNODE.childs]: (storeProxy: TypeStoreProxyFunction, ...a: any) => any[];
    [EH_RNODE.mark]: any;
    _children: any;
    _tagName: any;
    _rease: any;
    _class: any;
    constructor(_tagOrRease: TypeRNodeTag, _props?: 0 | null | undefined | any[] | {
        [key: string]: any;
    }, _childs?: any, _homeRNode?: TypeRNode, _parentRNode?: TypeRNode);
}
