import { User } from '@/redux/slices/userSlice';
import React, { useState } from 'react';
import CustomDescription from './antd/CustomDescription';
import { dateTransform } from '@/helpers/dateTransform';
import {
  CustomLink,
  CustomParagraph,
  CustomText,
} from './antd/CustomTypography';
import { DescriptionsProps } from 'antd';
import ChangePassword from './ChangePassword';
import CustomSpace from './antd/CustomSpace';
import { EditOutlined } from '@ant-design/icons';
import CustomRow from './antd/CustomRow';
import CustomButton from './antd/CustomButton';

interface UserInfoProps {
  user: User;
  onUpdate?(user: Partial<User>): void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onUpdate }) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const editableFullName = {
    editable: true,
    onChange: (value: string) => {
      onUpdate?.({ FULL_NAME: value });
    },
  };

  const editableEmail = {
    editable: true,
    onChange: (value: string) => {
      onUpdate?.({ EMAIL: value });
    },
  };

  const editableAbout = {
    editable: true,
    onChange: (value: string) => {
      onUpdate?.({ ABOUT: value });
    },
  };

  const items: DescriptionsProps['items'] = [
    {
      key: 'full_name',
      label: 'Nombre completo',
      children: (
        <CustomText editable={editableFullName}>{user?.FULL_NAME}</CustomText>
      ),
      span: 2,
    },
    {
      key: 'username',
      label: 'Usuario',
      children: <CustomText decorator={'@'}>{user?.USERNAME}</CustomText>,
      span: 2,
    },
    {
      key: 'email',
      label: 'Correo',
      children: <CustomText editable={editableEmail}>{user?.EMAIL}</CustomText>,
      span: 2,
    },
    {
      key: 'password',
      label: 'Contraseña',
      children: (
        <CustomText>
          ***********{' '}
          <CustomLink onClick={() => setChangePasswordModal(true)}>
            <EditOutlined />
          </CustomLink>
        </CustomText>
      ),
      span: 2,
    },
    {
      key: 'about',
      label: 'Acerca de mi',
      children: (
        <CustomParagraph editable={editableAbout}>
          {user?.ABOUT}
        </CustomParagraph>
      ),
      span: 3,
    },
    {
      key: 'post_count',
      label: 'Publicaciones',
      children: user?.POSTS?.length,
    },
    {
      key: 'followers',
      label: 'Seguidores',
      children: user?.FOLLOWERS?.length,
    },
    {
      key: 'following',
      label: 'Siguiendo',
      children: user?.FOLLOWING?.length,
    },
    {
      key: 'join_date',
      label: 'Fecha de registro',
      children: dateTransform(user?.CREATED_AT),
    },
  ];

  return (
    <>
      <CustomDescription items={items} column={3} bordered />
      <ChangePassword
        open={changePasswordModal}
        onCancel={() => setChangePasswordModal(false)}
      />
    </>
  );
};

export default UserInfo;
