import { TableHeadType, TableRowsType } from '../@types'
import { splitByPipes } from './parsers'

export const createArraysByLines = (items: string[]): Array<Array<string>> =>
  items.map((item: string) => splitByPipes(item))

export const createTableHeaders = (items: string[]): TableHeadType[] =>
  items.map((item: string) => ({
    dataIndex: item,
    key: item.toLowerCase(),
    title: item
  }))

export const createArrayOfTableRows = (items: string[]): TableRowsType[] =>
  items.map((item: string) => ({
    id: item[3],
    country: item[0],
    currency: item[1],
    amount: item[2],
    code: item[3],
    rate: item[4]
  }))
