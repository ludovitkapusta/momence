import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Formik, Form, FormikValues } from 'formik'

import { fetchTXTData } from '../service/api'
import { Urls } from '../@types/enums'
import Table from './Table'
import Input from './form/Input'
import Button from './Button'
import Select from './form/Select'
import { flow, isEmpty } from 'lodash'
import { getFirstLine, removeFirstAndLastLine, splitByLines, splitByPipes } from '../helpers/parsers'
import { TableBodyType, TableHeadType, TableRowsType } from '../@types'
import { createArraysByLines, createArrayOfTableRows, createTableHeaders } from '../helpers/processors'

const CurrencyConvertor = () => {
  const [convertedAmount, setConvertedAmount] = useState<
    | {
        result: number
        czkAmount: number
        selectedCurrency: string
      }
    | Record<string, never>
  >({})

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchTXTData(Urls.CNB_DAILY_EXCHANGE_RATES)
  })

  const tableData = useMemo(() => {
    if (data) {
      const body: TableBodyType = flow([
        splitByLines,
        removeFirstAndLastLine,
        createArraysByLines,
        createArrayOfTableRows
      ])(data as string)
      const header: TableHeadType[] = flow([getFirstLine, splitByPipes, createTableHeaders])(data as string)

      return { header, body }
    }
  }, [data])

  const handleSubmit = useCallback(async (values: FormikValues) => {
    const { czkAmount, currencyAndAmount } = values
    const [rate, amount, selectedCurrency] = currencyAndAmount.split(/\|/)

    setConvertedAmount({
      result: Math.round((parseFloat(czkAmount) / parseFloat(rate)) * parseFloat(amount) * 100) / 100,
      czkAmount,
      selectedCurrency
    })
  }, [])

  const selectOptions = useMemo(
    () =>
      tableData
        ? tableData.body.map(({ country, code, rate, amount }: TableRowsType) => ({
            label: `${country} - ${code}`,
            value: `${rate}|${amount}|${code}`
          }))
        : [],
    [tableData]
  )

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

  if (isLoading) return <>'Loading...'</>
  if (error) return <>There was an error</>

  return (
    <StyledCurrencyConvertor>
      <h1>Currency convertor</h1>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <Formik initialValues={{ czkAmount: '', currencyAndAmount: '' }} onSubmit={handleSubmit} validate={validate}>
        {({ errors }) => (
          <StyledForm onChange={handleChange}>
            <Input name="czkAmount" label="Amount in CZK" required={true} type="number" errors={errors} />
            <Select
              name="currencyAndAmount"
              label="Select Currency"
              required={true}
              options={selectOptions}
              errors={errors}
            />
            <StyledButton type="submit">Convert</StyledButton>

            {!isEmpty(convertedAmount) && isEmpty(errors) && (
              <StyledConvertedResultWrapper>
                <StyledCzkAmount>{convertedAmount.czkAmount} CZK =</StyledCzkAmount>
                <p>
                  {convertedAmount.result} {convertedAmount.selectedCurrency}
                </p>
              </StyledConvertedResultWrapper>
            )}
          </StyledForm>
        )}
      </Formik>

      <StyledTableWrapper>
        <Table columns={tableData.header} data={tableData.body} />
      </StyledTableWrapper>
    </StyledCurrencyConvertor>
  )
}

export default CurrencyConvertor

const StyledCurrencyConvertor = styled.div`
  margin: 0 auto;
  width: 480px;
  padding: 0 10px;
`

const StyledTableWrapper = styled.div`
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 10px;
`

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
