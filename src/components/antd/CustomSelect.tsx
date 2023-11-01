import React from 'react'
import { Select, SelectProps } from 'antd'

interface CustomSearchProps extends SelectProps<any> {
  width?: number | string
}

const CustomSelect: React.FC<CustomSearchProps> = ({
  optionLabelProp = 'label',
  width = '100%',
  style,
  ...props
}) => {
  return (
    <Select
      style={{ ...style, width }}
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
