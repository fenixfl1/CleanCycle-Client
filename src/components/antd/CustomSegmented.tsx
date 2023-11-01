import React from 'react'
import { Segmented, SegmentedProps } from 'antd'

const CustomSegmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (props, ref) => {
    return <Segmented ref={ref as any} {...props} />
  },
)

CustomSegmented.displayName = 'CustomSegmented'

export default CustomSegmented
