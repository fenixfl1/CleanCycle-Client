import React from 'react'
import { Dropdown, DropdownProps } from 'antd'

interface CustomDropdownProps extends DropdownProps {
  style?: React.CSSProperties
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  trigger = ['click'],
  placement = 'bottomCenter',
  ...props
}): React.ReactElement => {
  return (
    <Dropdown trigger={trigger} placement={placement} {...props}>
      {props.children}
    </Dropdown>
  )
}

export default CustomDropdown
