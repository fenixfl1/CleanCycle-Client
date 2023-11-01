import styled from 'styled-components'

interface SubtitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  decorator?: string
}

const Subtitle = styled.span<SubtitleProps>`
  font-size: 14px;
  // font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;
  text-transform: uppercase;

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
