import { __, EH_SERVICE, TypeRease } from '.'

const hooksFactory = (
  type:
    | EH_SERVICE.beforeCreateList
    | EH_SERVICE.onCreateList
    | EH_SERVICE.beforeMountList
    | EH_SERVICE.onMountList
    | EH_SERVICE.beforeDestroyList
    | EH_SERVICE.onDestroyList
) => (rease: TypeRease) => (
  callback: () => void | (() => void) | Promise<void | (() => void)>
): void => {
  __(rease)[type].push(callback)
}

export const beforeCreate = hooksFactory(EH_SERVICE.beforeCreateList)
export const onCreate = hooksFactory(EH_SERVICE.onCreateList)

export const beforeMount = hooksFactory(EH_SERVICE.beforeMountList)
export const onMount = hooksFactory(EH_SERVICE.onMountList)

export const beforeDestroy = hooksFactory(EH_SERVICE.beforeDestroyList)
export const onDestroy = hooksFactory(EH_SERVICE.onDestroyList)
