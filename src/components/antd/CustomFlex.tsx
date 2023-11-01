import React from 'react'
import { Flex, FlexProps } from 'antd'

const CustomFlex = React.forwardRef<HTMLElement, FlexProps>(
  ({ ...props }, ref) => {
    return <Flex ref={ref} {...props} />
  },
)

export default CustomFlex
