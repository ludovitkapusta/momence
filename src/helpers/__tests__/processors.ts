import { createArrayOfTableRows, createArraysByLines, createTableHeaders } from '../processors'

const arrayOfArrays = [
  ['a', 'b', 'c', 'a', 'b'],
  ['d', 'e', 'f', 'd', 'e']
]

test('splits array of piped strings by pipes and pit them to array of string arrays', () => {
  expect(createArraysByLines(['a|b|c|a|b', 'd|e|f|d|e'])).toStrictEqual(arrayOfArrays)
})

test('creates table head', () => {
  expect(createTableHeaders(['A', 'b', ''])).toStrictEqual([
    {
      dataIndex: 'A',
      key: 'a',
      title: 'A'
    },
    {
      dataIndex: 'b',
      key: 'b',
      title: 'b'
    },
    {
      dataIndex: '',
      key: '',
      title: ''
    }
  ])
})

test('creates table body', () => {
  expect(createArrayOfTableRows(arrayOfArrays)).toStrictEqual([
    {
      id: 'a',
      country: 'a',
      currency: 'b',
      amount: 'c',
      code: 'a',
      rate: 'b'
    },
    {
      id: 'd',
      country: 'd',
      currency: 'e',
      amount: 'f',
      code: 'd',
      rate: 'e'
    }
  ])
})
