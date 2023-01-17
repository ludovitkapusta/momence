import React from 'react'
import { render, waitFor } from '@testing-library/react'
import 'jest-styled-components'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../themes/defaultTheme'
import { Form, Formik } from 'formik'
import Select from '../Select'
import Button from '../../Button'

const currencyOptions = [
  {
    label: 'first',
    value: 'first'
  }
]

test('should render select', async () => {
  const handleSubmit = jest.fn()

  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ select: '' }} onSubmit={(values) => handleSubmit(values)}>
        <Form>
          <Select name="select" label="select" options={currencyOptions} />
          <Button type="submit">Convert</Button>
        </Form>
      </Formik>
    </ThemeProvider>
  )

  const user = userEvent.setup()
  await user.selectOptions(getByTestId('select-select'), 'first')
  await user.click(getByTestId('button'))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      select: 'first'
    })
  )
})
