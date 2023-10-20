import { Progress, ProgressProps } from 'antd'
import React from 'react'

const CustomProgress: React.FC<ProgressProps> = ({
  size = 'small',
  type = 'line',
  percent = 0,
  ...props
}) => {
  return <Progress percent={percent} size={size} type={type} {...props} />
}

export default CustomProgress
