export const enum EH_PROPS {
  default,
  system,
  flags
}

export const enum EH_SERVICE {
  self,
  main,

  rnode,

  readonly,

  refs,
  $refs,

  node,
  $node,
  home,
  $home,
  parent,
  $parent,
  children,
  $children,

  /* store base */
  store,
  storeProxy,
  storeDestroy,
  storeSubscribe,

  /* store listeners */
  storeOnSubscribe,
  storeOnDestroy,
  storeOnUpdate,
  storeOnChange,

  /* hooks lifecicle */
  beforeCreateList,
  onCreateList,
  beforeMountList,
  onMountList,
  beforeDestroyList,
  onDestroyList,

  destroy,
  destroyed
}

export const enum EH_RNODE {
  rease,
  $reaseClass,
  $rule,

  /* store base */
  store,
  storeProxy,
  storeDestroy,
  storeSubscribe,

  props,
  childs,

  $node,
  home,
  parent,
  $children,

  /* ReaseElement */
  $tagName,
  /* ReaseSlot */
  childrenForSlots,

  destroy,
  destroyed,

  mark,

  id,
  childIdExecute,
  childIdZeroize
}
