import { Col, ColProps } from 'antd'

const CustomCol: React.FC<ColProps> = ({ ...props }) => {
  return <Col {...props} />
}

export default CustomCol
