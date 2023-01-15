import React from 'react'
import { map } from 'lodash'
import styled from 'styled-components'
import { TableBodyType, TableHeadType, TableRowsType } from '../@types'

interface Props {
  columns: TableHeadType[]
  data: TableBodyType
}

const Table = ({ columns, data }: Props) => {
  return (
    <StyledTable>
      <StyledTHead>
        <tr>
          {columns.map((column: TableHeadType) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </StyledTHead>
      <StyledTBody>
        {data.map((row: TableRowsType) => (
          <tr key={row.id}>{map(row, (r, key) => columns.find((c) => c.key === key) && <td key={key}>{r}</td>)}</tr>
        ))}
      </StyledTBody>
    </StyledTable>
  )
}

export default Table

const StyledTable = styled.table`
  clear: both;
  margin-top: 6px !important;
  margin-bottom: 6px !important;
  max-width: none !important;
  border-collapse: separate !important;
  border-spacing: 0;
  width: 100%;
`

const StyledTHead = styled.thead`
  vertical-align: bottom;

  tr {
    th {
      vertical-align: middle;
      line-height: 1;
      white-space: nowrap;
      padding: 0.8rem 1.175rem;
      border-top: 0;
      border-bottom: 1px solid #000;
      font-size: 0.875rem;
      font-weight: 600;
      text-align: left;
    }
  }
`

const StyledTBody = styled.tbody`
  border-color: inherit;
  border-style: solid;
  border-width: 0;

  tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;

    &:last-child {
      td {
        border: none;
      }
    }

    td {
      vertical-align: middle;
      line-height: 1;
      white-space: nowrap;
      padding: 0.8rem 1.175rem;
      font-size: 0.875rem;
      background-color: white;
      border-bottom: 1px solid rgb(206, 212, 218);
      white-space: break-spaces;

      &:first-child {
        max-width: 100px;
      }

      &.not-listed {
        background-color: #ff9b9b;
      }
    }
  }
`
