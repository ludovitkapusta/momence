export type TableHeadType = {
  dataIndex: string
  key: string
  title: string
}

export type TableRowsType = {
  id: string
  country: string
  currency: string
  amount: string
  code: string
  rate: string
}

export type TableBodyType = TableRowsType[]
