import { Menu, MenuProps } from 'antd'
import React from 'react'

const CustomMenu: React.FC<MenuProps> = ({ ...props }): React.ReactElement => {
  return <Menu {...props}>{props.children}</Menu>
}

export default CustomMenu
