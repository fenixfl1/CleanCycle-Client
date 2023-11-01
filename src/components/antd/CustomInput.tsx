import { Input, InputProps, InputRef } from 'antd'
import { useFormContext } from '@/context/form'
import { useFormItemContext } from '@/context/formItem'
import CustomTooltip from './CustomTooltip'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { forwardRef } from 'react'

export type CustomInputProps = InputProps & {
  autoComplete?: string
  tooltip?: string
  alwaysAvailable?: boolean
  notNumber?: boolean
  width?: string | number
}

const CustomInput = forwardRef<InputRef, CustomInputProps>(
  (
    {
      alwaysAvailable,
      autoComplete,
      disabled,
      notNumber,
      readOnly = false,
      style,
      tooltip,
      width,
      ...props
    },
    ref,
  ) => {
    const context = useFormContext()
    const itemContext = useFormItemContext()

    const _readOnly = (context?.readOnly && !alwaysAvailable) || readOnly

    const handleOnKeyPress = (
      e: React.KeyboardEvent<HTMLInputElement>,
    ): void => {
      if (notNumber && e.key.match(/\d/g)) {
        e.preventDefault()
      }
    }

    const styles = {
      ...style,
      width: width ?? style?.width,
      ...(context?.uppercase && {
        textTransform: 'uppercase',
      }),
    } as never

    const suffix = tooltip ? (
      <CustomTooltip title={tooltip}>
        <QuestionCircleOutlined style={{ color: '#40a9ff' }} />
      </CustomTooltip>
    ) : null

    return (
      <Input
        autoComplete={autoComplete}
        disabled={context?.readOnly ? false : disabled ?? itemContext?.disabled}
        onKeyPress={handleOnKeyPress}
        readOnly={_readOnly}
        ref={ref}
        style={styles}
        suffix={suffix}
        {...props}
      />
    )
  },
)

export default CustomInput
