import React from 'react'
import { Input, InputRef } from 'antd'
import { SearchProps } from 'antd/es/input'

const { Search } = Input

const CustomSearch = React.forwardRef<InputRef, SearchProps>(
  ({ bordered = false, size = 'large', ...props }, ref) => {
    return <Search bordered={bordered} ref={ref} size={size} {...props} />
  }
)

export default CustomSearch
