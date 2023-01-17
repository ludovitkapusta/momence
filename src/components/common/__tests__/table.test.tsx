import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'

import { ThemeProvider } from 'styled-components'
import { theme } from '../../../themes/defaultTheme'
import Table from '../Table'

const buttonText = 'Test text'

const columns = [
  {
    dataIndex: 'country',
    key: 'country',
    title: 'country'
  },
  {
    dataIndex: 'currency',
    key: 'currency',
    title: 'currency'
  },
  {
    dataIndex: 'amount',
    key: 'amount',
    title: 'amount'
  },
  {
    dataIndex: 'code',
    key: 'code',
    title: 'code'
  },
  {
    dataIndex: 'rate',
    key: 'rate',
    title: 'rate'
  }
]

const data = [
  {
    id: 'a',
    country: 'a',
    currency: 'b',
    amount: 'c',
    code: 'a',
    rate: 'b'
  }
]

test('should render table', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Table columns={columns} data={data}></Table>
    </ThemeProvider>
  )
  const tableElement = getByTestId('table').textContent
  expect(tableElement).toBe('countrycurrencyamountcoderateabcab')
})

test('should render table head', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Table columns={columns} data={data}></Table>
    </ThemeProvider>
  )
  const tableElement = getByTestId('table-head').textContent
  expect(tableElement).toBe('countrycurrencyamountcoderate')
})

test('should render table body', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Table columns={columns} data={data}></Table>
    </ThemeProvider>
  )
  const tableElement = getByTestId('table-body').textContent
  expect(tableElement).toBe('abcab')
})
