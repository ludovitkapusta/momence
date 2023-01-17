import React from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CurrencyConvertor from '../CurrencyConvertor'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../themes/defaultTheme'

const currencyOption = [
  {
    label: 'EMU - EUR',
    value: '24|1|EUR'
  }
]

beforeEach(() => {
  cleanup()
})

test('should results to correct converted currency', async () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <CurrencyConvertor currencyOptions={currencyOption} />
    </ThemeProvider>
  )
  const user = userEvent.setup()

  await user.type(getByTestId('input-czkAmount'), '1000')
  await user.selectOptions(getByTestId('select-currencyAndAmount'), '24|1|EUR')

  await user.click(getByTestId('button'))

  const result = await getByTestId('result').textContent
  expect(result).toBe('41.67 EUR')
})

test('should give two errors', async () => {
  const { getByTestId, getAllByText } = render(
    <ThemeProvider theme={theme}>
      <CurrencyConvertor currencyOptions={currencyOption} />
    </ThemeProvider>
  )
  const user = userEvent.setup()

  const button = getByTestId('button')
  await user.click(button)

  await waitFor(() => {
    const findRequired = getAllByText(/Required/)
    expect(findRequired).toHaveLength(2)
  })
})
