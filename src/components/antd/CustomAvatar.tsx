import React from 'react'
import { Avatar, AvatarProps } from 'antd'

const CustomAvatar: React.FC<AvatarProps> = ({
  ...props
}): React.ReactElement => {
  return <Avatar {...props} />
}

export default CustomAvatar
