import { tokenize } from 'rastree/lib'
import { INodeTokenize, IOptionsTokenize } from '@rastree/lib/dist/__types__'
export { INodeTokenize, IOptionsTokenize }

// eslint-disable-next-line no-redeclare
function pullImports(content: INodeTokenize[]): INodeTokenize[]
// eslint-disable-next-line no-redeclare
function pullImports(content: string): { imports: string; scripts: string }
// eslint-disable-next-line no-redeclare
function pullImports(
  content: string | INodeTokenize[]
): INodeTokenize[] | { imports: string; scripts: string } {
  let i, token, tokenNext, tokenLast, isEndImport

  const tokens = typeof content === 'string' ? tokenize(content) : content

  i = -1
  while (++i < tokens.length) {
    token = tokens[i]

    if (isEndImport) {
      if (!token.raw.trim() || !(isEndImport = !(token.raw === ';'))) {
        ;(tokenLast = tokens[i - 1]), tokens.splice(i, 1), --i
        ;(tokenLast.raw += token.raw), (tokenLast.end = token.end)
        continue
      }
    }

    isEndImport = false
    if (token.raw === 'import') {
      do {
        ;(tokenNext = tokens[i + 1]), tokens.splice(i + 1, 1)
        ;(token.raw += tokenNext.raw), (token.end = tokenNext.end)
      } while (!/['"`]/.test(tokenNext.raw) && tokens.length)
      isEndImport = true
    }
  }

  if (tokens === content) return tokens

  const imports: INodeTokenize[] = []
  const scripts: INodeTokenize[] = []

  i = -1
  while (++i < tokens.length) {
    ;(/^import/.test(tokens[i].raw) ? imports : scripts).push(tokens[i])
  }

  return {
    imports: imports.map((v) => v.raw.trim()).join('\n') + '\n',
    scripts: scripts.map((v) => v.raw).join('')
  }
}

export default pullImports
