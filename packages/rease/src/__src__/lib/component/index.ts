import { TypeRease, TypeRease$Refs } from '../../core'
import { __, EH_SERVICE } from '../../core'

export const getComponent$Refs = (rease: TypeRease): TypeRease$Refs =>
  __(rease)[EH_SERVICE.$refs]
