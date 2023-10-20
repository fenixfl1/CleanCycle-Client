import React from 'react'
import { Avatar } from 'antd'
import { GroupProps } from 'antd/es/avatar'

const { Group } = Avatar

const CustomAvatarGroup: React.FC<GroupProps> = ({
  ...props
}): React.ReactElement => {
  return <Group {...props}>{props.children}</Group>
}

export default CustomAvatarGroup
