'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var defineProperty = require('@wareset-utilites/object/defineProperty');

var isNill = require('@wareset-utilites/is/isNill');

var store$1 = require('@wareset/store');

var isArray = require('@wareset-utilites/is/isArray');

var timeout = require('@wareset-utilites/timeout');

var typed = require('@wareset-utilites/typed');

var hasOwnProperty = require('@wareset-utilites/object/hasOwnProperty');

var forEachLeft = require('@wareset-utilites/array/forEachLeft');

var isFunction = require('@wareset-utilites/is/isFunction');

var includes = require('@wareset-utilites/array/includes');

var isObject = require('@wareset-utilites/is/isObject');

var isString = require('@wareset-utilites/is/isString');

var keys = require('@wareset-utilites/object/keys');

var error = require('@wareset-utilites/error');

var forEachRight = require('@wareset-utilites/array/forEachRight');

var spliceWith = require('@wareset-utilites/array/spliceWith');

var clear = require('@wareset-utilites/array/clear');

var instanceOf = require('@wareset-utilites/lang/instanceOf');

var isUndefined = require('@wareset-utilites/is/isUndefined');

var concat = require('@wareset-utilites/array/concat');

var last = require('@wareset-utilites/array/last');

var values = require('@wareset-utilites/object/values');

var is = require('@wareset-utilites/object/is');

var jsonStringify = require('@wareset-utilites/lang/jsonStringify');

var trycatch = require('@wareset-utilites/trycatch');

var findLeft = require('@wareset-utilites/array/findLeft');

var someRight = require('@wareset-utilites/array/someRight');

var someLeft = require('@wareset-utilites/array/someLeft');

var getPrototypeOf = require('@wareset-utilites/object/getPrototypeOf');

var MAX_SAFE_INTEGER = require('@wareset-utilites/number/MAX_SAFE_INTEGER'); // prettier-ignore


var storeReadonlyfy = store => (defineProperty.defineProperty(store, 'readonly', {
  value: true
}), store); // prettier-ignore


var storeProxyFactory = store => (...a) => store(a[-1], ...a);

var storeModuleProxy = storeProxyFactory(store$1.store);

var storeFactory = (type, fn) => rease => isNill.isNill(rease) ? fn : __(rease)[type]; // prettier-ignore


var store = storeFactory("EH_SERVICE_store"
/* store */
, store$1.store); // prettier-ignore

var storeProxy = storeFactory("EH_SERVICE_storeProxy"
/* storeProxy */
, storeModuleProxy); // prettier-ignore

var storeDestroy = storeFactory("EH_SERVICE_storeDestroy"
/* storeDestroy */
, store$1.storeDestroy); // prettier-ignore

var storeSubscribe = storeFactory("EH_SERVICE_storeSubscribe"
/* storeSubscribe */
, store$1.storeSubscribe); // prettier-ignore

var storeOnSubscribe = storeFactory("EH_SERVICE_storeOnSubscribe"
/* storeOnSubscribe */
, store$1.storeOnSubscribe); // prettier-ignore

var storeOnDestroy = storeFactory("EH_SERVICE_storeOnDestroy"
/* storeOnDestroy */
, store$1.storeOnDestroy); // prettier-ignore

var storeOnUpdate = storeFactory("EH_SERVICE_storeOnUpdate"
/* storeOnUpdate */
, store$1.storeOnUpdate); // prettier-ignore

var storeOnChange = storeFactory("EH_SERVICE_storeOnChange"
/* storeOnChange */
, store$1.storeOnChange);
/* utils */

var getStoreValue = value => store$1.isStore(value) ? value.get() : value; // prettier-ignore


var storefy = rease => (value, instance) => instance || !store$1.isStore(value) ? store(rease)(value) : value;

var hooksFactory = type => rease => callback => {
  __(rease)[type].push(callback);
};

var beforeCreate = hooksFactory("EH_SERVICE_beforeCreateList"
/* beforeCreateList */
);
var onCreate = hooksFactory("EH_SERVICE_onCreateList"
/* onCreateList */
);
var beforeMount = hooksFactory("EH_SERVICE_beforeMountList"
/* beforeMountList */
);
var onMount = hooksFactory("EH_SERVICE_onMountList"
/* onMountList */
);
var beforeDestroy = hooksFactory("EH_SERVICE_beforeDestroyList"
/* beforeDestroyList */
);
var onDestroy = hooksFactory("EH_SERVICE_onDestroyList"
/* onDestroyList */
);
var VALUE = 'value';
var STORE = 'store';
var TYPED = 'typed';
var TYPEDOF = TYPED + 'Of';
var STOREFY = STORE + 'fy';
var REQUIRED = 'required';

var __getPropertyDirty__ = rease => __(rease)["EH_SERVICE_rnode"
/* rnode */
][0]["EH_RNODE_props"
/* props */
]["EH_PROPS_default"
/* default */
];

var __arrayfy__ = v => isArrayNotStore(v) ? v : [v]; // prettier-ignore


var __normalizePropertyOptions__ = options => !options ? {} : isArray.isArray(options = isFunction.isFunction(options) ? [options] : options) ? {
  [TYPED]: options
} : isObject.isObject(options) ? options : {
  [REQUIRED]: true
}; // export const getPropertyList = (rease: TypeRease): string[] =>
//   keys(__getPropertyDirty__(rease))


