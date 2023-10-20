import React from 'react'
import { Form } from 'antd'
import { FormProviderProps } from 'antd/lib/form/context'

const { Provider } = Form

const CustomFormProvider: React.FC<FormProviderProps> = ({ ...props }) => {
  return <Provider {...props}>{props.children}</Provider>
}

export default CustomFormProvider
