import React from 'react';
import { ConditionalComponent, Fallback, PageHeader } from '.';
import CustomLayout from './antd/CustomLayout';
import PageSider from './PageSider';
import styled from 'styled-components';
import CustomContent from './antd/CustomContent';
import { defaultTheme } from '@/themes/themes';

const Layout = styled(CustomLayout)`
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
  background: ${({ theme }) => theme.whiteBackground};

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

const Content = styled(CustomContent)`
  overflow: initial;

  .wrapper-body {
    padding: 24px;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <ConditionalComponent condition={true} fallback={<Fallback />}>
      <CustomLayout
        hasSider
        style={{ backgroundColor: defaultTheme.whiteBackground }}
      >
        <PageSider />

        <Layout>
          <PageHeader />
          <Content>
            <div className={'wrapper-body'}>{props.children}</div>
          </Content>
        </Layout>
      </CustomLayout>
    </ConditionalComponent>
  );
};

export default Wrapper;