var getProperty = // prettier-ignore
(_rease, _props, _options) => {
  var properties = __getPropertyDirty__(_rease);

  var res = properties;

  if (_props) {
    var propKeys = keys.keys(isObject.isObject(_props = getStoreValue(_props)) ? _props : [_props]);
    var isObjRes = isObject.isObject(_props) && !isArray.isArray(_props);
    res = isObjRes ? {} : []; // prettier-ignore

    var optionsGlobal = __normalizePropertyOptions__(_options);

    forEachLeft.forEachLeft(propKeys, _k => {
      var prop = _props[_k];
      var isObj = isObject.isObject(prop);
      var name = isObj ? prop.name || _k : prop;
      var options = isString.isString(prop) ? optionsGlobal : __normalizePropertyOptions__(prop);
      var isset;
      var property = (isset = hasOwnProperty.hasOwnProperty(properties, name)) ? properties[name] : options.default;
      var propertyValue = getStoreValue(property);
      var tmp;

      if (options[REQUIRED] && !isset) {
        error.throwError(name + ' is ' + REQUIRED);
      }

      if (hasOwnProperty.hasOwnProperty(options, VALUE) && !includes.includes(tmp = __arrayfy__(options[VALUE]), propertyValue)) {
        error.throwError(name + ' is not ' + VALUE + ': ' + tmp);
      }

      if (hasOwnProperty.hasOwnProperty(options, STORE) && !options[STORE] === (tmp = store$1.isStore(property))) {
        error.throwError(name + ' is ' + STORE + ' must by ' + !tmp);
      }

      if (hasOwnProperty.hasOwnProperty(options, TYPED) && !typed.typed(propertyValue, ...(tmp = __arrayfy__(options[TYPED]))) || hasOwnProperty.hasOwnProperty(options, TYPEDOF) && !typed.typedOf(propertyValue, ...(tmp = __arrayfy__(options[TYPEDOF])))) {
        error.throwError(name + ' is not ' + TYPED + ': ' + tmp.map(v => v.name));
      } // prettier-ignore


      var propertyFinal = hasOwnProperty.hasOwnProperty(options, STOREFY) ? options[STOREFY] ? storefy(_rease)(property) : propertyValue : property; // console.log(111, name, propertyValue, options)

      isObjRes ? res[_k] = propertyFinal : res.push(propertyFinal);
    });
  }

  return res;
};

var isArrayNotStore = value => isArray.isArray(value) && !store$1.isStore(value); // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask
// prettier-ignore


var resolve = cb => Promise.resolve().then(cb).catch(e => {
  throw e;
}); // prettier-ignore


var operate = a => a();

var __null__ = null;
var REASE_SERVICE_KEY = {};

var __ = v => v.__(REASE_SERVICE_KEY); // const __defineServiceAccess__: {
//   (_self: TypeRease, _service: TypeServiceRease): void
//   (_self: TypeRNode, _service: TypeServiceRNode): void
// } = (_self: any, _service: any) => {
//   // prettier-ignore
//   defineProperty(_self, '__', {
//     value: (key: any): any => key === REASE_SERVICE_KEY ? _service : __null__ })
// }
// prettier-ignore


var __storeOn__ = (list, fn) => (...a) => (list.push(a = fn(...a)), () => {
  spliceWith.spliceWith(list, a, 1), a();
});

var createStoresService = () => {
  var stores = [];
  var unlisteners = [];
  var unsubscribers = []; // prettier-ignore

  var store = (...a) => (stores.unshift(a = store$1.store(...a)), a);

  var storeProxy = storeProxyFactory(store); // prettier-ignore

  var storeDestroy = (...a) => {
    forEachRight.forEachRight(store$1.isStore(a[0]) ? [a[0]] : a[0], v => {
      spliceWith.spliceWith(stores, v, 1);
    }), store$1.storeDestroy(...a);
  };

  var storeSubscribe = __storeOn__(unsubscribers, store$1.storeSubscribe);

  var destroy = () => {
    forEachRight.forEachRight(unsubscribers, operate), clear.clear(unsubscribers);
    forEachRight.forEachRight(unlisteners, operate), clear.clear(unlisteners);
    store$1.storeDestroy(stores), clear.clear(stores);
  };

  return [store, storeProxy, storeDestroy, storeSubscribe, destroy, unlisteners];
};

