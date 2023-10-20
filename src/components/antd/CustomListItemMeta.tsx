import React from 'react'
import { ListItemMetaProps } from 'antd/lib/list/Item'
import { List } from 'antd'

const { Meta } = List.Item

const CustomListItemMeta: React.FC<ListItemMetaProps> = ({
  ...props
}): React.ReactElement => {
  return <Meta {...props}>{props.children}</Meta>
}

export default CustomListItemMeta
