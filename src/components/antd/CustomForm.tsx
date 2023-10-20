import { Form } from 'antd'
import {
  CustomFormContext,
  CustomFormContextProviderProps,
  CustomFormProps,
} from '@/context/form'

export const validateMessages = {
  required: '${label} es requerido.',
  types: {
    email: '${label} no es un email válido.',
    number: '${label} no es un número válido.',
    regexp: '${label} formato no válido.',
  },
  pattern: {
    mismatch: '${label} formato no válido.',
  },
  number: {
    len: '"${label}" debe tener exactamente "${len}" caracteres.',
    min: '"${label}" debe ser mayor o igual a "${min}".',
    range: "'${label}' debe estar entre ${min} y ${max}",
  },
  string: {
    len: '"${label}" debe tener exactamente "${len}" caracteres.',
    range: "'${label}' debe tener entre ${min} y ${max} digitos",
    min: '"${label}" debe tener mínimo "${len}" caracteres',
  },
  min: '"${label}" debe tener mínimo "${len}" caracteres.',
}

const CustomFormProvider: React.FC<CustomFormContextProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <CustomFormContext.Provider value={{ ...props }}>
      {children}
    </CustomFormContext.Provider>
  )
}

const CustomForm: React.FC<CustomFormProps> = ({
  autoComplete = 'off',
  name = 'custom-form',
  form,
  ...props
}) => {
  return (
    <CustomFormProvider
      autoComplete={autoComplete}
      form={form}
      name={name}
      {...props}
    >
      <Form
        autoComplete={autoComplete}
        form={form}
        name={name}
        validateMessages={validateMessages}
        {...props}
      >
        {props.children}
      </Form>
    </CustomFormProvider>
  )
}

export default CustomForm
