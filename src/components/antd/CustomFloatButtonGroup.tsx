import React from 'react'
import { FloatButton, FloatButtonGroupProps } from 'antd'

const { Group } = FloatButton

const CustomFloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  trigger = 'click',
  type = 'primary',
  ...props
}) => {
  return <Group trigger={trigger} type={type} {...props} />
}

export default CustomFloatButtonGroup
