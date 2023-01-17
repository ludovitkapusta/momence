import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import 'jest-styled-components'

import Button from '../Button'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../themes/defaultTheme'

const buttonText = 'Test text'

test('should render button', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Button type="button">{buttonText}</Button>
    </ThemeProvider>
  )
  const buttonElementText = getByTestId('button').textContent
  expect(buttonElementText).toBe(buttonText)
})

test('should render disabled button', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Button type="button" disabled>
        {buttonText}
      </Button>
    </ThemeProvider>
  )
  const buttonElementText = getByTestId('button')
  expect(buttonElementText).toHaveProperty('disabled')
})
