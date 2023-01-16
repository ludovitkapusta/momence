import { expect, test } from '@jest/globals'
import { getHeaders, filterCurrencyList, splitByLines, splitByPipes } from '../parsers'

const text = `lines|pipes
line1|pipe1
line2|pipe2
`

test('splits text input by lines', () => {
  expect(splitByLines(text)).toStrictEqual(['lines|pipes', 'line1|pipe1', 'line2|pipe2', ''])
})

test('splits text by pipes', () => {
  expect(splitByPipes('lines|pipes')).toStrictEqual(['lines', 'pipes'])
})

test('gets second line from text input', () => {
  expect(getHeaders(text)).toBe('line1|pipe1')
})

test('removes first and last item from array', () => {
  expect(filterCurrencyList(splitByLines(text))).toStrictEqual(['line2|pipe2'])
})
