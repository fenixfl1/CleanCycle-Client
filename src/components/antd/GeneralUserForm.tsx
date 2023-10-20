import { Form, FormInstance } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { defaultBreakpoints, formItemLayout } from '@/styles/breakpoints'
import ImgCrop from 'antd-img-crop'
import {
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskedInput,
  CustomRadioGroup,
  CustomRow,
} from '@/components'
import CustomUpload from './CustomUpload'
import { normalizeFile } from '@/helpers'

const genderOptions = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
]

interface GeneralUserFormProps {
  form: FormInstance
}

const GeneralUserForm: React.FC<GeneralUserFormProps> = ({ form }) => {
  const name = Form.useWatch('NOMBRES', form)
  const surname = Form.useWatch('APELLIDOS', form)

  const buildUsername = useCallback(() => {
    if (!name || !surname) return
    const names = form.getFieldValue('NOMBRES')
    const surnames = form.getFieldValue('APELLIDOS')
    const username = `${names.split(' ')[0][0]}${
      surnames.split(' ')[0]
    }`.toLowerCase()
    form.setFieldsValue({ USUARIO: username })
  }, [name, surname])

  useEffect(buildUsername, [buildUsername])

  return (
    <CustomForm form={form} {...formItemLayout}>
      <CustomRow justify={'start'}>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Nombres'}
            name={'NOMBRES'}
            rules={[{ required: true }]}
          >
            <CustomInput placeholder={'Nombres'} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Apellidos'}
            name={'APELLIDOS'}
            rules={[{ required: true }]}
          >
            <CustomInput placeholder={'Apellidos'} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Email'}
            name={'EMAIL'}
            rules={[{ required: true, type: 'email' }]}
          >
            <CustomInput placeholder={'Correo Electrónico'} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Usuario'}
            name={'USUARIO'}
            rules={[{ required: true }]}
          >
            <CustomInput prefix={'@'} placeholder={'Nombre de Usuario'} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            label={'Teléfono'}
            name={'TELEFONO'}
            rules={[{ required: true }]}
          >
            <CustomMaskedInput
              type={'phone'}
              placeholder={'Número de Teléfono'}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem label={'Sexo'} name={'SEXO'}>
            <CustomRadioGroup options={genderOptions} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol {...defaultBreakpoints}>
          <CustomFormItem
            getValueFromEvent={normalizeFile}
            valuePropName={'fileList'}
            label={'Foto'}
            name={'AVATAR'}
          >
            <ImgCrop>
              <CustomUpload />
            </ImgCrop>
          </CustomFormItem>
        </CustomCol>
      </CustomRow>
    </CustomForm>
  )
}

export default GeneralUserForm
