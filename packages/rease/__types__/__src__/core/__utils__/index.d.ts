import { timeout } from '@wareset-utilites/timeout';
import { typed, typedOf } from '@wareset-utilites/typed';
import { TypeStore } from '..';
export { typed, typedOf };
export declare const isArrayNotStore: {
    (value: TypeStore<any>): false;
    (value: any): boolean;
};
export { timeout };
export declare const resolve: {
    <T>(callback: (...a: any[]) => Promise<T> | T): Promise<T>;
    (): undefined;
};
export { getProperty } from './getProperty';
export declare const operate: {
    <T extends (...a: any) => any>(a: T, ...args: any): ReturnType<T>;
};
