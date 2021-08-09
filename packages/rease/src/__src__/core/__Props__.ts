// import { hasOwnProperty } from '@wareset-utilites/object/hasOwnProperty'
import { forEachLeft } from '@wareset-utilites/array/forEachLeft'
import { instanceOf } from '@wareset-utilites/lang/instanceOf'
import { isArray } from '@wareset-utilites/is/isArray'
// import { throwError } from '@wareset-utilites/error'

// import { keys } from '@wareset-utilites/object/keys'

// import { TypeStoreFunction } from '.'
import { EH_PROPS } from '.'
import { getStoreValue } from '.'

// import { UNDEFINED } from './lib/constants'

export declare type TypePropsFlags = { [key: string]: boolean }
export declare type TypePropsSystem = { [key: string]: any[][] }
export declare type TypePropsDefault = { [key: string]: any }
export declare type TypeProps = __Props__
export class __Props__ {
  readonly [EH_PROPS.flags]: TypePropsFlags = {};
  readonly [EH_PROPS.system]: TypePropsSystem = {};
  readonly [EH_PROPS.default]: TypePropsDefault = {}

  constructor(_props?: any) {
    if ((_props = getStoreValue(_props))) {
      // console.log(1, propsDirty)
      // console.log(2, this)

      const self: any = this
      if (isArray(_props)) {
        forEachLeft(
          _props, // isArray(propsDirty[0]) ? propsDirty : [propsDirty],
          (_data) => {
            const [k, ...v] = _data
            if (k[0] === ':')
              (
                self[EH_PROPS.system][k] || (self[EH_PROPS.system][k] = [])
              ).push(v)
            else if (k[0] === '-' && k[1] === '-')
              self[EH_PROPS.flags][k] = !!v[0]
            else {
              if (k in self[EH_PROPS.default])
                console.error('Dublicate property ' + k)
              self[EH_PROPS.default][k] = v[0]
            }
          }
        )
      } else {
        // eslint-disable-next-line guard-for-in
        for (const k in _props) {
          if (k[0] === ':') self[EH_PROPS.system][k] = [[_props[k]]]
          else if (k[0] === '-' && k[1] === '-')
            self[EH_PROPS.flags][k] = !!_props[k]
          else self[EH_PROPS.default][k] = _props[k]
        }
      }
    }
  }
}

export const createProps = (_props?: any): TypeProps =>
  instanceOf(_props, __Props__) ? _props : new __Props__(_props)
