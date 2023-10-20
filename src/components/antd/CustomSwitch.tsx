import React from 'react'
import { Switch, SwitchProps } from 'antd'

const CustomSwitch = React.forwardRef<HTMLElement, SwitchProps>(
  (props, ref) => {
    return <Switch ref={ref} {...props} />
  },
)

export default CustomSwitch