var createServiceRease = _self => {
  var [store, storeProxy, storeDestroy, storeSubscribe, destroy, unlisteners] = createStoresService();
  var readonly = {
    ["EH_SERVICE_refs"
    /* refs */
    ]: {},
    ["EH_SERVICE_node"
    /* node */
    ]: __null__,
    ["EH_SERVICE_home"
    /* home */
    ]: __null__,
    ["EH_SERVICE_parent"
    /* parent */
    ]: __null__,
    ["EH_SERVICE_children"
    /* children */
    ]: []
  }; // prettier-ignore

  var service = {
    ["EH_SERVICE_self"
    /* self */
    ]: _self,
    ["EH_SERVICE_main"
    /* main */
    ]: _self.__,
    ["EH_SERVICE_rnode"
    /* rnode */
    ]: [__null__],
    ["EH_SERVICE_readonly"
    /* readonly */
    ]: readonly,
    ["EH_SERVICE_$refs"
    /* $refs */
    ]: storeReadonlyfy(storeProxy([], () => readonly["EH_SERVICE_refs"
    /* refs */
    ])),
    ["EH_SERVICE_$node"
    /* $node */
    ]: storeReadonlyfy(storeProxy([], () => readonly["EH_SERVICE_node"
    /* node */
    ])),
    ["EH_SERVICE_$home"
    /* $home */
    ]: storeReadonlyfy(storeProxy([], () => readonly["EH_SERVICE_home"
    /* home */
    ])),
    ["EH_SERVICE_$parent"
    /* $parent */
    ]: storeReadonlyfy(storeProxy([], () => readonly["EH_SERVICE_parent"
    /* parent */
    ])),
    ["EH_SERVICE_$children"
    /* $children */
    ]: storeReadonlyfy(storeProxy([], () => readonly["EH_SERVICE_children"
    /* children */
    ])),
    ["EH_SERVICE_store"
    /* store */
    ]: store,
    ["EH_SERVICE_storeProxy"
    /* storeProxy */
    ]: storeProxy,
    ["EH_SERVICE_storeDestroy"
    /* storeDestroy */
    ]: storeDestroy,
    ["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ]: storeSubscribe,
    ["EH_SERVICE_storeOnSubscribe"
    /* storeOnSubscribe */
    ]: __storeOn__(unlisteners, store$1.storeOnSubscribe),
    ["EH_SERVICE_storeOnDestroy"
    /* storeOnDestroy */
    ]: __storeOn__(unlisteners, store$1.storeOnDestroy),
    ["EH_SERVICE_storeOnUpdate"
    /* storeOnUpdate */
    ]: __storeOn__(unlisteners, store$1.storeOnUpdate),
    ["EH_SERVICE_storeOnChange"
    /* storeOnChange */
    ]: __storeOn__(unlisteners, store$1.storeOnChange),
    ["EH_SERVICE_beforeCreateList"
    /* beforeCreateList */
    ]: [],
    ["EH_SERVICE_onCreateList"
    /* onCreateList */
    ]: [],
    ["EH_SERVICE_beforeMountList"
    /* beforeMountList */
    ]: [],
    ["EH_SERVICE_onMountList"
    /* onMountList */
    ]: [],
    ["EH_SERVICE_beforeDestroyList"
    /* beforeDestroyList */
    ]: [],
    ["EH_SERVICE_onDestroyList"
    /* onDestroyList */
    ]: [],
    ["EH_SERVICE_destroy"
    /* destroy */
    ]: destroy,
    ["EH_SERVICE_destroyed"
    /* destroyed */
    ]: [false]
  }; // __defineServiceAccess__(_self, service)
  // prettier-ignore

  defineProperty.defineProperty(_self, '__', {
    value: key => key === REASE_SERVICE_KEY ? service : __null__
  }); // prettier-ignore

  forEachRight.forEachRight([["EH_SERVICE_$refs"
  /* $refs */
  , '$refs'], ["EH_SERVICE_$node"
  /* $node */
  , '$node'], ["EH_SERVICE_$parent"
  /* $parent */
  , '$parent'], ["EH_SERVICE_$home"
  /* $home */
  , '$home'], ["EH_SERVICE_$children"
  /* $children */
  , '$children']], v => {
    defineProperty.defineProperty(_self, v[1], {
      enumerable: true,
      value: service[v[0]]
    });
  });
}; // export declare type TypeServiceRNode = Readonly<{
//   [EH_SERVICE.self]: TypeRNode
//   [EH_SERVICE.store]: TypeStoreFunction
//   [EH_SERVICE.storeProxy]: TypeStoreProxyFunction
//   [EH_SERVICE.storeDestroy]: TypeStoreDestroyFunction
//   [EH_SERVICE.storeSubscribe]: TypeStoreSubscribeFunction
//   [EH_SERVICE.destroy]: () => void
//   [EH_SERVICE.destroyed]: [boolean]
// }>
// export const createServiceRNode = (_self: TypeRNode): void => {
//   const [
//     store,
//     storeProxy,
//     storeDestroy,
//     storeSubscribe,
//     destroy
//   ] = __createStores__()
//   // prettier-ignore
//   const service: TypeServiceRNode = {
//     [EH_SERVICE.self]: _self,
//     [EH_SERVICE.store]: store,
//     [EH_SERVICE.storeProxy]: storeProxy,
//     [EH_SERVICE.storeDestroy]: storeDestroy,
//     [EH_SERVICE.storeSubscribe]: storeSubscribe,
//     [EH_SERVICE.destroy]: destroy,
//     [EH_SERVICE.destroyed]: [false]
//   }
//   __defineServiceAccess__(_self, service)
// }


var isRease = v => instanceOf.instanceOf(v, __Rease__);

class __Rease__ {
  constructor() {
    createServiceRease(this);
  }

  isRease(v) {
    return isRease(v);
  }

} // readonly __!: '@rease-service@'


__Rease__.isRease = isRease;

var _a, _b, _c;

class __Props__ {
  constructor(_props) {
    this[_a] = {};
    this[_b] = {};
    this[_c] = {};

    if (_props = getStoreValue(_props)) {
      // console.log(1, propsDirty)
      // console.log(2, this)
      var self = this;

      if (isArray.isArray(_props)) {
        forEachLeft.forEachLeft(_props, // isArray(propsDirty[0]) ? propsDirty : [propsDirty],
        _data => {
          var [k, ...v] = _data;
          if (k[0] === ':') (self["EH_PROPS_system"
          /* system */
          ][k] || (self["EH_PROPS_system"
          /* system */
          ][k] = [])).push(v);else if (k[0] === '-' && k[1] === '-') self["EH_PROPS_flags"
          /* flags */
          ][k] = !!v[0];else {
            if (k in self["EH_PROPS_default"
            /* default */
            ]) console.error('Dublicate property ' + k);
            self["EH_PROPS_default"
            /* default */
            ][k] = v[0];
          }
        });
      } else {
        // eslint-disable-next-line guard-for-in
        for (var k in _props) {
          if (k[0] === ':') self["EH_PROPS_system"
          /* system */
          ][k] = [[_props[k]]];else if (k[0] === '-' && k[1] === '-') self["EH_PROPS_flags"
          /* flags */
          ][k] = !!_props[k];else self["EH_PROPS_default"
          /* default */
          ][k] = _props[k];
        }
      }
    }
  }

}

_a = "EH_PROPS_flags"
/* flags */
, _b = "EH_PROPS_system"
/* system */
, _c = "EH_PROPS_default"
/* default */
;

var createProps = _props => instanceOf.instanceOf(_props, __Props__) ? _props : new __Props__(_props); // export const getChildsTokensList = (
//   storeProxy: TypeStoreProxyFunction,
//   childsFn: (storeProxy: TypeStoreProxyFunction, ...a: any[]) => any[]
// ): any[] => childsFn(storeProxy)


var rnodeUtilsSetChildrens = (_isNU, _thisRNode, _storeProxy) => {
  // _thisRNode[EH_RNODE.childIdZeroize]()
  // prettier-ignore
  _thisRNode["EH_RNODE_$children"
  /* $children */
  ].set(_isNU ? _thisRNode["EH_RNODE_childs"
  /* childs */
  ](_storeProxy).map(v => new __RNode__(...v, _thisRNode)) : []);
};

var rnodeUtilsGetSystemProperty = (_store, _props, _name, _default) => {
  var rules = concat.concat(...(_props["EH_PROPS_system"
  /* system */
  ][_name] || []));

  var $rule = _store(last.last(rules), rules);

  return isUndefined.isUndefined(_default) ? $rule : _store($rule, a => isUndefined.isUndefined(a = $rule.get()) ? _default : a);
};

var rnodeUtilsGetFlagProperty = (_props, _name) => !!_props["EH_PROPS_flags"
/* flags */
][_name];

var rnodeUtilsSetRef = (_thisRease, _props) => {
  var stores = [];
  var refs = _props["EH_PROPS_system"
  /* system */
  ][':ref'];

  if (refs) {
    forEachLeft.forEachLeft(refs, ref => {
      if (store$1.isStore(ref[0])) ref[0].set(_thisRease), stores.push(ref[0]);
    });
  }

  return () => {
    forEachLeft.forEachLeft(stores, v => {
      v.set(null);
    });
  };
};
/* eslint-disable @typescript-eslint/explicit-function-return-type */


class ReaseComponent extends __Rease__ {} // prettier-ignore


var CHILDLESS_TAGNAMES = {
  ['img']: 1,
  ['area']: 1,
  ['base']: 1,
  ['br']: 1,
  ['col']: 1,
  ['embed']: 1,
  ['hr']: 1,
  ['input']: 1,
  ['link']: 1,
  ['meta']: 1,
  ['param']: 1,
  ['source']: 1,
  ['track']: 1,
  ['wbr']: 1
};

var isChildlessTagName = tagName => hasOwnProperty.hasOwnProperty(CHILDLESS_TAGNAMES, tagName);

class ReaseElement extends __Rease__ {
  __(_serviceRease, _thisRNode) {
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $tagName = _thisRNode["EH_RNODE_$tagName"
    /* $tagName */
    ]; // console.log($tagName.$)

    var isNU = false;
    storeSubscribe( // prettier-ignore
    this.$tagName = storeReadonlyfy(storeProxy([$tagName], () => this._tagName = $tagName.get() || 'div')), _tagName => {
      if (isNU !== (isNU = !isChildlessTagName(_tagName))) {
        rnodeUtilsSetChildrens(isNU, _thisRNode, storeProxy);
      }
    });
  }

}

class ReaseFragment extends __Rease__ {
  __(_serviceRease, _thisRNode) {
    rnodeUtilsSetChildrens(true, _thisRNode, _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ]);
  }

}

