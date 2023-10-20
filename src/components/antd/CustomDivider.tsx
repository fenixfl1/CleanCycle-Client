import React from 'react'
import { Divider, DividerProps } from 'antd'

const CustomDivider: React.FC<DividerProps> = ({
  orientation = 'left',
  ...props
}): React.ReactElement => {
  return (
    <Divider orientation={orientation} {...props}>
      {props.children}
    </Divider>
  )
}

export default CustomDivider
