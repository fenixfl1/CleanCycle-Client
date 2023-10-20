import React, { useMemo } from 'react'
import Input, { Mask, MaskedInputProps } from 'react-text-mask'
import CustomInput, { CustomInputProps } from './CustomInput'
import { MaskType } from '@/interfaces/general'
import maskedInput from '@/helpers/mask'
import { AnyType } from '@/constant/types'

interface CustomMaskedInputProps
  extends CustomInputProps,
    Omit<MaskedInputProps, 'mask' | 'prefix' | 'size'> {
  type: keyof MaskType
  mask?: Mask
}

const CustomMaskedInput: React.FC<CustomMaskedInputProps> = ({
  type,
  mask: _mask,
  ...props
}) => {
  const mask = useMemo(() => {
    switch (type) {
      case 'document':
        return maskedInput['document'] as Mask
      case 'phone':
        return (value: string) =>
          (value.length < (maskedInput['phone'] as unknown[]).length + 1
            ? maskedInput['phone']
            : maskedInput['phone_format']) as Mask
      default:
        return (_mask ?? maskedInput[type]) as Mask
    }
  }, [type])

  return (
    <Input
      mask={mask}
      render={(ref, props) => {
        return (
          <CustomInput
            ref={(current) => ref(current?.input as never)}
            {...props}
          />
        )
      }}
      {...(props as AnyType)}
    />
  )
}

export default CustomMaskedInput
