import React from 'react'
import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { TableProps } from 'antd/lib/table'
import { AnyType } from '@/constant/types'

export interface CustomColumnType<T> extends ColumnType<T> {
  editable?: boolean
}

const CustomTable = React.forwardRef<AnyType, TableProps<AnyType>>(
  (props, ref) => {
    return <Table {...props} ref={ref} />
  }
)

export default CustomTable
