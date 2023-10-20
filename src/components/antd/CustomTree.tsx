import React from 'react'
import { Tree, TreeProps } from 'antd'

export type TreeNodeInterface = TreeProps['treeData']

interface CustomTreeProps extends Omit<TreeProps, 'treeData'> {
  dataSource: TreeNodeInterface
}

const CustomTree: React.FC<CustomTreeProps> = ({
  dataSource,
  checkable = true,
  ...props
}) => {
  return <Tree treeData={dataSource} checkable={checkable} {...props} />
}

export default CustomTree
