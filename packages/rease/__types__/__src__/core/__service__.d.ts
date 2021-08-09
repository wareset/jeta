import { TypeStoreFunction, TypeStoreDestroyFunction, TypeStoreSubscribeFunction, TypeStoreOnSubscribeFunction, TypeStoreOnDestroyFunction, TypeStoreOnUpdateFunction, TypeStoreOnChangeFunction } from '.';
import { TypeReaseRefs, TypeRease$Refs, TypeReaseNode, TypeRease$Node, TypeReaseRoot, TypeRease$Root, TypeReaseParent, TypeRease$Parent, TypeReaseChildren, TypeRease$Children } from '.';
import { TypeRNode } from '.';
import { TypeStoreProxyFunction } from '.';
import { EH_SERVICE } from '.';
export declare type TypeServiceHook = () => void | (() => void) | Promise<void | (() => void)>;
import { TypeRease } from '.';
export declare type TypeServiceRease = Readonly<{
    [EH_SERVICE.self]: TypeRease;
    [EH_SERVICE.main]: any;
    [EH_SERVICE.rnode]: [TypeRNode | null];
    [EH_SERVICE.readonly]: {
        [EH_SERVICE.refs]: TypeReaseRefs;
        [EH_SERVICE.node]: TypeReaseNode | null;
        [EH_SERVICE.home]: TypeReaseRoot | null;
        [EH_SERVICE.parent]: TypeReaseParent | null;
        [EH_SERVICE.children]: TypeReaseChildren;
    };
    [EH_SERVICE.$refs]: TypeRease$Refs;
    [EH_SERVICE.$node]: TypeRease$Node;
    [EH_SERVICE.$home]: TypeRease$Root;
    [EH_SERVICE.$parent]: TypeRease$Parent;
    [EH_SERVICE.$children]: TypeRease$Children;
    [EH_SERVICE.store]: TypeStoreFunction;
    [EH_SERVICE.storeProxy]: TypeStoreProxyFunction;
    [EH_SERVICE.storeDestroy]: TypeStoreDestroyFunction;
    [EH_SERVICE.storeSubscribe]: TypeStoreSubscribeFunction;
    [EH_SERVICE.storeOnSubscribe]: TypeStoreOnSubscribeFunction;
    [EH_SERVICE.storeOnDestroy]: TypeStoreOnDestroyFunction;
    [EH_SERVICE.storeOnUpdate]: TypeStoreOnUpdateFunction;
    [EH_SERVICE.storeOnChange]: TypeStoreOnChangeFunction;
    [EH_SERVICE.beforeCreateList]: TypeServiceHook[];
    [EH_SERVICE.onCreateList]: TypeServiceHook[];
    [EH_SERVICE.beforeMountList]: TypeServiceHook[];
    [EH_SERVICE.onMountList]: TypeServiceHook[];
    [EH_SERVICE.beforeDestroyList]: TypeServiceHook[];
    [EH_SERVICE.onDestroyList]: TypeServiceHook[];
    [EH_SERVICE.destroy]: () => void;
    [EH_SERVICE.destroyed]: [boolean];
}>;
export declare const __: {
    (v: TypeRease): TypeServiceRease;
};
export declare const createStoresService: () => [
    TypeStoreFunction,
    TypeStoreProxyFunction,
    TypeStoreDestroyFunction,
    TypeStoreSubscribeFunction,
    () => void,
    any[]
];
export declare const createServiceRease: (_self: TypeRease) => void;
