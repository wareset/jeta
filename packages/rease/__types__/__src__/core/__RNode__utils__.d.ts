import { TypeRease, TypeRNode, TypeStoreFunction, TypeStoreProxyFunction, TypeProps, TypeStore } from '.';
export declare const rnodeUtilsSetChildrens: (_isNU: any, _thisRNode: TypeRNode, _storeProxy: TypeStoreProxyFunction) => void;
export declare const rnodeUtilsGetSystemProperty: <T>(_store: TypeStoreFunction, _props: TypeProps, _name: string, _default?: any) => TypeStore<T>;
export declare const rnodeUtilsGetFlagProperty: (_props: TypeProps, _name: string) => boolean;
export declare const rnodeUtilsSetRef: (_thisRease: TypeRease, _props: TypeProps) => (() => void);
