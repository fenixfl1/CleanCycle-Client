import React from 'react'
import { Badge, BadgeProps } from 'antd'

const CustomBadge: React.FC<BadgeProps> = ({ ...props }) => {
  return <Badge {...props}>{props.children}</Badge>
}

export default CustomBadge
