import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { flow } from 'lodash'

import { fetchTXTData } from '../service/api'
import { Urls } from '../@types/enums'
import { getHeaders, filterCurrencyList, splitByLines, splitByPipes } from '../helpers/parsers'
import { TableBodyType, TableHeadType, TableRowsType } from '../@types'
import { createArraysByLines, createArrayOfTableRows, createTableHeaders } from '../helpers/processors'
import CurrencyTable from './CurrencyTable'
import CurrencyConvertor from './CurrencyConvertor'

const Page = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['rates'],
    queryFn: () => fetchTXTData(Urls.CNB_DAILY_EXCHANGE_RATES)
  })

  const tableData = useMemo(() => {
    if (data) {
      const columns: TableHeadType[] = flow([getHeaders, splitByPipes, createTableHeaders])(data as string)
      const body: TableBodyType = flow([splitByLines, filterCurrencyList, createArraysByLines, createArrayOfTableRows])(
        data as string
      )

      return { columns, body }
    }
  }, [data])

  const currencyOptions = useMemo(
    () =>
      tableData
        ? tableData.body.map(({ country, code, rate, amount }: TableRowsType) => ({
            label: `${country} - ${code}`,
            value: `${rate}|${amount}|${code}`
          }))
        : [],
    [tableData]
  )

  if (isLoading) return <>'Loading...'</>
  if (error) return <>There was an error</>

  return (
    <StyledPage>
      <h1>Currency convertor</h1>
      {isFetching && <div> Updating...</div>}
      <CurrencyConvertor currencyOptions={currencyOptions} />
      <CurrencyTable columns={tableData.columns} data={tableData.body} />
    </StyledPage>
  )
}

export default Page

const StyledPage = styled.div`
  margin: 0 auto;
  width: 480px;
  padding: 0 10px;
`
