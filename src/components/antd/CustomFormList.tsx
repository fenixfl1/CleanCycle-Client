import React from 'react'
import { Form } from 'antd'
import { FormListProps } from 'antd/es/form'

const { List } = Form

const CustomFormList: React.FC<FormListProps> = ({
  name = 'form_list',
  ...props
}) => {
  return (
    <List name={name} {...props}>
      {props.children}
    </List>
  )
}

export default CustomFormList