class ReaseMixin extends __Rease__ {}

class ReaseRoot extends __Rease__ {
  __(_serviceRease, _thisRNode, _props) {
    var tagName = _props["EH_PROPS_system"
    /* system */
    ][':tag'][0][0];
    var props = _props["EH_PROPS_system"
    /* system */
    ][':props'][0][0];
    var node = _props["EH_PROPS_system"
    /* system */
    ][':target'][0][0]; // const cb = _props[EH_PROPS.system][':renderer'][0][0]

    if (node) _thisRNode["EH_RNODE_$node"
    /* $node */
    ].set(node);

    _thisRNode["EH_RNODE_$children"
    /* $children */
    ].set([new __RNode__(tagName, props, [], _thisRNode, _thisRNode)]); // console.log(33, tagName)

  }

}

class ReaseRule extends __Rease__ {}

class ReaseSlot extends __Rease__ {
  __(_serviceRease, _thisRNode, _props) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeProxyRNode = _thisRNode["EH_RNODE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $name = rnodeUtilsGetSystemProperty(store, _props, ':name', 'default'); // prettier-ignore

    this.$name = storeReadonlyfy(storeProxy([$name], () => this._name = $name.get())); // const defaultNodes = _thisRNode[EH_RNODE.childs](storeProxy)
    // prettier-ignore

    var outsideNodes = _thisRNode["EH_RNODE_home"
    /* home */
    ] ? _thisRNode["EH_RNODE_home"
    /* home */
    ]["EH_RNODE_childrenForSlots"
    /* childrenForSlots */
    ] || (_thisRNode["EH_RNODE_home"
    /* home */
    ]["EH_RNODE_childrenForSlots"
    /* childrenForSlots */
    ] = _thisRNode["EH_RNODE_home"
    /* home */
    ]["EH_RNODE_childs"
    /* childs */
    ](storeProxyRNode)) : [];
    var _children = {};
    var $children = store();
    forEachLeft.forEachLeft(outsideNodes, (_node, _key) => {
      // prettier-ignore
      var $slot = rnodeUtilsGetSystemProperty(store, _node[1], ':slot', 'default');
      var isEqual = false;
      storeSubscribe([$name, $slot], (_name, _slot) => {
        if (isEqual !== (isEqual = is.is(_name, _slot))) {
          // console.log('rease-slot', _name, _slot)
          if (isEqual) _children[_key] = new __RNode__(..._node, _thisRNode);else delete _children[_key];
          $children.update();
        }
      });
    });
    storeSubscribe($children, () => {
      var outside = values.values(_children);

      if (outside[0]) {
        _thisRNode["EH_RNODE_$children"
        /* $children */
        ].set(outside);
      } else {
        rnodeUtilsSetChildrens(true, _thisRNode, storeProxy);
      }
    });
  }

}

