import React from 'react'

import styled from 'styled-components'

import { TableBodyType, TableHeadType } from '../@types'
import Table from './common/Table'

interface CurrencyTableProps {
  columns: TableHeadType[]
  data: TableBodyType
}

const CurrencyTable = ({ columns, data }: CurrencyTableProps) => (
  <StyledTableWrapper>
    <Table columns={columns} data={data} />
  </StyledTableWrapper>
)

export default CurrencyTable

const StyledTableWrapper = styled.div`
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  overflow: scroll;
  padding: 10px;
`
