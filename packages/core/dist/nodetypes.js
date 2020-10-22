"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NODETYPES = exports.__Component__ = exports.__Directive__ = exports.__Template__ = exports.__Slot__ = exports.__Script__ = exports.__Style__ = exports.__Doctype__ = exports.__Element__ = exports.__ROOT__ = exports.__ElementNode__ = exports.__Comment__ = exports.__CDATA__ = exports.__Text__ = exports.__TextNode__ = exports.__NODE__ = exports.__CHILDREN__ = exports.__Array__ = void 0;

function _waresetUtilites() {
  const data = require("wareset-utilites");

  _waresetUtilites = function () {
    return data;
  };

  return data;
}

var _constants = require("./constants.js");

class __Array__ extends Array {
  constructor(...a) {
    super();
    if (a.length) this.push(...a);
  }

}

exports.__Array__ = __Array__;

class __CHILDREN__ extends __Array__ {
  constructor(...a) {
    super(...a);
  }

}

exports.__CHILDREN__ = __CHILDREN__;

class __NODE__ extends __Array__ {
  constructor(...a) {
    super(...a);
    const define = (0, _waresetUtilites().setOwnProps)(this);
    define({
      parent: {
        enumerable: 0,
        set: value => define({
          parent: {
            enumerable: 0,
            writable: 0,
            value
          }
        })
      }
    });
  }

}

exports.__NODE__ = __NODE__;

class __TextNode__ extends __NODE__ {
  constructor(wholeText) {
    super(), this.wholeText = wholeText;
  }

}

exports.__TextNode__ = __TextNode__;

class __Text__ extends __TextNode__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_TEXT;
  }

}

exports.__Text__ = __Text__;

class __CDATA__ extends __TextNode__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_CDATA;
  }

}

exports.__CDATA__ = __CDATA__;

class __Comment__ extends __TextNode__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_COMMENT;
  }

}

exports.__Comment__ = __Comment__;

class __ElementNode__ extends __NODE__ {
  constructor(...a) {
    super(...a);
    const define = (0, _waresetUtilites().setOwnProps)(this);
    const children = new __CHILDREN__();
    define({
      children: {
        enumerable: 0,
        writable: 0,
        value: children
      }
    });
  }

}

exports.__ElementNode__ = __ElementNode__;

class __ROOT__ extends __ElementNode__ {}

exports.__ROOT__ = __ROOT__;

class __Element__ extends __ElementNode__ {
  constructor(...a) {
    super(...a), this.tagName = undefined;
    this.tagOpener = undefined, this.tagCloser = undefined;
    const define = (0, _waresetUtilites().setOwnProps)(this);
    define({
      wholeText: {
        enumerable: 0,
        set: value => this.children.push(new __Text__(value))
      }
    });
  }

}

exports.__Element__ = __Element__;

class __Doctype__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_DOCTYPE;
  }

}

exports.__Doctype__ = __Doctype__;

class __Style__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_STYLE;
  }

}

exports.__Style__ = __Style__;

class __Script__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_SCRIPT;
  }

}

exports.__Script__ = __Script__;

class __Slot__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_SLOT;
  }

}

exports.__Slot__ = __Slot__;

class __Template__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_TEMPLATE;
  }

}

exports.__Template__ = __Template__;

class __Directive__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_DIRECTIVE;
  }

}

exports.__Directive__ = __Directive__;

class __Component__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = _constants.TAGNAME_COMPONENT;
  }

}

exports.__Component__ = __Component__;
const NODETYPES = {
  [_constants.TAGNAME_ROOT]: __ROOT__,
  [_constants.TAGNAME_TEXT]: __Text__,
  [_constants.TAGNAME_CDATA]: __CDATA__,
  [_constants.TAGNAME_COMMENT]: __Comment__,
  [_constants.TAGNAME_ELEMENT]: __Element__,
  [_constants.TAGNAME_DOCTYPE]: __Doctype__,
  [_constants.TAGNAME_STYLE]: __Style__,
  [_constants.TAGNAME_SCRIPT]: __Script__,
  [_constants.TAGNAME_SLOT]: __Slot__,
  [_constants.TAGNAME_CHILDREN]: __CHILDREN__,
  [_constants.TAGNAME_TEMPLATE]: __Template__,
  [_constants.TAGNAME_DIRECTIVE]: __Directive__,
  [_constants.TAGNAME_COMPONENT]: __Component__
};
exports.NODETYPES = NODETYPES;