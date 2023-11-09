import styled from 'styled-components'

interface SubtitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  decorator?: string
  size?: number
  upper?: boolean
}

const Subtitle = styled.span<SubtitleProps>`
  font-size: ${({ size }) => size} px;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;
  ${({ upper }) => upper && `text-transform: uppercase;`}

  ${({ decorator }) =>
    decorator &&
    `
    &::before {
      content: '${decorator}';
    }
  `}

  svg {
    font-size: 16px;
  }
`

export default Subtitle
