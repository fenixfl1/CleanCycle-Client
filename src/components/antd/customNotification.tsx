import { NotificationType } from '@/constants/types'
import { notification as message } from 'antd'

type NotificationParametersType = {
  title: string
  description: React.ReactNode
  type: NotificationType
  duration?: number
  onClick?: () => void
  icon?: React.ReactNode
}

const customNotification = ({
  duration = 10,
  ...parameters
}: NotificationParametersType): void => {
  message[parameters.type]({
    ...parameters,
    message: parameters.title,
    description: parameters.description,
    onClick: parameters.onClick,
    duration: duration,
  })
}

export default customNotification
