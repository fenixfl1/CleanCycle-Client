import { MenuProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import CustomHeader from './antd/CustomHeader';
import CustomMenu from './antd/CustomMenu';
import Link from 'next/link';
import CustomAvatar from './antd/CustomAvatar';
import {
  PATH_ABOUT,
  PATH_CONTACT,
  PATH_HOME,
  PATH_LOGIN,
  PATH_RECYCLING_POINTS,
  PATH_REGISTER_USER,
  WEB_API_RANDOM_USER_AVATAR,
} from '@/constants/routes';
import ConditionalComponent from './ConditionalComponent';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import CustomButton from './antd/CustomButton';
import { useRouter } from 'next/router';
import Logo from './styled/Logo';
import CustomPopover from './antd/CustomPopover';
import CustomSpace from './antd/CustomSpace';
import { PersonCircleOutlined, GearOutlined, PowerOutlined } from '@/icons';
import { CustomModalConfirmation } from './antd/ModalMethods';
import { useAppDispatch } from '@/redux/store';
import sleep from '@/helpers/sleep';
import { logout } from '@/redux/slices/userSlice';
import {
  EnvironmentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Darkreader } from '.';

const getAvatar = (index: number) =>
  WEB_API_RANDOM_USER_AVATAR.replace('[index]', `${index}`);

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled(CustomMenu)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  background: ${({ theme }) => theme.secondaryColor} !important;
  color: #fff;

  .ant-menu-item {
    background: ${({ theme }) => theme.secondaryColor} !important;
  }

  @media (max-width: 1819px) {
    width: 40%;
  }
`;

const Avatar = styled(CustomAvatar)`
  background-color: ${({ theme }) =>
    theme.theme === 'light' ? '#fff' : '#000000'};
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const iconStyle: React.CSSProperties = {
  fontSize: '1rem',
  // color: defaultTheme.primaryColor,
};

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <HomeOutlined style={iconStyle} />,
    label: <Link href={PATH_HOME}>Inicio</Link>,
  },
  {
    key: '2',
    icon: <EnvironmentOutlined style={iconStyle} />,
    label: <Link href={PATH_RECYCLING_POINTS}>Puntos de reciclaje</Link>,
  },
  {
    key: '3',
    icon: <InfoCircleOutlined style={iconStyle} />,
    label: <Link href={PATH_ABOUT}>Sobre nosotros</Link>,
  },
  {
    key: '4',
    icon: <MailOutlined style={iconStyle} />,
    label: <Link href={PATH_CONTACT}>Contactos</Link>,
  },
];

const PageHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const handleGetLogin = () => {
    const pathname = route.pathname;
    route.push(
      pathname !== PATH_HOME ? `${PATH_LOGIN}?next=${pathname}` : PATH_LOGIN,
    );
  };

  const confirmLogout = () => {
    CustomModalConfirmation({
      title: 'Cerrar sesión',
      content: '¿Está seguro de cerrar sesión?',
      centered: true,
      onOk: async () => {
        route.push(PATH_LOGIN);
        await sleep(1);
        dispatch(logout());
        route.reload();
      },
    });
  };

  const content = (
    <CustomSpace size={5}>
      <CustomButton
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
        block
        size={'large'}
        type={'text'}
        icon={<PersonCircleOutlined size={20} />}
        // onClick={() => getUser(userId)}
      >
        Perfil
      </CustomButton>

      <CustomButton
        block
        size={'large'}
        type={'text'}
        icon={<GearOutlined size={20} />}
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        Configuraciones
      </CustomButton>
      <CustomButton
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
        onClick={confirmLogout}
        block
        size={'large'}
        type={'text'}
        icon={<PowerOutlined size={20} />}
      >
        Cerrar sesión
      </CustomButton>
    </CustomSpace>
  );

  return (
    <CustomHeader className={'main-page-header'}>
      <Logo />

      <Menu mode={'horizontal'} selectable={false} items={items} />
      <AvatarContainer>
        <CustomSpace size={10} direction="horizontal">
          <Darkreader />
          <ConditionalComponent
            condition={isLoggedIn()}
            fallback={
              <ConditionalComponent
                condition={
                  route.pathname !== PATH_LOGIN &&
                  route.pathname !== PATH_REGISTER_USER
                }
              >
                <CustomButton onClick={handleGetLogin} type={'primary'}>
                  Iniciar sesión
                </CustomButton>
              </ConditionalComponent>
            }
          >
            <CustomPopover content={content}>
              <Avatar
                shadow
                size={44}
                src={getSessionInfo().AVATAR}
                icon={<PersonCircleOutlined />}
              />
            </CustomPopover>
          </ConditionalComponent>
        </CustomSpace>
      </AvatarContainer>
    </CustomHeader>
  );
};

export default PageHeader;
