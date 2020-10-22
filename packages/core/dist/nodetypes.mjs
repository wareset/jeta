import { setOwnProps } from 'wareset-utilites';
import { TAGNAME_ROOT, TAGNAME_TEXT, TAGNAME_CDATA, TAGNAME_COMMENT, TAGNAME_ELEMENT, TAGNAME_DOCTYPE, TAGNAME_STYLE, TAGNAME_SCRIPT, TAGNAME_SLOT, TAGNAME_CHILDREN, TAGNAME_TEMPLATE, TAGNAME_DIRECTIVE, TAGNAME_COMPONENT } from './constants.mjs';
export class __Array__ extends Array {
  constructor(...a) {
    super();
    if (a.length) this.push(...a);
  }

}
export class __CHILDREN__ extends __Array__ {
  constructor(...a) {
    super(...a);
  }

}
export class __NODE__ extends __Array__ {
  constructor(...a) {
    super(...a);
    const define = setOwnProps(this);
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
export class __TextNode__ extends __NODE__ {
  constructor(wholeText) {
    super(), this.wholeText = wholeText;
  }

}
export class __Text__ extends __TextNode__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_TEXT;
  }

}
export class __CDATA__ extends __TextNode__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_CDATA;
  }

}
export class __Comment__ extends __TextNode__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_COMMENT;
  }

}
export class __ElementNode__ extends __NODE__ {
  constructor(...a) {
    super(...a);
    const define = setOwnProps(this);
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
export class __ROOT__ extends __ElementNode__ {}
export class __Element__ extends __ElementNode__ {
  constructor(...a) {
    super(...a), this.tagName = undefined;
    this.tagOpener = undefined, this.tagCloser = undefined;
    const define = setOwnProps(this);
    define({
      wholeText: {
        enumerable: 0,
        set: value => this.children.push(new __Text__(value))
      }
    });
  }

}
export class __Doctype__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_DOCTYPE;
  }

}
export class __Style__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_STYLE;
  }

}
export class __Script__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_SCRIPT;
  }

}
export class __Slot__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_SLOT;
  }

}
export class __Template__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_TEMPLATE;
  }

}
export class __Directive__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_DIRECTIVE;
  }

}
export class __Component__ extends __Element__ {
  constructor(...a) {
    super(...a), this.tagName = TAGNAME_COMPONENT;
  }

}
export const NODETYPES = {
  [TAGNAME_ROOT]: __ROOT__,
  [TAGNAME_TEXT]: __Text__,
  [TAGNAME_CDATA]: __CDATA__,
  [TAGNAME_COMMENT]: __Comment__,
  [TAGNAME_ELEMENT]: __Element__,
  [TAGNAME_DOCTYPE]: __Doctype__,
  [TAGNAME_STYLE]: __Style__,
  [TAGNAME_SCRIPT]: __Script__,
  [TAGNAME_SLOT]: __Slot__,
  [TAGNAME_CHILDREN]: __CHILDREN__,
  [TAGNAME_TEMPLATE]: __Template__,
  [TAGNAME_DIRECTIVE]: __Directive__,
  [TAGNAME_COMPONENT]: __Component__
};