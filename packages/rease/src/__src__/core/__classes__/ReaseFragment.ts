import { __Rease__, __RNode__ } from '..'

import { EH_SERVICE } from '..'
import { rnodeUtilsSetChildrens } from '..'
import { TypeServiceRease, TypeRNode } from '..'

/*
ReaseFragment
*/
export type TypeReaseElement = ReaseFragment
export class ReaseFragment extends __Rease__ {
  __(_serviceRease: TypeServiceRease, _thisRNode: TypeRNode): void {
    rnodeUtilsSetChildrens(
      true,
      _thisRNode,
      _serviceRease[EH_SERVICE.storeProxy]
    )
  }
}
