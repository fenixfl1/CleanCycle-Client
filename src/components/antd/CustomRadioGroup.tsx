import React from 'react'
import { Radio, RadioGroupProps } from 'antd'

const { Group } = Radio

const CustomRadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ size = 'middle', ...props }, ref) => {
    return <Group size={size} {...props} ref={ref} />
  }
)

CustomRadioGroup.displayName = 'CustomRadioGroup'

export default CustomRadioGroup
