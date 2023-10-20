import React from 'react'
import { Spin, SpinProps } from 'antd'

const CustomSpin: React.FC<SpinProps> = ({
  size = 'small',
  spinning = false,
  ...props
}): React.ReactElement => {
  return (
    <Spin spinning={spinning} size={size} {...props}>
      {props.children}{' '}
    </Spin>
  )
}

export default CustomSpin
