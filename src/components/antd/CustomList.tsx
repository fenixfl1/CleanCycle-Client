import React from 'react'
import { List, ListProps } from 'antd'
import { AnyType } from '../constant/types'

const CustomList: React.FC<ListProps<AnyType>> = ({
  size = 'small',
  ...props
}): React.ReactElement => {
  return <List size={size} {...props} />
}

export default CustomList
