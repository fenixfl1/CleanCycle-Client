import React from 'react'
import { Select, SelectProps } from 'antd'

const CustomSelect: React.FC<SelectProps> = ({
  optionLabelProp = 'label',
  ...props
}) => {
  return (
    <Select
      optionLabelProp={optionLabelProp}
      filterOption={(input, option) => {
        return option?.label
          ?.toString()
          ?.toLowerCase()
          ?.includes(input) as boolean
      }}
      {...props}
    >
      {props.children}
    </Select>
  )
}

export default CustomSelect
