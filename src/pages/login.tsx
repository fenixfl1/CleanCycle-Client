import React, { useEffect } from 'react'
import { Form } from 'antd'
import { PATH_HOME, PATH_REGISTER_USER } from '@/constants/routes'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { sessionCookies } from '@/lib/session'
import CustomMessage from '@/components/antd/CustomMessage'
import ConditionalComponent from '@/components/ConditionalComponent'
import CustomAlert from '@/components/antd/CustomAlert'
import CustomButton from '@/components/antd/CustomButton'
import CustomCard from '@/components/antd/CustomCard'
import CustomCheckbox from '@/components/antd/CustomCheckbox'
import CustomCol from '@/components/antd/CustomCol'
import CustomForm from '@/components/antd/CustomForm'
import CustomFormItem from '@/components/antd/CustomFormItem'
import CustomInput from '@/components/antd/CustomInput'
import CustomPasswordInput from '@/components/antd/CustomPasswordInput'
import CustomRow from '@/components/antd/CustomRow'
import CustomSpin from '@/components/antd/CustomSpin'
import customNotification from '@/components/antd/customNotification'
import { useAuthenticateUser } from '@/services/user'
import { formItemLayout } from '@/themes/breakpoints'
import { getCookie, removeCookie, setCookie } from '@/helpers/getCookie'
import Logo from '@/components/styled/Logo'
import Body from '@/components/Body'
import { CustomText } from '@/components/antd/CustomTypography'
import useAnonymousUserRequired from '@/hooks/useAnonymousUserRequired'
import CustomFlex from '@/components/antd/CustomFlex'

type LoginPayload = {
  username: string
  password: string
  remember: boolean
}

const Card = styled(CustomCard)`
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 0 auto;
`

const CoverContainer = styled.div`
  width: 28rem;
  margin-right: 1rem;

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginPayload>()
  const router = useRouter()
  const [authenticate, { isLoading, isSuccess, isError }] =
    useAuthenticateUser()

  useAnonymousUserRequired()

  useEffect(() => {
    form.setFieldsValue({
      username: getCookie(sessionCookies.COOKIE_KEY_REMEMBER_USERNAME),
      password: '',
    })
  }, [])

  const handleOnFinish = async () => {
    try {
      const { username, password, remember } = await form.validateFields()

      if (remember)
        setCookie(sessionCookies.COOKIE_KEY_REMEMBER_USERNAME, username)
      else removeCookie(sessionCookies.COOKIE_KEY_REMEMBER_USERNAME)

      const data = await authenticate({ username, password }).unwrap()

      if (data.USER_ID) {
        const { next } = router.query
        router.push((next as string) ?? PATH_HOME)
      }
    } catch (error) {
      form.resetFields(['password'])
      customNotification({
        title: 'Error',
        type: 'error',
        description: error.message,
      })
    }
  }

  return (
    <Body style={{ height: '85vh' }}>
      <CustomMessage
        type={'success'}
        content={'Welcome again Benjamin Rosario'}
        open={isSuccess}
      />
      <CustomSpin spinning={isLoading}>
        <CustomRow justify={'center'} align={'middle'} height={'84vh'}>
          <Card shadow>
            <CustomFlex>
              <CoverContainer>
                <img
                  style={{ width: '100%', height: 'auto' }}
                  src={'/assets/img/green-legos.jpg'}
                />
              </CoverContainer>
              <CustomRow width={'28rem'} align={'middle'} justify={'center'}>
                <ConditionalComponent condition={isError}>
                  <CustomCol xs={24}>
                    <CustomAlert
                      type={'error'}
                      description={'Usuario o contraseña incorrectos'}
                      closable
                    />
                  </CustomCol>
                </ConditionalComponent>
                <CustomRow justify={'center'} align={'middle'}>
                  <Logo showText={false} />
                  <CustomCol xs={24}>
                    <CustomText
                      style={{
                        textAlign: 'center',
                        fontFamily: 'comic sans sm',
                      }}
                    >
                      <h3>Login</h3>
                    </CustomText>
                  </CustomCol>
                </CustomRow>
                {/* <CustomDivider /> */}
                <CustomForm form={form} {...formItemLayout}>
                  <CustomRow justify={'center'}>
                    <CustomCol xs={24}>
                      <CustomFormItem>
                        <CustomFormItem
                          label={'usuario'}
                          name={'username'}
                          noStyle
                          rules={[{ required: true }]}
                        >
                          <CustomInput
                            prefix={<UserOutlined />}
                            placeholder={'Nombre de usuario'}
                          />
                        </CustomFormItem>
                      </CustomFormItem>
                    </CustomCol>
                    <CustomCol xs={24}>
                      <CustomFormItem>
                        <CustomFormItem
                          label={'contraseña'}
                          noStyle
                          name={'password'}
                          rules={[{ required: true }]}
                        >
                          <CustomPasswordInput
                            prefix={<LockOutlined />}
                            placeholder={'Contraseña'}
                          />
                        </CustomFormItem>
                      </CustomFormItem>
                    </CustomCol>
                  </CustomRow>
                  <CustomFormItem>
                    <CustomRow justify={'space-between'}>
                      <CustomFormItem
                        name={'remember'}
                        valuePropName={'checked'}
                        noStyle
                      >
                        <CustomCheckbox>Recordarme</CustomCheckbox>
                      </CustomFormItem>
                      <Link href={'#'}>Olvide mi contraseña</Link>
                    </CustomRow>
                  </CustomFormItem>

                  <CustomButton block type={'primary'} onClick={handleOnFinish}>
                    Login
                  </CustomButton>
                  <br />
                  <br />
                  <br />
                  <CustomRow justify={'center'}>
                    <CustomText style={{ textAlign: 'center' }}>
                      ¿No tienes una cuenta?{' '}
                      <Link href={PATH_REGISTER_USER}>Regístrate!</Link>
                    </CustomText>
                  </CustomRow>
                </CustomForm>
              </CustomRow>
            </CustomFlex>
          </Card>
        </CustomRow>
      </CustomSpin>
    </Body>
  )
}

export default Login
