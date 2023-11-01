import { FormItemProps } from 'antd'
import { createContext, useContext } from 'react'
import { throwError } from '../helpers/throwError'

type CustomFormItemProps = FormItemProps & {
  onlyString?: boolean
  onlyNumber?: boolean
  noSpaces?: boolean
  noSymbol?: boolean
  uppercase?: boolean
  ref?: React.MutableRefObject<FormItemProps>
  disabled?: boolean
  readonly?: boolean
}

interface CustomFormItemContextProviderProps extends CustomFormItemProps {
  children: React.ReactNode
}

const CustomFormItemContext = createContext<CustomFormItemProps>({})

function useFormItemContext() {
  const context = useContext(CustomFormItemContext)
  if (context === undefined) {
    throwError(
      'useFormItemContext must be used within a CustomFormItemProvider',
    )
  }
  return context
}

export type { CustomFormItemProps, CustomFormItemContextProviderProps }
export { useFormItemContext, CustomFormItemContext }
