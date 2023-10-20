import React, { useCallback, useEffect } from 'react'
import { message } from 'antd'
import { ArgsProps } from 'antd/es/message/interface'

interface CustomMessageProps extends ArgsProps {
  open?: boolean
}

const CustomMessage: React.FC<CustomMessageProps> = ({
  duration = 10,
  open,
  ...props
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const showMessage = useCallback(() => {
    open && messageApi.open({ duration, ...props })
  }, [open])

  useEffect(showMessage, [showMessage])

  return <>{contextHolder}</>
}

export default CustomMessage
