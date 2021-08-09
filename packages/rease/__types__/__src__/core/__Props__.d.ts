import { EH_PROPS } from '.';
export declare type TypePropsFlags = {
    [key: string]: boolean;
};
export declare type TypePropsSystem = {
    [key: string]: any[][];
};
export declare type TypePropsDefault = {
    [key: string]: any;
};
export declare type TypeProps = __Props__;
export declare class __Props__ {
    readonly [EH_PROPS.flags]: TypePropsFlags;
    readonly [EH_PROPS.system]: TypePropsSystem;
    readonly [EH_PROPS.default]: TypePropsDefault;
    constructor(_props?: any);
}
export declare const createProps: (_props?: any) => TypeProps;