var undef;

class ReaseText extends __Rease__ {
  __(_serviceRease, _thisRNode) {
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];

    var childs = _thisRNode["EH_RNODE_childs"
    /* childs */
    ](storeProxy); // prettier-ignore


    var $wholeText = storeProxy(childs, () => childs.map(v => isNill.isNill(v = getStoreValue(v)) ? '' : isObject.isObject(v) ? trycatch.trycatch(() => jsonStringify.jsonStringify(v, undef, 2), () => v) : v).join('')); // prettier-ignore

    this.$wholeText = storeReadonlyfy(storeProxy([$wholeText], () => this._wholeText = $wholeText.get())); // console.log(this._wholeText)
  }

}

class ReaseStyle extends ReaseText {}

class ReaseScript extends ReaseText {}

class ReaseComment extends ReaseText {}

class RuleAwait extends ReaseRule {}

class RuleThen extends ReaseRule {}

class RuleCatch extends ReaseRule {}

var __getSub__ = (_thisRNode, storeProxy, subs, subsOld, children, _key, _v, _k, _a) => {
  var key = _key && _v[_key] ? _v[_key] : '' + _k + _v;
  var sub = findLeft.findLeft(subsOld, v => v[0] === key);

  if (!sub) {
    sub = [key, _thisRNode["EH_RNODE_childs"
    /* childs */
    ](storeProxy, _v, _k, _a).map(v => new __RNode__(...v, _thisRNode))];
  }

  subs.push(sub);
  children.push(...sub[1]);
};

class RuleFor extends ReaseRule {
  __(_serviceRease, _thisRNode, _props) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $rule = rnodeUtilsGetSystemProperty(store, _props, ':rule');
    var $iter = storeProxy(() => {
      var iter = getStoreValue($rule) || {};
      var step = +(getStoreValue(iter.step) || 1);
      var from = +(getStoreValue(iter.from) || 0);
      var to = +(getStoreValue(iter.to) || 0);
      return {
        from,
        to,
        step
      };
    });
    var isAsync = rnodeUtilsGetFlagProperty(_props, '--async');
    var caller = isAsync ? resolve : operate;
    var subs = [];
    var olds; // prettier-ignore

    storeSubscribe([$iter], ({
      from,
      to,
      step
    }) => caller(() => {
      if (isAsync) {
        ({
          from,
          to,
          step
        } = getStoreValue($iter));
      }

      olds = subs, subs = [];
      var children = [];
      var _k = 0;

      for (var _v = from; _v <= to; _v += step) {
        __getSub__(_thisRNode, storeProxy, subs, olds, children, false, _v, _k++);
      }

      _thisRNode["EH_RNODE_$children"
      /* $children */
      ].set(children);
    }));
  }

}

class RuleForIn extends ReaseRule {
  __(_serviceRease, _thisRNode, _props) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $object = rnodeUtilsGetSystemProperty(store, _props, ':rule');
    var $key = rnodeUtilsGetSystemProperty(store, _props, ':key');
    var isAsync = rnodeUtilsGetFlagProperty(_props, '--async');
    var caller = isAsync ? resolve : operate;
    var subs = [];
    var olds; // prettier-ignore

    storeSubscribe([$object, $key], (_object, _key) => caller(() => {
      if (isAsync) {
        _object = getStoreValue($object), _key = getStoreValue($key);
      }

      olds = subs, subs = [];
      var children = [];
      forEachLeft.forEachLeft(keys.keys(_object), _k => {
        __getSub__(_thisRNode, storeProxy, subs, olds, children, _key, _object[_k], _k, _object);
      });

      _thisRNode["EH_RNODE_$children"
      /* $children */
      ].set(children);
    }));
  }

}

class RuleForOf extends ReaseRule {
  __(_serviceRease, _thisRNode, _props) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $array = rnodeUtilsGetSystemProperty(store, _props, ':rule');
    var $key = rnodeUtilsGetSystemProperty(store, _props, ':key');
    var isAsync = rnodeUtilsGetFlagProperty(_props, '--async');
    var caller = isAsync ? resolve : operate;
    var subs = [];
    var olds; // prettier-ignore

    storeSubscribe([$array, $key], (_array, _key) => caller(() => {
      if (isAsync) {
        _array = getStoreValue($array), _key = getStoreValue($key);
      }

      olds = subs, subs = [];
      var children = [];
      forEachLeft.forEachLeft(_array, (_v, _k) => {
        __getSub__(_thisRNode, storeProxy, subs, olds, children, _key, _v, _k, _array);
      });

      _thisRNode["EH_RNODE_$children"
      /* $children */
      ].set(children);
    }));
  }

}

var __subsAndSetChilds__ = (_thisRNode, _storeProxy, _storeSubscribe, $rule) => {
  var isNU = false;

  _storeSubscribe($rule, _rule => {
    if (isNU !== (isNU = !!_rule)) rnodeUtilsSetChildrens(isNU, _thisRNode, _storeProxy);
  });
};

