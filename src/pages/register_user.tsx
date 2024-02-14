import { AvatarSelector, ConditionalComponent } from '@/components';
import Body from '@/components/Body';
import CustomAlert from '@/components/antd/CustomAlert';
import CustomAvatar from '@/components/antd/CustomAvatar';
import CustomButton from '@/components/antd/CustomButton';
import CustomCard from '@/components/antd/CustomCard';
import CustomCol from '@/components/antd/CustomCol';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomFlex from '@/components/antd/CustomFlex';
import CustomForm from '@/components/antd/CustomForm';
import CustomFormItem from '@/components/antd/CustomFormItem';
import CustomInput from '@/components/antd/CustomInput';
import CustomPasswordInput from '@/components/antd/CustomPasswordInput';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpin from '@/components/antd/CustomSpin';
import CustomTextArea from '@/components/antd/CustomTextArea';
import { CustomText } from '@/components/antd/CustomTypography';
import Logo from '@/components/styled/Logo';
import { PATH_LOGIN } from '@/constants/routes';
import useAnonymousUserRequired from '@/hooks/useAnonymousUserRequired';
import useDebounce from '@/hooks/useDebounce';
import {
  useRegisterUser,
  useValidateEmail,
  useValidateUsername,
} from '@/services/user';
import { defaultBreakpoints, formItemLayout } from '@/themes/breakpoints';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled(CustomCard)`
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 0 auto;
`;

const CoverContainer = styled.div`
  width: 28rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 100px;

  .upload-button {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 999;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: white;
    // opacity: 0;
    border-radius: 50%;
    z-index: 1;
  }
`;

type Status = '' | 'error' | 'validating' | 'success' | 'warning' | undefined;

const RegisterUser: React.FC = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState<string>();
  const [usernameStatus, setUsernameStatus] = useState<Status>();
  const [emailStatus, setEmailStatus] = useState<Status>();

  const [registerUser, { isLoading, isError }] = useRegisterUser();
  const [validateEmail] = useValidateEmail();
  const [validateUsername] = useValidateUsername();

  useAnonymousUserRequired();

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields();

      data.AVATAR = avatar;
      data.USERNAME = data.USERNAME.toLowerCase();

      delete data._PASSWORD;
      await registerUser(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlurUsername = async (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    try {
      setUsernameStatus('validating');
      await validateUsername({
        USERNAME: event.target.value,
      }).unwrap();
      setUsernameStatus('success');
    } catch ({ data }) {
      setUsernameStatus('error');
      form.setFields([
        {
          name: 'USERNAME',
          errors: [data.error.message],
          validating: false,
        },
      ]);
    }
  };

  const handleBlurEmail = async (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    try {
      setEmailStatus('validating');
      await validateEmail({
        EMAIL: event.target.value,
      }).unwrap();
      setEmailStatus('success');
    } catch (error) {
      setEmailStatus('error');
      form.setFields([
        {
          name: 'EMAIL',
          errors: [error.message],
        },
      ]);
    }
  };

  return (
    <>
      <Body>
        <CustomSpin spinning={isLoading}>
          <CustomRow justify={'center'} align={'middle'} height={'80vh'}>
            <Card shadow>
              <CustomFlex justify={'center'}>
                <CustomRow width={'28rem'} align={'middle'}>
                  <CustomForm
                    form={form}
                    {...formItemLayout}
                    layout={'vertical'}
                  >
                    <CustomRow justify={'center'}>
                      <ConditionalComponent condition={isError}>
                        <CustomCol xs={24}>
                          <CustomAlert
                            type={'error'}
                            description={'Usuario o contraseña incorrectos'}
                            closable
                          />
                        </CustomCol>
                      </ConditionalComponent>
                      <CustomRow justify={'center'}></CustomRow>
                      <CustomCol xs={24}>
                        <CustomRow justify={'center'}>
                          <AvatarContainer>
                            <CustomAvatar
                              shadow
                              size={100}
                              icon={<UserOutlined />}
                              src={avatar}
                            />
                            <CustomButton
                              shape={'circle'}
                              className={'upload-button'}
                              icon={<UploadOutlined />}
                              onClick={() => setVisible(true)}
                            />
                          </AvatarContainer>
                        </CustomRow>
                      </CustomCol>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <CustomCol xs={24}>
                        <CustomFormItem
                          label={'Nombre completo'}
                          name={'FULL_NAME'}
                          rules={[{ required: true }]}
                        >
                          <CustomInput placeholder="Nombre completo" />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol xs={24}>
                        <CustomFormItem
                          hasFeedback
                          label={'Usuario'}
                          name={'USERNAME'}
                          noSpaces
                          noSymbol
                          rules={[{ required: true }]}
                          validateStatus={usernameStatus}
                        >
                          <CustomInput
                            onBlur={handleBlurUsername}
                            placeholder="Usuario"
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol xs={24}>
                        <CustomFormItem
                          name={'EMAIL'}
                          label={'Correo electrónico'}
                          validateStatus={emailStatus}
                          hasFeedback
                          rules={[{ required: true, type: 'email' }]}
                        >
                          <CustomInput
                            onBlur={handleBlurEmail}
                            placeholder="user@example.com"
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          hasFeedback
                          label={'Contraseña'}
                          name={'PASSWORD'}
                          rules={[{ required: true }]}
                        >
                          <CustomPasswordInput placeholder="Contraseña" />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol {...defaultBreakpoints}>
                        <CustomFormItem
                          dependencies={['PASSWORD']}
                          hasFeedback
                          label={'Repetir'}
                          name={'_PASSWORD'}
                          rules={[
                            { required: true },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue('PASSWORD') === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    'Las contraseñas no coinciden, por favor intente de nuevo',
                                  ),
                                );
                              },
                            }),
                          ]}
                        >
                          <CustomPasswordInput placeholder="Contraseña" />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomCol xs={24}>
                        <CustomFormItem label={'Sobre ti'} name={'ABOUT'}>
                          <CustomTextArea
                            maxLength={700}
                            showCount
                            autoSize={{ minRows: 5 }}
                          />
                        </CustomFormItem>
                      </CustomCol>
                      <CustomButton
                        type={'primary'}
                        block
                        onClick={handleOnFinish}
                      >
                        Registrarse
                      </CustomButton>
                      <br />
                      <br />
                      <br />
                      <CustomRow justify={'center'}>
                        <CustomText style={{ textAlign: 'center' }}>
                          ¿Ya tienes una cuenta?{' '}
                          <Link href={PATH_LOGIN}>Inicia sesión</Link>
                        </CustomText>
                      </CustomRow>
                    </CustomRow>
                  </CustomForm>
                </CustomRow>
                <CoverContainer>
                  <img src={'/assets/img/unsplash.jpg'} />
                </CoverContainer>
              </CustomFlex>
            </Card>
          </CustomRow>
        </CustomSpin>
      </Body>

      <AvatarSelector
        open={visible}
        onSelect={setAvatar}
        onClose={setVisible}
      />
    </>
  );
};

export default RegisterUser;
