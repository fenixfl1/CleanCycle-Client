import React from 'react'
import { Image, ImageProps } from 'antd'

const CustomImage: React.FC<ImageProps> = ({ preview = false, ...props }) => {
  return <Image preview={preview} {...props} />
}

export default CustomImage
