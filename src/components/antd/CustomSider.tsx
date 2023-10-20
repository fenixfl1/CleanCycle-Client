import React from 'react'
import { Layout, SiderProps } from 'antd'
import { forwardRef } from 'react'

const { Sider } = Layout

const CustomSider = forwardRef<HTMLDivElement, SiderProps>(
  ({ theme = 'light', ...props }, ref) => (
    <Sider {...props} className={'sider'} theme={theme} ref={ref} />
  )
)

export default CustomSider