var __ruleElse__ = (_thisRNode, storeSubscribe, _$ruleElse) => {
  var childrenParent = _thisRNode["EH_RNODE_parent"
  /* parent */
  ] ? _thisRNode["EH_RNODE_parent"
  /* parent */
  ]["EH_RNODE_$children"
  /* $children */
  ].get() : [];
  var reaseClassesPrev = [];
  someLeft.someLeft(childrenParent, _rnode => {
    var isThisRNode = _rnode === _thisRNode;
    if (!isThisRNode) reaseClassesPrev.push(_rnode["EH_RNODE_$reaseClass"
    /* $reaseClass */
    ]);
    return isThisRNode;
  });

  if (reaseClassesPrev[0]) {
    var destroy;
    storeSubscribe(reaseClassesPrev, (...a) => {
      if (destroy) destroy();
      var isRNodeId = -1; // prettier-ignore

      someRight.someRight(a, (_class, _k) => ((_class === RuleIf || _class === RuleElseIf) && (isRNodeId = _k), _class === RuleElse || isRNodeId > -1));
      var thisRNodeIf;

      if (thisRNodeIf = childrenParent[isRNodeId]) {
        var $ruleIf = thisRNodeIf["EH_RNODE_$rule"
        /* $rule */
        ].get();
        var unsub = storeSubscribe($ruleIf, _ruleIf => {
          _$ruleElse.set(_ruleIf === false);
        });

        destroy = () => {
          unsub(), destroy = 0;
        };
      }
    });
  }
};

class RuleIf extends ReaseRule {
  __(_serviceRease, _thisRNode, _props) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $ruleIf = rnodeUtilsGetSystemProperty(store, _props, ':rule'); // prettier-ignore

    this.$rule = _thisRNode["EH_RNODE_$rule"
    /* $rule */
    ] = storeReadonlyfy(storeProxy([$ruleIf], () => this._rule = !!$ruleIf.get()));

    __subsAndSetChilds__(_thisRNode, storeProxy, storeSubscribe, $ruleIf);
  }

}

class RuleElseIf extends ReaseRule {
  __(_serviceRease, _thisRNode, _props) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $ruleIf = rnodeUtilsGetSystemProperty(store, _props, ':rule');
    var $ruleElse = store(false);

    __ruleElse__(_thisRNode, storeSubscribe, $ruleElse); // prettier-ignore


    var $ruleElseIf = this.$rule = _thisRNode["EH_RNODE_$rule"
    /* $rule */
    ] = storeReadonlyfy(storeProxy([$ruleElse, $ruleIf], a => this._rule = (a = $ruleElse.get()) ? !!a : null));

    __subsAndSetChilds__(_thisRNode, storeProxy, storeSubscribe, $ruleElseIf);
  }

}

class RuleElse extends ReaseRule {
  __(_serviceRease, _thisRNode) {
    var store = _serviceRease["EH_SERVICE_store"
    /* store */
    ];
    var storeProxy = _serviceRease["EH_SERVICE_storeProxy"
    /* storeProxy */
    ];
    var storeSubscribe = _serviceRease["EH_SERVICE_storeSubscribe"
    /* storeSubscribe */
    ];
    var $ruleElse = store(false);

    __ruleElse__(_thisRNode, storeSubscribe, $ruleElse);

    __subsAndSetChilds__(_thisRNode, storeProxy, storeSubscribe, $ruleElse);
  }

}

var reases = {
  ['commentNode']: ReaseComment,
  ['component']: ReaseComponent,
  ['element']: ReaseElement,
  ['fragment']: ReaseFragment,
  ['mixin']: ReaseMixin,
  // ['home']: ReaseRoot,
  ['rule']: ReaseRule,
  ['script']: ReaseScript,
  ['slot']: ReaseSlot,
  ['style']: ReaseStyle,
  ['textNode']: ReaseText,
  ['for']: RuleFor,
  ['for-in']: RuleForIn,
  ['for-of']: RuleForOf,
  ['if']: RuleIf,
  ['else-if']: RuleElseIf,
  ['else']: RuleElse,
  ['await']: RuleAwait,
  ['then']: RuleThen,
  ['catch']: RuleCatch
};

var __noop__ = () => {};

var __normalizeChildsDirty__ = _childs => {
  var res = _childs = _childs || [];

  if (!isFunction.isFunction(_childs)) {
    // prettier-ignore
    var childs = !_childs ? [] : !isArrayNotStore(_childs) ? [_childs] : _childs;

    res = () => childs;
  }

  return res;
};

var __createComponentTemplate__ = (_RNode, _serviceRease, _template) => {
  var storeProxyRease = _serviceRease["EH_SERVICE_storeProxy"
  /* storeProxy */
  ];

  var createTag = (_tagOrRease, _props, _childs) => [_tagOrRease, createProps(_props), _childs, _RNode];

  var createText = (_childs, _isCmt) => createTag(_isCmt ? 'commentNode' : 'textNode', 0, _childs);

  return _template(storeProxyRease, createTag, createText);
};

var __destroyRease__ = (_thisRease, _full) => {
  var _serviceRease = __(_thisRease);

  if (!_serviceRease["EH_SERVICE_destroyed"
  /* destroyed */
  ][0]) {
    _serviceRease["EH_SERVICE_destroyed"
    /* destroyed */
    ][0] = true; // prettier-ignore

    forEachLeft.forEachLeft(_serviceRease["EH_SERVICE_beforeDestroyList"
    /* beforeDestroyList */
    ], operate); // prettier-ignore

    forEachRight.forEachRight(_serviceRease["EH_SERVICE_readonly"
    /* readonly */
    ]["EH_SERVICE_children"
    /* children */
    ], rease => {
      __destroyRease__(rease, true);
    }); // prettier-ignore

    forEachLeft.forEachLeft(_serviceRease["EH_SERVICE_onDestroyList"
    /* onDestroyList */
    ], operate);

    _serviceRease["EH_SERVICE_destroy"
    /* destroy */
    ]();

    clear.clear(_serviceRease["EH_SERVICE_beforeCreateList"
    /* beforeCreateList */
    ]);
    clear.clear(_serviceRease["EH_SERVICE_onCreateList"
    /* onCreateList */
    ]);
    clear.clear(_serviceRease["EH_SERVICE_beforeMountList"
    /* beforeMountList */
    ]);
    clear.clear(_serviceRease["EH_SERVICE_onMountList"
    /* onMountList */
    ]);
    clear.clear(_serviceRease["EH_SERVICE_beforeDestroyList"
    /* beforeDestroyList */
    ]);
    clear.clear(_serviceRease["EH_SERVICE_onDestroyList"
    /* onDestroyList */
    ]); // console.log('__destroyRease__', _thisRease)

    if (_full) __destroyRNode__(_serviceRease["EH_SERVICE_rnode"
    /* rnode */
    ][0]);
  }
};

