import React from 'react'
import { Breadcrumb, BreadcrumbProps } from 'antd'

const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({
  ...props
}): React.ReactElement => {
  return <Breadcrumb {...props}>{props.children}</Breadcrumb>
}

export default CustomBreadcrumb
