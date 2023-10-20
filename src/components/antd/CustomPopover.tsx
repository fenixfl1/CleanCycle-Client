import React from 'react'
import { Popover, PopoverProps } from 'antd'

const CustomPopover = React.forwardRef<unknown, PopoverProps>(
  ({ trigger = 'hover', ...props }, ref) => {
    return (
      <Popover {...props} ref={ref} trigger={trigger}>
        {props.children}
      </Popover>
    )
  }
)

export default CustomPopover
