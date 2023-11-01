import { Row, RowProps } from 'antd'

export interface CustomRowProps extends RowProps {
  width?: number | string
  height?: number | string
  gap?: number | string
}

const CustomRow: React.FC<CustomRowProps> = ({
  width,
  height,
  justify = 'start',
  align = 'top',
  gap,
  ...props
}) => {
  return (
    <Row
      align={align}
      justify={justify}
      {...props}
      style={{ ...props.style, width, height, gap }}
    />
  )
}

export default CustomRow
