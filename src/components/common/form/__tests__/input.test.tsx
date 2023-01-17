import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from 'styled-components'

import Input from '../Input'
import { theme } from '../../../../themes/defaultTheme'
import { Form, Formik } from 'formik'

test('should render input', async () => {
  const handleSubmit = () => {}
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ input: '' }} onSubmit={handleSubmit}>
        <Form>
          <Input name="input" label="Input" type="text" />
        </Form>
      </Formik>
    </ThemeProvider>
  )

  const user = userEvent.setup()
  await user.type(getByTestId('input-input'), '1000')

  const inputElementText = await getByTestId('input-input').getAttribute('value')
  expect(inputElementText).toBe('1000')
})