var __destroyRNode__ = _thisRNode => {
  if (!_thisRNode["EH_RNODE_destroyed"
  /* destroyed */
  ][0]) {
    _thisRNode["EH_RNODE_destroyed"
    /* destroyed */
    ][0] = true;

    __destroyRease__(_thisRNode["EH_RNODE_rease"
    /* rease */
    ]); // prettier-ignore


    forEachRight.forEachRight(_thisRNode["EH_RNODE_$children"
    /* $children */
    ].get(), v => {
      __destroyRNode__(v);
    });

    _thisRNode["EH_RNODE_destroy"
    /* destroy */
    ](); // console.log('__destroyRNode__', _thisRNode)

  }
};

class __RNode__ {
  constructor(_tagOrRease, _props, _childs, _homeRNode, _parentRNode) {
    var thisRNode = this;
    var [storeRNode, storeProxyRNode, storeDestroyRNode, storeSubscribeRNode, destroyRNode] = createStoresService();
    thisRNode["EH_RNODE_store"
    /* store */
    ] = storeRNode;
    thisRNode["EH_RNODE_storeProxy"
    /* storeProxy */
    ] = storeProxyRNode;
    thisRNode["EH_RNODE_storeDestroy"
    /* storeDestroy */
    ] = storeDestroyRNode;
    thisRNode["EH_RNODE_storeSubscribe"
    /* storeSubscribe */
    ] = storeSubscribeRNode;
    thisRNode["EH_RNODE_destroy"
    /* destroy */
    ] = destroyRNode;
    thisRNode["EH_RNODE_destroyed"
    /* destroyed */
    ] = [false];
    /* Set 'id' and create functions 'childIdExecute' and 'childIdZeroize' */

    var childId = 0;
    var childIdTemp = '';

    thisRNode["EH_RNODE_childIdExecute"
    /* childIdExecute */
    ] = () => (++childId < MAX_SAFE_INTEGER.MAX_SAFE_INTEGER || (childIdTemp += childId, childId = 1), thisRNode["EH_RNODE_id"
    /* id */
    ] + '-' + childIdTemp + childId);

    thisRNode["EH_RNODE_childIdZeroize"
    /* childIdZeroize */
    ] = () => {
      childId = 0, childIdTemp = '';
    };

    thisRNode["EH_RNODE_id"
    /* id */
    ] = _parentRNode ? _parentRNode["EH_RNODE_childIdExecute"
    /* childIdExecute */
    ]() : '0';
    /* --- */

    thisRNode["EH_RNODE_$node"
    /* $node */
    ] = storeRNode();
    thisRNode["EH_RNODE_home"
    /* home */
    ] = _homeRNode;
    thisRNode["EH_RNODE_parent"
    /* parent */
    ] = _parentRNode;
    thisRNode["EH_RNODE_$children"
    /* $children */
    ] = storeRNode([]);
    thisRNode["EH_RNODE_childs"
    /* childs */
    ] = __normalizeChildsDirty__(_childs);
    var props = thisRNode["EH_RNODE_props"
    /* props */
    ] = createProps(_props); // console.log(22, _tagOrRease, _props, thisRNode[EH_RNODE.childs])

    var destroyerRease = __noop__;
    var reaseClassOld;
    var serviceRease;
    thisRNode["EH_RNODE_$tagName"
    /* $tagName */
    ] = storeRNode('');
    thisRNode["EH_RNODE_$reaseClass"
    /* $reaseClass */
    ] = storeRNode();
    storeProxyRNode([_tagOrRease], () => {
      if (!thisRNode["EH_RNODE_destroyed"
      /* destroyed */
      ][0]) {
        var tagName = '';
        var tagOrRease = getStoreValue(_tagOrRease); // prettier-ignore

        var reaseClass = isString.isString(tagOrRease) ? (tagName = this._tagName = tagOrRease, hasOwnProperty.hasOwnProperty(reases, tagOrRease) ? reases[tagOrRease] : ReaseElement) : isRease(tagOrRease) ? getPrototypeOf.getPrototypeOf(tagOrRease) : tagOrRease;

        if (reaseClassOld === (reaseClassOld = reaseClass)) {
          thisRNode["EH_RNODE_$tagName"
          /* $tagName */
          ].set(tagName);
        } else {
          destroyerRease();
          thisRNode["EH_RNODE_$tagName"
          /* $tagName */
          ].set(tagName);
          this._class = reaseClass; // prettier-ignore

          var thisRease = thisRNode["EH_RNODE_rease"
          /* rease */
          ] = this._rease = new reaseClass();
          serviceRease = __(thisRease);
          serviceRease["EH_SERVICE_rnode"
          /* rnode */
          ][0] = thisRNode;
          forEachLeft.forEachLeft([[_homeRNode, "EH_SERVICE_$home"
          /* $home */
          , "EH_SERVICE_home"
          /* home */
          ], [_parentRNode, "EH_SERVICE_$parent"
          /* $parent */
          , "EH_SERVICE_parent"
          /* parent */
          ]], v => {
            if (v[0]) serviceRease[v[1]].set(serviceRease["EH_SERVICE_readonly"
            /* readonly */
            ][v[2]] = v[0]["EH_RNODE_rease"
            /* rease */
            ]);
          });
          var main = serviceRease["EH_SERVICE_main"
          /* main */
          ];

          if (instanceOf.instanceOf(thisRease, ReaseComponent)) {
            // resolve(() => {
            // prettier-ignore
            thisRNode["EH_RNODE_$children"
            /* $children */
            ].set(__createComponentTemplate__(thisRNode, serviceRease, main.call(thisRease)).map(v => new __RNode__(...v, thisRNode))); // })
          } else if (main) {
            // resolve(() => {
            main.call(thisRease, serviceRease, thisRNode, props); // })
          }

          thisRNode["EH_RNODE_$reaseClass"
          /* $reaseClass */
          ].set(reaseClass);
          rnodeUtilsSetRef(thisRease, props);

          destroyerRease = () => {
            destroyerRease = __noop__, __destroyRease__(thisRease);
          };
        }
      }
    });
    var mark = 0;
    var childrenOld = [];
    storeSubscribeRNode(thisRNode["EH_RNODE_$children"
    /* $children */
    ], children => {
      this._children = children;
      mark += mark > 9e9 ? -9e9 : 1;
      var reases = [];
      var needUpdate = childrenOld.length - children.length;
      forEachLeft.forEachLeft(children, rnode => {
        reases.push(rnode["EH_RNODE_rease"
        /* rease */
        ]), rnode["EH_RNODE_mark"
        /* mark */
        ] = mark;
      });
      forEachLeft.forEachLeft(childrenOld, rnode => {
        if (rnode["EH_RNODE_mark"
        /* mark */
        ] !== mark) __destroyRNode__(rnode), needUpdate = 1;
      });
      childrenOld = children;

      if (needUpdate) {
        var arr = serviceRease["EH_SERVICE_readonly"
        /* readonly */
        ]["EH_SERVICE_children"
        /* children */
        ];
        clear.clear(arr), arr.push(...reases);
        serviceRease["EH_SERVICE_$children"
        /* $children */
        ].update();
      }
    });
  }

}

