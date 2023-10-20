import React from 'react'
import { Result, ResultProps } from 'antd'

const CustomResult: React.FC<ResultProps> = ({ ...props }) => {
  return <Result {...props} />
}

export default CustomResult
