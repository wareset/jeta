export const TAGNAME_ROOT = 'root'; // 0

export const TAGNAME_TEXT = 'text'; // 3

export const TAGNAME_CDATA = 'cdata'; // 4

export const TAGNAME_COMMENT = 'comment'; // 8

export const TAGNAME_ELEMENT = 'element';
export const TAGNAME_DOCTYPE = '!doctype';
export const TAGNAME_STYLE = 'style';
export const TAGNAME_SCRIPT = 'script';
export const TAGNAME_SLOT = 'slot';
export const TAGNAME_CHILDREN = 'children';
export const TAGNAME_TEMPLATE = 'template';
export const TAGNAME_DIRECTIVE = 'directive';
export const TAGNAME_COMPONENT = 'component';
export const SIGN_LESS = '<';
export const SIGN_MORE = '>';
export const SIGN_SLASH = '/';
export const SIGN_LESS_SLASH = SIGN_LESS + SIGN_SLASH; // '</'

export const SIGN_SLASH_MORE = SIGN_SLASH + SIGN_MORE; // '/>'

export const SIGN_LESS_SLASH_MORE = SIGN_LESS + SIGN_SLASH + SIGN_MORE; // '</>'

export const TAG_OPENER_CDATA = SIGN_LESS + '![CDATA['; // '<![CDATA['

export const TAG_CLOSER_CDATA = ']]' + SIGN_MORE; // ']]>'

export const TAG_OPENER_COMMENT = SIGN_LESS + '!--'; // '<!--'

export const TAG_CLOSER_COMMENT = '--' + SIGN_MORE; // '-->'