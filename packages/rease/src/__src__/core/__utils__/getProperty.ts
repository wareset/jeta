import { hasOwnProperty } from '@wareset-utilites/object/hasOwnProperty'
import { forEachLeft } from '@wareset-utilites/array/forEachLeft'
import { isFunction } from '@wareset-utilites/is/isFunction'
import { includes } from '@wareset-utilites/array/includes'
import { isObject } from '@wareset-utilites/is/isObject'
import { isString } from '@wareset-utilites/is/isString'
import { isArray } from '@wareset-utilites/is/isArray'
import { keys } from '@wareset-utilites/object/keys'
// import { last } from '@wareset-utilites/array/last'
import { throwError } from '@wareset-utilites/error'

import { typed, typedOf } from '@wareset-utilites/typed'
import { storefy, isStore } from '..'

import { TypeRease, TypePropsDefault } from '..'
import { EH_SERVICE, EH_RNODE, EH_PROPS } from '..'
import { __, getStoreValue, isArrayNotStore } from '..'

const VALUE = 'value'
const STORE = 'store'
const TYPED = 'typed'
const TYPEDOF = (TYPED + 'Of') as 'typedOf'
const STOREFY = (STORE + 'fy') as 'storefy'
const REQUIRED = 'required'

type TypePropFunction = new (...a: any[]) => any
type PropOptions = {
  name?: string
  value?: any | any[]
  store?: boolean
  typed?: TypePropFunction | TypePropFunction[]
  typedOf?: TypePropFunction | TypePropFunction[]
  default?: any
  storefy?: boolean
  required?: boolean
}

const __getPropertyDirty__ = (rease: TypeRease): TypePropsDefault =>
  __(rease)[EH_SERVICE.rnode][0]![EH_RNODE.props][EH_PROPS.default]

const __arrayfy__ = <T>(v: T[] | T): T[] =>
  (isArrayNotStore(v) ? v : [v]) as T[]

// prettier-ignore
const __normalizePropertyOptions__ = (options: any): PropOptions => !options
  ? {}
  : isArray(options = isFunction(options) ? [options] : options)
    ? { [TYPED]: options }
    : isObject(options) ? options : { [REQUIRED]: true }

// export const getPropertyList = (rease: TypeRease): string[] =>
//   keys(__getPropertyDirty__(rease))

export const getProperty: // prettier-ignore
{
  (rease: TypeRease): TypePropsDefault

  (rease: TypeRease, prop:
    string | PropOptions,
    options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
    [any]

  (rease: TypeRease, props:
    (string | PropOptions)[],
    options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
    any[]
  (rease: TypeRease, props:
    [string | PropOptions],
    options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
    [any]
  (rease: TypeRease, props:
    [string | PropOptions, string | PropOptions],
    options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
    [any, any]
  (rease: TypeRease, props:
    [string | PropOptions, string | PropOptions, string | PropOptions],
    options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
    [any, any, any]
  (rease: TypeRease, props:
    [string | PropOptions, string | PropOptions, string | PropOptions,
      string | PropOptions],
      options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
      [any, any, any, any]
  (rease: TypeRease, props:
    [string | PropOptions, string | PropOptions, string | PropOptions,
      string | PropOptions, string | PropOptions],
      options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
      [any, any, any, any, any]
  (rease: TypeRease, props:
    [string | PropOptions, string | PropOptions, string | PropOptions,
      string | PropOptions, string | PropOptions, string | PropOptions],
      options?: boolean | TypePropFunction | TypePropFunction[] | PropOptions):
      [any, any, any, any, any, any]

  (
    rease: TypeRease,
    validateProps: {
      [key: string]: TypePropFunction | TypePropFunction[] | PropOptions
    }
  ): { [key: string]: any }
} = (
  _rease: any,
  _props?: any,
  _options?: any
): any => {
  const properties = __getPropertyDirty__(_rease)
  let res: any = properties

  if (_props) {
    const propKeys = keys(
      isObject((_props = getStoreValue(_props))) ? _props : [_props]
    )
    const isObjRes = isObject(_props) && !isArray(_props)
    res = isObjRes ? {} : []

    // prettier-ignore
    const optionsGlobal = __normalizePropertyOptions__(_options)

    forEachLeft(propKeys, (_k: string) => {
      const prop = _props[_k]
      const isObj = isObject(prop)
      const name = isObj ? prop.name || _k : prop

      const options = isString(prop)
        ? optionsGlobal
        : __normalizePropertyOptions__(prop)

      let isset: any
      const property = (isset = hasOwnProperty(properties, name))
        ? properties[name]
        : options.default
      const propertyValue = getStoreValue(property)

      let tmp: any
      if (options[REQUIRED] && !isset) {
        throwError(name + ' is ' + REQUIRED)
      }

      if (
        hasOwnProperty(options, VALUE) &&
        !includes((tmp = __arrayfy__(options[VALUE])), propertyValue)
      ) {
        throwError(name + ' is not ' + VALUE + ': ' + tmp)
      }

      if (
        hasOwnProperty(options, STORE) &&
        !options[STORE] === (tmp = isStore(property))
      ) {
        throwError(name + ' is ' + STORE + ' must by ' + !tmp)
      }

      if (
        (hasOwnProperty(options, TYPED) &&
          !typed(propertyValue, ...(tmp = __arrayfy__(options[TYPED])))) ||
        (hasOwnProperty(options, TYPEDOF) &&
          !typedOf(propertyValue, ...(tmp = __arrayfy__(options[TYPEDOF]))))
      ) {
        throwError(
          name + ' is not ' + TYPED + ': ' + tmp.map((v: any) => v.name)
        )
      }

      // prettier-ignore
      const propertyFinal = hasOwnProperty(options, STOREFY)
        ? options[STOREFY] ? storefy(_rease)(property) : propertyValue
        : property

      // console.log(111, name, propertyValue, options)
      isObjRes ? (res[_k] = propertyFinal) : res.push(propertyFinal)
    })
  }
  return res
}
