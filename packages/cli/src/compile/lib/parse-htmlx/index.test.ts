import parseHTMLX from './index'

test('compile/lib/parsers', () => {
  expect(parseHTMLX('text')).toBe('"text"')
  expect(parseHTMLX('text``s')).toBe('"text``s"')
  expect(parseHTMLX("text''s")).toBe('"text\'\'s"')
  expect(parseHTMLX('text""s')).toBe('"text\\"\\"s"')

  expect(parseHTMLX('text`s and {2 > 1 ? `asd` : ``}')).toBe(
    '"text`s and " + (2 > 1 ? `asd` : ``)'
  )
  expect(parseHTMLX('text`s and ${2 > 1 ? `{asd}` : ``}')).toBe(
    '"text`s and $" + (2 > 1 ? `{asd}` : ``)'
  )
  expect(parseHTMLX('text`s and \\{2 > 1 ? `{asd}` : ``\\}')).toBe(
    '"text`s and {2 > 1 ? `" + asd + "` : ``}"'
  )

  expect(parseHTMLX('{"text`s"}')).toBe('"text`s"')
  expect(parseHTMLX('{"text`s"} ')).toBe('"" + "text`s" + " "')
  expect(parseHTMLX('{/\\d+[{]/.test(12)}')).toBe('/\\d+[{]/.test(12)')

  expect(parseHTMLX('{text}')).toBe('text')
  expect(parseHTMLX('{text  ||  \n 1}')).toBe('text || 1')
})
