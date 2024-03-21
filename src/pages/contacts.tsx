/* eslint-disable no-console */
import Body from '@/components/Body';
import CustomButton from '@/components/antd/CustomButton';
import CustomCol from '@/components/antd/CustomCol';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomForm from '@/components/antd/CustomForm';
import CustomFormItem from '@/components/antd/CustomFormItem';
import CustomInput from '@/components/antd/CustomInput';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomTextArea from '@/components/antd/CustomTextArea';
import CustomTitle from '@/components/antd/CustomTitle';
import { CustomModalSuccess } from '@/components/antd/ModalMethods';
import customNotification from '@/components/antd/customNotification';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SendOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Form } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.backgroundColor};
`;

interface FormProps {
  USERNAME: string;
  EMAIL: string;
  MENSAJE: string;
}

const Contacts: React.FC = () => {
  const [form] = Form.useForm<FormProps>();

  const iconStyle = {
    fontSize: '1.3rem',
  };

  useEffect(() => {
    if (isLoggedIn()) {
      const { USERNAME, EMAIL } = getSessionInfo();
      form.setFieldsValue({ USERNAME, EMAIL });
    }
  }, [form]);

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields();

      customNotification({
        placement: 'top',
        type: 'success',
        title: 'Mensaje enviado',
        description:
          'Gracias por escribirnos, te responderemos lo antes posible.',
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Body>
      <Container>
        <CustomDivider>
          <CustomTitle>Escríbenos</CustomTitle>
        </CustomDivider>
        <CustomCol xs={24}>
          <CustomForm form={form} layout="vertical">
            <CustomRow justify={'end'}>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Nombre'}
                  name={'USERNAME'}
                  rules={[{ required: true }]}
                >
                  <CustomInput readOnly={isLoggedIn()} placeholder="Nombre" />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Correo'}
                  name={'EMAIL'}
                  rules={[{ required: true, type: 'email' }]}
                >
                  <CustomInput readOnly={isLoggedIn()} placeholder="Correo" />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={'Mensaje'}
                  name={'MENSAJE'}
                  rules={[{ required: true }]}
                >
                  <CustomTextArea
                    placeholder="Mensaje"
                    maxLength={500}
                    showCount
                    autoSize={{ minRows: 5 }}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomFormItem>
                <CustomButton
                  icon={<SendOutlined />}
                  type="primary"
                  onClick={handleOnFinish}
                >
                  Enviar
                </CustomButton>
              </CustomFormItem>
            </CustomRow>
          </CustomForm>
        </CustomCol>
        <CustomDivider />
        <CustomCol xs={24}>
          <CustomSpace direction="horizontal" size={20}>
            <Link href="https://www.facebook.com/">
              <FacebookOutlined style={iconStyle} />
            </Link>
            <Link href="https://www.instagram.com/">
              <InstagramOutlined style={iconStyle} />
            </Link>
            <Link href="">
              <WhatsAppOutlined style={iconStyle} />
            </Link>
            <Link href="https://www.youtube.com/">
              <YoutubeOutlined style={iconStyle} />
            </Link>
            <Link href="https://www.linkedin.com/">
              <LinkedinOutlined style={iconStyle} />
            </Link>
          </CustomSpace>
        </CustomCol>
      </Container>
    </Body>
  );
};

export default Contacts;
