import React from 'react'
import { Skeleton, SkeletonProps } from 'antd'

const CustomSkeleton: React.FC<SkeletonProps> = ({
  ...props
}): React.ReactElement => {
  return <Skeleton {...props}>{props.children}</Skeleton>
}

export default CustomSkeleton
