import { TypeRease } from '.';
export declare const beforeCreate: (rease: TypeRease) => (callback: () => void | (() => void) | Promise<void | (() => void)>) => void;
export declare const onCreate: (rease: TypeRease) => (callback: () => void | (() => void) | Promise<void | (() => void)>) => void;
export declare const beforeMount: (rease: TypeRease) => (callback: () => void | (() => void) | Promise<void | (() => void)>) => void;
export declare const onMount: (rease: TypeRease) => (callback: () => void | (() => void) | Promise<void | (() => void)>) => void;
export declare const beforeDestroy: (rease: TypeRease) => (callback: () => void | (() => void) | Promise<void | (() => void)>) => void;
export declare const onDestroy: (rease: TypeRease) => (callback: () => void | (() => void) | Promise<void | (() => void)>) => void;
