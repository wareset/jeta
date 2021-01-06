import compile from '../compile'
import * as __langs__ from './langs'
import { IOptionsStart, IResult, OPTIONS } from '../compile'

export default function nodeCompile(
  content = '',
  optionsStart: IOptionsStart = OPTIONS
): IResult {
  return compile(content, { ...optionsStart, __langs__ })
}
