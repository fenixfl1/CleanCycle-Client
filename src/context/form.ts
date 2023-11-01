import { FormProps } from 'antd'
import { createContext, useContext } from 'react'
import { throwError } from '../helpers/throwError'

type CustomFormProps = FormProps & {
  onlyString?: boolean
  onlyNumber?: boolean
  noSymbol?: boolean
  uppercase?: boolean
  width?: string | number
  children?: React.ReactNode
  readOnly?: boolean
}

const CustomFormContext = createContext<CustomFormProps>({})

interface CustomFormContextProviderProps extends CustomFormProps {
  children: React.ReactNode
}

function useFormContext() {
  const context = useContext(CustomFormContext)
  if (context === undefined) {
    throwError('useFormContext must be used within a CustomFormProvider')
  }
  return context
}

export type { CustomFormProps, CustomFormContextProviderProps }
export { useFormContext, CustomFormContext }
