import React from 'react'
import { Segmented, SegmentedProps } from 'antd'
import { AnyType } from '@/constant/types'

const CustomSegmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (props, ref) => {
    return <Segmented ref={ref as AnyType} {...props} />
  }
)

CustomSegmented.displayName = 'CustomSegmented'

export default CustomSegmented
