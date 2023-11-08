import React from 'react'
import CustomContent from './antd/CustomContent'
import styled from 'styled-components'

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  fullSize?: boolean
  background?: string
}

const Container = styled.div<BodyProps>`
  width: 100%;
  max-width: ${({ fullSize }) => (fullSize ? '100%' : '816px')};

  margin: 0 auto;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  ${({ background }) =>
    background &&
    `
    background-color: ${background};
  `};

  // media queries para monitor de 22 pulgadas
  @media (max-width: 1819px) {
    max-width: 1000px;
  }
`

const Body: React.FC<BodyProps> = ({
  children,
  fullSize,
  background,
  ...props
}) => {
  return (
    <CustomContent {...props}>
      <Container fullSize={fullSize} background={background}>
        {children}
      </Container>
    </CustomContent>
  )
}

export default Body