var createReaseDOM = 12;
var createReaseSSR = 12;
/* eslint-disable camelcase */

var __createTree__ = (_tagOrRease, _props) => new __RNode__(_tagOrRease, _props, []);

var createTree = (_tagOrRease, _target, _props) => __createTree__(ReaseRoot, [[':tag', _tagOrRease], [':target', _target], [':props', _props]]);

Object.defineProperty(exports, 'Store', {
  enumerable: true,
  get: function () {
    return store$1.Store;
  }
});
Object.defineProperty(exports, 'isStore', {
  enumerable: true,
  get: function () {
    return store$1.isStore;
  }
});
Object.defineProperty(exports, 'storeModule', {
  enumerable: true,
  get: function () {
    return store$1.store;
  }
});
Object.defineProperty(exports, 'storeModuleDestroy', {
  enumerable: true,
  get: function () {
    return store$1.storeDestroy;
  }
});
Object.defineProperty(exports, 'storeModuleOnChange', {
  enumerable: true,
  get: function () {
    return store$1.storeOnChange;
  }
});
Object.defineProperty(exports, 'storeModuleOnDestroy', {
  enumerable: true,
  get: function () {
    return store$1.storeOnDestroy;
  }
});
Object.defineProperty(exports, 'storeModuleOnSubscribe', {
  enumerable: true,
  get: function () {
    return store$1.storeOnSubscribe;
  }
});
Object.defineProperty(exports, 'storeModuleOnUpdate', {
  enumerable: true,
  get: function () {
    return store$1.storeOnUpdate;
  }
});
Object.defineProperty(exports, 'storeModuleSubscribe', {
  enumerable: true,
  get: function () {
    return store$1.storeSubscribe;
  }
});
Object.defineProperty(exports, 'timeout', {
  enumerable: true,
  get: function () {
    return timeout.timeout;
  }
});
Object.defineProperty(exports, 'typed', {
  enumerable: true,
  get: function () {
    return typed.typed;
  }
});
Object.defineProperty(exports, 'typedOf', {
  enumerable: true,
  get: function () {
    return typed.typedOf;
  }
});
exports.RAwait = RuleAwait;
exports.RCatch = RuleCatch;
exports.RComment = ReaseComment;
exports.RComponent = ReaseComponent;
exports.RElement = ReaseElement;
exports.RElse = RuleElse;
exports.RElseIf = RuleElseIf;
exports.RFor = RuleFor;
exports.RForIn = RuleForIn;
exports.RForOf = RuleForOf;
exports.RFragment = ReaseFragment;
exports.RIf = RuleIf;
exports.RMixin = ReaseMixin;
exports.RRoot = ReaseRoot;
exports.RRule = ReaseRule;
exports.RScript = ReaseScript;
exports.RSlot = ReaseSlot;
exports.RStyle = ReaseStyle;
exports.RText = ReaseText;
exports.RThen = RuleThen;
exports.beforeCreate = beforeCreate;
exports.beforeDestroy = beforeDestroy;
exports.beforeMount = beforeMount;
exports.createReaseDOM = createReaseDOM;
exports.createReaseSSR = createReaseSSR;
exports.createTree = createTree;
exports.getProperty = getProperty;
exports.isArrayNotStore = isArrayNotStore;
exports.onCreate = onCreate;
exports.onDestroy = onDestroy;
exports.onMount = onMount;
exports.resolve = resolve;
exports.store = store;
exports.storeDestroy = storeDestroy;
exports.storeModuleProxy = storeModuleProxy;
exports.storeOnChange = storeOnChange;
exports.storeOnDestroy = storeOnDestroy;
exports.storeOnSubscribe = storeOnSubscribe;
exports.storeOnUpdate = storeOnUpdate;
exports.storeProxy = storeProxy;
exports.storeSubscribe = storeSubscribe;
