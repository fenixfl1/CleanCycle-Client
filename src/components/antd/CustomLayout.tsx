import React from 'react'
import { Layout, LayoutProps } from 'antd'

export interface CustomLayoutProps extends LayoutProps {
  width?: string | number
  height?: string | number
}

const CustomLayout: React.FC<CustomLayoutProps> = ({
  width,
  height,
  style,
  hasSider,
  ...props
}): React.ReactElement => {
  return (
    <Layout hasSider={hasSider} style={{ ...style, width, height }} {...props}>
      {props.children}
    </Layout>
  )
}

export default CustomLayout
