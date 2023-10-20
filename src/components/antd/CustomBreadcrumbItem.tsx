import React from 'react'
import { Breadcrumb, BreadcrumbItemProps } from 'antd'

const { Item } = Breadcrumb

const CustomBreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  ...props
}): React.ReactElement => {
  return <Item {...props}>{props.children}</Item>
}

export default CustomBreadcrumbItem
