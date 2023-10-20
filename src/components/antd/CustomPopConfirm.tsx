import React from 'react'
import { Popconfirm, PopconfirmProps } from 'antd'
import { CheckOutlined, StopOutlined } from '@ant-design/icons'

const CustomPopConfirm = React.forwardRef<unknown, PopconfirmProps>(
  (props, ref) => {
    return (
      <Popconfirm
        {...props}
        ref={ref}
        okText={'Aceptar'}
        cancelText={'Cancelar'}
        okButtonProps={{
          icon: <CheckOutlined />,
        }}
        cancelButtonProps={{
          icon: <StopOutlined />,
        }}
      />
    )
  }
)

export default CustomPopConfirm
