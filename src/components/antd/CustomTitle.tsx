import React from 'react'
import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'

const { Title } = Typography

const CustomTitle = React.forwardRef<HTMLElement, TitleProps>(
  ({ level = 3, editable = false, ...props }, ref) => {
    return <Title level={level} editable={editable} {...props} ref={ref} />
  }
)

export default CustomTitle
