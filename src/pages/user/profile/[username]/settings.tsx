import { UserInfo, UserListRender } from '@/components';
import Body from '@/components/Body';
import CustomAvatar from '@/components/antd/CustomAvatar';
import CustomButton from '@/components/antd/CustomButton';
import CustomCol from '@/components/antd/CustomCol';
import CustomCollapse from '@/components/antd/CustomCollapse';
import CustomDescription from '@/components/antd/CustomDescription';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomTitle from '@/components/antd/CustomTitle';
import { CustomText } from '@/components/antd/CustomTypography';
import customNotification from '@/components/antd/customNotification';
import { WEB_API_PATH_GET_USER } from '@/constants/routes';
import { dateTransform } from '@/helpers/dateTransform';
import { User } from '@/redux/slices/userSlice';
import { getRequest } from '@/services/api';
import {
  useFollowUser,
  useGetBlockedUsers,
  useGetFollowers,
  useUnblockUser,
  useUpdateUser,
} from '@/services/user';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { CollapseProps, DescriptionsProps } from 'antd';
import { GetServerSidePropsContext } from 'next';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 80px;
  position: relative;
  box-sizing: border-box;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};

  .avatar-shadow {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    bottom: 27px;
    right: 38px;
    background: ${({ theme }) => theme.whiteBackground};
    rotate: -45deg;
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  top: -50px;
  right: 10px;
  padding: 0 20px;
  width: max-content;

  .ant-avatar {
    position: relative;
    z-index: 2;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  .upload-button {
    position: absolute;
    bottom: 0;
    right: 31px;
    z-index: 999;
  }

  &::before {
    content: '';
    height: 105px;
    width: 110px;
    border-radius: 0 0 50% 50%;
    position: absolute;
    top: 0;
    right: 15px;
    background: ${({ theme }) => theme.whiteBackground};
  }
`;

const defaultActiveKey = ['blocked_users', 'followers', 'following'];

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [updateUser, { data: updatedUser, isLoading: fetchingUpdateUser }] =
    useUpdateUser();
  const [unlockUser] = useUnblockUser();
  const [unFollowUser] = useFollowUser();
  const { data: follow, refetch: getFollow } = useGetFollowers(user.USERNAME, {
    skip: !user.USER_ID,
  });
  const { data: blockedUsers, refetch: getBlockedUsers } =
    useGetBlockedUsers('');

  const currentUser = useMemo(() => {
    if (updatedUser) {
      return updatedUser;
    }

    return user;
  }, [user, updatedUser]);

  const handleUpdateUserInfo = async (data: User) => {
    try {
      await updateUser({
        ...data,
        USERNAME: currentUser.USERNAME,
        USER_ID: currentUser.USER_ID,
      }).unwrap();
    } catch ({ data }) {
      customNotification({
        type: 'error',
        title: 'Error',
        description: data.error || 'Ha ocurrido un error. Intente de nuevo',
      });
    }
  };

  const handleUnblockUser = async (user: User) => {
    await unlockUser({ USERNAME: user.USERNAME }).unwrap();
    await getBlockedUsers();
  };

  const handleUnFollowUser = async (user: User) => {
    await unFollowUser({ USERNAME: user.USERNAME }).unwrap();
    await getFollow();
  };

  const dividerStyle: React.CSSProperties = { marginTop: 0, marginBottom: 2 };

  const collapseItems: CollapseProps['items'] = [
    {
      key: 'blocked_users',
      label: 'Usuarios bloqueados',
      children: (
        <>
          <CustomDivider style={dividerStyle} />
          <UserListRender
            type={'blocked'}
            dataSource={blockedUsers}
            onUpdate={handleUnblockUser}
          />
        </>
      ),
    },
    {
      key: 'followers',
      label: 'Seguidores',
      children: (
        <>
          <CustomDivider style={dividerStyle} />
          <UserListRender dataSource={follow?.FOLLOWERS} type={'followers'} />
        </>
      ),
    },
    {
      key: 'following',
      label: 'Siguiendo',
      children: (
        <>
          <CustomDivider style={dividerStyle} />
          <UserListRender
            dataSource={follow?.FOLLOWINGS}
            type={'following'}
            onUpdate={handleUnFollowUser}
          />
        </>
      ),
    },
  ];

  return (
    <Body style={{ marginTop: 20 }}>
      <CustomRow justify={'center'} gap={10} width={'100%'}>
        <CustomCol xs={20}>
          <Container>
            <CustomRow
              justify={'start'}
              align={'middle'}
              gap={0}
              height={'80px'}
              style={{ alignSelf: 'flex-start', paddingLeft: 20 }}
            >
              <CustomCol xs={24}>
                <CustomTitle style={{ height: '5px' }}>
                  {currentUser?.FULL_NAME}
                </CustomTitle>
              </CustomCol>
              <CustomText type={'secondary'}>
                @{currentUser?.USERNAME}
              </CustomText>
            </CustomRow>
            <AvatarContainer>
              <CustomAvatar
                icon={<UserOutlined />}
                size={100}
                src={currentUser?.AVATAR}
                shadow
              />
              <CustomButton
                shape={'circle'}
                className={'upload-button'}
                icon={<UploadOutlined />}
                onClick={() => setVisible(true)}
              />
            </AvatarContainer>
            <div className="avatar-shadow" />
          </Container>
        </CustomCol>
        <CustomCol xs={20}>
          <Container>
            <UserInfo user={currentUser} onUpdate={handleUpdateUserInfo} />
          </Container>
        </CustomCol>

        <CustomCol xs={20}>
          <CustomCollapse
            defaultActiveKey={defaultActiveKey}
            items={collapseItems}
          />
        </CustomCol>
      </CustomRow>
    </Body>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.params as { username: string };
  try {
    const response = await getRequest<User>(
      `${WEB_API_PATH_GET_USER}/${username}`,
    );

    return {
      props: {
        user: response?.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Settings;
