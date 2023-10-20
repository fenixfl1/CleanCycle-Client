import React from 'react'
import { Alert, AlertProps } from 'antd'

const CustomAlert: React.FC<AlertProps> = ({ showIcon = true, ...props }) => {
  return <Alert showIcon={showIcon} {...props} />
}

export default CustomAlert
