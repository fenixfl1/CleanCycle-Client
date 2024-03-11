import { User } from '@/redux/slices/userSlice';
import React from 'react';
import CustomModal from './antd/CustomModal';
import CustomForm from './antd/CustomForm';
import CustomCol from './antd/CustomCol';
import CustomFormItem from './antd/CustomFormItem';
import CustomPasswordInput from './antd/CustomPasswordInput';
import { Form } from 'antd';
import customNotification from './antd/customNotification';
import { useChangePassword } from '@/services/user';
import CustomSpin from './antd/CustomSpin';

interface ChangePasswordProps {
  open?: boolean;
  onCancel?(): void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onCancel, open }) => {
  const [form] = Form.useForm();

  const [changePassword, { isLoading }] = useChangePassword();

  const handleOnOk = async () => {
    try {
      const values = await form.validateFields();
      await changePassword({
        OLD_PASSWORD: values.OLD_PASSWORD,
        NEW_PASSWORD: values.NEW_PASSWORD,
      }).unwrap();

      customNotification({
        type: 'success',
        title: 'Contraseña actualizada',
        description: 'La contraseña ha sido actualizada con éxito',
      });

      form.resetFields();
      onCancel?.();
    } catch ({ data }) {
      customNotification({
        type: 'error',
        title: 'Error',
        description: data.error,
      });
    }
  };

  return (
    <CustomModal
      centered
      open={open}
      width={300}
      onCancel={onCancel}
      onOk={handleOnOk}
    >
      <CustomSpin spinning={isLoading}>
        <CustomForm layout="vertical" form={form}>
          <CustomCol span={24}>
            <CustomFormItem
              label={'Contraseña actual'}
              name={'OLD_PASSWORD'}
              rules={[{ required: true }]}
            >
              <CustomPasswordInput placeholder="Contraseña actual" />
            </CustomFormItem>
          </CustomCol>
          <CustomCol span={24}>
            <CustomFormItem
              label={'Nueva contraseña'}
              name={'NEW_PASSWORD'}
              rules={[{ required: true }]}
            >
              <CustomPasswordInput placeholder="Nueva contraseña" />
            </CustomFormItem>
          </CustomCol>
          <CustomCol span={24}>
            <CustomFormItem
              dependencies={['NEW_PASSWORD']}
              hasFeedback
              label={'Repetir'}
              name={'_PASSWORD'}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('NEW_PASSWORD') === value) {
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
              <CustomPasswordInput placeholder="Confirmar nueva contraseña" />
            </CustomFormItem>
          </CustomCol>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  );
};

export default ChangePassword;
