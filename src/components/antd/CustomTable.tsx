import React from 'react'
import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { TableProps } from 'antd/lib/table'

export interface CustomColumnType<T> extends ColumnType<T> {
  editable?: boolean
}

const CustomTable = React.forwardRef<any, TableProps<any>>((props, ref) => {
  return <Table {...props} ref={ref} />
})

export default CustomTable
