import { Tag, TagProps } from 'antd'
import React from 'react'

const CustomTag: React.FC<TagProps> = ({ color = '#d3adf7', ...props }) => {
  return (
    <Tag color={color} {...props}>
      {props.children}
    </Tag>
  )
}

export default CustomTag
