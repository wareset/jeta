import { TypeRease, TypePropsDefault } from '..';
declare type TypePropFunction = new (...a: any[]) => any;
declare type PropOptions = {
    name?: string;
    value?: any | any[];
    store?: boolean;
    typed?: TypePropFunction | TypePropFunction[];
    typedOf?: TypePropFunction | TypePropFunction[];
    default?: any;
    storefy?: boolean;
    required?: boolean;
};
export declare const getProperty: {
    (rease: TypeRease): TypePropsDefault;
    (rease: TypeRease, prop: string | PropOptions, options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any
    ];
    (rease: TypeRease, props: (string | PropOptions)[], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): any[];
    (rease: TypeRease, props: [
        string | PropOptions
    ], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any
    ];
    (rease: TypeRease, props: [
        string | PropOptions,
        string | PropOptions
    ], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any,
        any
    ];
    (rease: TypeRease, props: [
        string | PropOptions,
        string | PropOptions,
        string | PropOptions
    ], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any,
        any,
        any
    ];
    (rease: TypeRease, props: [
        string | PropOptions,
        string | PropOptions,
        string | PropOptions,
        string | PropOptions
    ], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any,
        any,
        any,
        any
    ];
    (rease: TypeRease, props: [
        string | PropOptions,
        string | PropOptions,
        string | PropOptions,
        string | PropOptions,
        string | PropOptions
    ], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any,
        any,
        any,
        any,
        any
    ];
    (rease: TypeRease, props: [
        string | PropOptions,
        string | PropOptions,
        string | PropOptions,
        string | PropOptions,
        string | PropOptions,
        string | PropOptions
    ], options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions): [
        any,
        any,
        any,
        any,
        any,
        any
    ];
    (rease: TypeRease, validateProps: {
        [key: string]: TypePropFunction | TypePropFunction[] | PropOptions;
    }): {
        [key: string]: any;
    };
};
export {};
