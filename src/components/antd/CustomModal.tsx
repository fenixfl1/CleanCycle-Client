import React from 'react'
import { Modal, ModalProps } from 'antd'
import { CheckOutlined, StopOutlined } from '@ant-design/icons'

const CustomModal: React.FC<ModalProps> = ({
  okText = 'Aceptar',
  cancelText = 'Cancelar',
  okButtonProps = { icon: <CheckOutlined /> },
  cancelButtonProps = { icon: <StopOutlined /> },
  ...props
}): React.ReactElement => {
  return (
    <Modal
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      okText={okText}
      cancelText={cancelText}
      {...props}
    >
      {props.children}
    </Modal>
  )
}

export default CustomModal
