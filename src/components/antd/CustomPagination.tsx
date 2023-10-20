import React from 'react'
import { Pagination, PaginationProps } from 'antd'

const CustomPagination: React.FC<PaginationProps> = ({ ...props }) => {
  return <Pagination {...props} />
}

export default CustomPagination
