import CustomContent from '@/components/antd/CustomContent'
import CustomLayout from '@/components/antd/CustomLayout'
import PageHeader from '@/components/PageHeader'
import { defaultTheme } from '@/themes/themes'
import React from 'react'
import styled from 'styled-components'
// import { Switch, useDarkreader } from 'react-darkreader'

const Content = styled(CustomContent)`
  height: 85vh;
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  background: ${({ theme }) => theme.baseBgColor};

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const FloatButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const [isDark, { toggle }] = useDarkreader(false)
  return (
    <CustomLayout style={{ background: defaultTheme.baseBgColor }}>
      <PageHeader />
      <Content>{children}</Content>

      <FloatButton>
        {/* <Switch checked={isDark} onChange={toggle} /> */}
      </FloatButton>
    </CustomLayout>
  )
}

export default Layout
