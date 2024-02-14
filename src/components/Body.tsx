import React from 'react';
import CustomContent from './antd/CustomContent';
import styled from 'styled-components';
import CustomSpin from './antd/CustomSpin';
import { ConditionalComponent, Fallback } from '.';

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullSize?: boolean;
  background?: string;
  loading?: boolean;
}

const Container = styled.div<BodyProps>`
  width: 100%;
  max-width: ${({ fullSize }) => (fullSize ? '100%' : '916px')};

  margin: 0 auto;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  ${({ background }) =>
    background &&
    `
    background-color: ${background};
  `};

  @media (max-width: 1819px) {
    max-width: 1000px;
  }
`;

const Body: React.FC<BodyProps> = ({
  background,
  children,
  fullSize,
  loading,
  ...props
}) => {
  return (
    <ConditionalComponent
      condition={!loading}
      fallback={
        <Fallback width={'100wh'} height={'80vh'} tip={'Cargando...'} />
      }
    >
      <CustomContent {...props}>
        <Container fullSize={fullSize} background={background}>
          {children}
        </Container>
      </CustomContent>
    </ConditionalComponent>
  );
};

export default Body;
