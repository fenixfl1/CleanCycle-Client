import React from 'react'
import { Layout, LayoutProps } from 'antd'

const { Header } = Layout

const CustomHeader: React.FC<LayoutProps> = ({
  ...props
}): React.ReactElement => {
  return (
    <Header className={'main-page-header'} {...props}>
      {props.children}
    </Header>
  )
}

export default CustomHeader
