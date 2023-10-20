import React from 'react'
import { FloatButton, FloatButtonProps } from 'antd'

const CustomFloatButton: React.FC<FloatButtonProps> = ({ ...props }) => {
  return <FloatButton {...props} />
}

export default CustomFloatButton
