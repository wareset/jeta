import { hash, trim } from 'wareset-utilites'
import { isFirstNum } from './utils'

function __CID__(content = '', cid = ''): string {
  if (cid) {
    if (cid.indexOf('=') > -1) cid = cid.split('=')[1]
    cid = trim(cid.replace(/[^\w-]/g, ''), '\\W')
  }
  cid = cid || 'r' + hash(String(content || Math.random()))
  if (isFirstNum(cid)) cid = 'r' + cid

  return cid
}

export function getCIDArr(
  content = '',
  type: 'class' | string | null = null,
  cid = ''
): Array<string | boolean> {
  cid = __CID__(content, cid)
  if (type === 'class') return ['class', cid]
  else if (type) return [`data-${type.replace(/data-/i, '').trim()}`, cid]
  else return [cid, true]
}

export default function getCID(
  content = '',
  type: 'class' | string | null = null,
  cid = ''
): string {
  cid = __CID__(content, cid)

  if (type === 'class') cid = '.' + cid
  else if (type) cid = `[data-${type.replace(/data-/i, '').trim()}=${cid}]`
  else cid = `[${cid}]`

  return cid
}
