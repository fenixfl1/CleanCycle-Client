import * as React from 'react'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'

const { Group } = Checkbox

const CustomCheckBoxGroup: React.FunctionComponent<CheckboxGroupProps> = ({
  ...props
}): React.ReactElement => {
  return <Group {...props}>{props.children}</Group>
}

export default CustomCheckBoxGroup
