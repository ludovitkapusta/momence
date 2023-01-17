import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Formik, Form, FormikValues } from 'formik'
import { isEmpty } from 'lodash'

import Input from './common/form/Input'
import Button from './common/Button'
import Select from './common/form/Select'
import { splitByPipes } from '../helpers/parsers'

interface CurrencyConvertorProps {
  currencyOptions: {
    label: string
    value: string
  }[]
}

type ConvertedAmount =
  | {
      result: number
      czkAmount: number
      selectedCurrency: string
    }
  | Record<string, never>

const CurrencyConvertor = ({ currencyOptions }: CurrencyConvertorProps) => {
  const [convertedAmount, setConvertedAmount] = useState<ConvertedAmount>({})

  const handleSubmit = useCallback(async (values: FormikValues) => {
    const { czkAmount, currencyAndAmount } = values
    const [rate, amount, selectedCurrency] = splitByPipes(currencyAndAmount)
    const absCzkAmount = Math.abs(parseFloat(czkAmount))

    setConvertedAmount({
      result: Math.round((absCzkAmount / parseFloat(rate)) * parseFloat(amount) * 100) / 100,
      czkAmount: absCzkAmount,
      selectedCurrency
    })
  }, [])

  const validate = useCallback((values: FormikValues) => {
    let errors: FormikValues = {}

    if (!values.czkAmount) {
      errors.czkAmount = 'Required'
    }
    if (!values.currencyAndAmount) {
      errors.currencyAndAmount = 'Required'
    }

    return errors
  }, [])

  const handleChange = useCallback(() => {
    setConvertedAmount({})
  }, [])

  return (
    <Formik initialValues={{ czkAmount: '', currencyAndAmount: '' }} onSubmit={handleSubmit} validate={validate}>
      {({ errors }) => (
        <StyledForm onChange={handleChange}>
          <Input name="czkAmount" label="Amount in CZK" required={true} type="number" />
          <Select name="currencyAndAmount" label="Select Currency" required={true} options={currencyOptions} />
          <StyledButton type="submit">Convert</StyledButton>

          {!isEmpty(convertedAmount) && isEmpty(errors) && (
            <StyledConvertedResultWrapper>
              <StyledCzkAmount>{convertedAmount.czkAmount} CZK =</StyledCzkAmount>
              <p data-testid="result">
                {convertedAmount.result} {convertedAmount.selectedCurrency}
              </p>
            </StyledConvertedResultWrapper>
          )}
        </StyledForm>
      )}
    </Formik>
  )
}

export default CurrencyConvertor

const StyledForm = styled(Form)`
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
`

const StyledButton = styled(Button)`
  grid-column-end: 3;
  grid-column-start: 1;
`

const StyledConvertedResultWrapper = styled.div`
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.main};
  font-size: 1.5rem;
  grid-column-end: 3;
  grid-column-start: 1;
  padding: 10px;
  margin-bottom: 20px;
`

const StyledCzkAmount = styled.p`
  font-size: 0.8rem;
  margin-bottom: 5px;
`
