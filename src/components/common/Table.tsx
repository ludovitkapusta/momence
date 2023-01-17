import React from 'react'
import { map } from 'lodash'
import styled from 'styled-components'

import { TableBodyType, TableHeadType, TableRowsType } from '../../@types'

interface Props {
  columns: TableHeadType[]
  data: TableBodyType
}

const Table = ({ columns, data }: Props) => {
  return (
    <table data-testid="table">
      <StyledTHead data-testid="table-head">
        <tr>
          {columns.map((column: TableHeadType) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </StyledTHead>
      <StyledTBody data-testid="table-body">
        {data.map((row: TableRowsType) => (
          <tr key={row.id}>{map(row, (r, key) => columns.find((c) => c.key === key) && <td key={key}>{r}</td>)}</tr>
        ))}
      </StyledTBody>
    </table>
  )
}

export default Table

const StyledTHead = styled.thead`
  tr {
    th {
      vertical-align: middle;
      white-space: nowrap;
      padding: 0.8rem 1.175rem;
      border-bottom: 1px solid #000;
      font-size: 0.875rem;
      font-weight: 600;
      text-align: left;
    }
  }
`

const StyledTBody = styled.tbody`
  tr {
    &:last-child {
      td {
        border: none;
      }
    }

    td {
      vertical-align: middle;
      white-space: nowrap;
      padding: 0.8rem 1.175rem;
      font-size: 0.875rem;
      background-color: white;
      border-bottom: 1px solid rgb(206, 212, 218);
      white-space: break-spaces;
    }
  }
`
