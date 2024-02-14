import CustomContent from '@/components/antd/CustomContent';
import CustomLayout from '@/components/antd/CustomLayout';
import PageHeader from '@/components/PageHeader';
import { defaultTheme } from '@/themes/themes';
import React from 'react';
import styled from 'styled-components';
import PageSider from './PageSider';

const Content = styled(CustomContent)`
  height: 85vh;
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  background: ${({ theme }) => theme.baseBgColor};

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Body = styled(CustomLayout)`
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5em; /* Ancho del scroll (puedes ajustarlo según tus preferencias) */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Color del fondo del scroll */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Color del scroll */
  }
`;

const Layout = styled(CustomLayout)`
  background: ${({ theme }) => theme.baseBgColor};
`;

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutProps> = ({ children }) => {
  // return (
  //   <CustomLayout style={{ background: defaultTheme.baseBgColor }}>
  //     <PageSider />
  //     <PageHeader />
  //     <Content>{children}</Content>
  //   </CustomLayout>
  // );
  return (
    <Layout hasSider>
      <PageSider />
      <Body>
        <PageHeader />
        <Content>{children}</Content>
      </Body>
    </Layout>
  );
};

export default LayoutWrapper;
