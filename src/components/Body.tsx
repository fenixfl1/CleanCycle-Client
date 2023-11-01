import React from 'react'
import CustomContent from './antd/CustomContent'
import styled from 'styled-components'

const Container = styled.div<{ fullSize?: boolean }>`
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
  padding: 0 20px;
  ${({ fullSize }) =>
    fullSize &&
    `
    max-width: 100%;
  `};
  // @media (max-width: 1819px) {
  //   max-width: 1000px;
  //   margin: 0;
  // }
`

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  fullSize?: boolean
}

const Body: React.FC<BodyProps> = ({ children, fullSize, ...props }) => {
  return (
    <CustomContent {...props}>
      <Container fullSize={fullSize}>{children}</Container>
    </CustomContent>
  )
}

export default Body
