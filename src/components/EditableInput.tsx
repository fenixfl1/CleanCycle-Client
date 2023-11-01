import React, { useMemo, useRef } from 'react'
import ConditionalComponent from './ConditionalComponent'
import CustomInput from './antd/CustomInput'
import { InputProps, InputRef } from 'antd'
import styled from 'styled-components'
import { LOG_DATE_FORMAT } from '@/constants/formats'
import CustomDatePicker, {
  CustomDatePickerProps,
} from './antd/CustomDatePicker'
import CustomFormItem from './antd/CustomFormItem'
import CustomInputNumber, {
  CustomInputNumberProps,
} from './antd/CustomInputNumber'
import CustomTitle from './antd/CustomTitle'
import formatter from '@/helpers/formatter'
import { Format } from '@/constants/types'

const InputContainer = styled.div<{ editable?: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 8px;
  height: 32px;
  line-height: 32px;
  cursor: ${({ editable }) => (editable ? 'text' : 'pointer')};
  background-color: ${({ theme, editable }) =>
    editable ? theme.baseBgColor : 'transparent'};
  border-bottom: ${({ theme, editable }) =>
    editable ? 'none' : `1px solid ${theme.borderColor}`};

  &:hover {
    background-color: #e8e8e8;
    border-radius: ${({ theme }) => theme.borderRadius};
    border-bottom: none;
    transition: all 0.9s ease;
  }
`

interface EditableInputProps {
  editable?: boolean
  label?: string
  name?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  onEdit?(value?: string, isEditing?: boolean): void
  onFinish?(value: string): void
  required?: boolean
  value?: any
  textLevel?: 1 | 2 | 3 | 4 | 5
  inputProps?: InputProps | CustomInputNumberProps | CustomDatePickerProps
  type?: 'text' | 'number' | 'date'
  format?: Format
  prefix?: string
}

const EditableInput: React.FC<EditableInputProps> = ({
  editable = false,
  label,
  name,
  onClick,
  onEdit,
  onFinish,
  required = false,
  textLevel = 3,
  inputProps = { placeholder: 'Click to edit', maxLength: 100 },
  value,
  type = 'text',
  format,
  prefix,
  ...props
}) => {
  const ref = useRef<InputRef>(null)

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onFinish?.(e.target.value)
  }

  const handleOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFinish?.(e.target?.['value' as never])
    }
  }

  const commonProps = {
    autoFocus: true,
    onBlur: handleOnBlur,
    onkeydown: handleOnKeydown,
    ref,
    width: '100%',
    placeholder: inputProps.placeholder,
  }

  const inputTypes = {
    text: <CustomInput {...commonProps} {...(inputProps as InputProps)} />,
    number: (
      <CustomInputNumber
        onPressEnter={handleOnKeydown}
        {...commonProps}
        {...(inputProps as CustomInputNumberProps)}
      />
    ),
    date: (
      <CustomDatePicker
        format={LOG_DATE_FORMAT}
        {...commonProps}
        {...(inputProps as CustomDatePickerProps)}
      />
    ),
  }

  const formattedValue = useMemo(() => {
    return formatter({ value: String(value), format: format as Format, prefix })
  }, [value, format])

  return (
    <ConditionalComponent
      condition={editable}
      fallback={
        <InputContainer onClick={() => onEdit?.(value, !editable)}>
          <CustomTitle level={textLevel}>
            <span
              dangerouslySetInnerHTML={{
                __html: formattedValue ?? inputProps.placeholder,
              }}
            />
          </CustomTitle>
        </InputContainer>
      }
    >
      <CustomFormItem
        initialValue={value?.replace(/<[^>]+>/g, '')}
        name={name}
        label={label}
        rules={[{ required }]}
        noStyle
      >
        {inputTypes[type]}
      </CustomFormItem>
    </ConditionalComponent>
  )
}

export default EditableInput
