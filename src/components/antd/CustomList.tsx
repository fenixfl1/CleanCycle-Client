import React from 'react'
import { List, ListProps } from 'antd'

const CustomList: React.FC<ListProps<any>> = ({
  size = 'small',
  ...props
}): React.ReactElement => {
  return <List size={size} {...props} />
}

export default CustomList
