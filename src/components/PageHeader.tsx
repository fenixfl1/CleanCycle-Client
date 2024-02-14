import React from 'react';
import styled from 'styled-components';
import CustomHeader from './antd/CustomHeader';
import CustomMenu from './antd/CustomMenu';
import Link from 'next/link';
import CustomAvatar from './antd/CustomAvatar';
import {
  PATH_CONTACT,
  PATH_HELP,
  PATH_HOME,
  PATH_LOGIN,
  PATH_REGISTER_USER,
  PATH_USER_PROFILE,
  WEB_API_RANDOM_USER_AVATAR,
} from '@/constants/routes';
import ConditionalComponent from './ConditionalComponent';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import { useRouter } from 'next/router';
import CustomPopover from './antd/CustomPopover';
import CustomSpace from './antd/CustomSpace';
import { PersonCircleOutlined, GearOutlined, PowerOutlined } from '@/icons';
import { CustomModalConfirmation } from './antd/ModalMethods';
import { useAppDispatch } from '@/redux/store';
import sleep from '@/helpers/sleep';
import { logout } from '@/redux/slices/userSlice';
import { Darkreader } from '.';
import CustomRow from './antd/CustomRow';
import Logo from './styled/Logo';
import CustomButton from '@/components/antd/CustomButton';
import {
  InfoCircleOutlined,
  LogoutOutlined,
  MailOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import CustomTooltip from './antd/CustomTooltip';
import CustomCol from './antd/CustomCol';
import { defaultTheme } from '@/themes/themes';
import { MenuProps } from 'antd';

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled(CustomMenu)`
  background: ${({ theme }) => theme.secondaryColor} !important;
  width: 100% !important;
`;

const Avatar = styled(CustomAvatar)`
  background-color: ${({ theme }) =>
    theme.theme === 'light' ? '#fff' : '#000000'};
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

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
      >
        <Link
          href={PATH_USER_PROFILE}
          as={PATH_USER_PROFILE.replace(
            '[username]',
            getSessionInfo().USERNAME,
          )}
        >
          Perfil
        </Link>
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

  const iconStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    color: defaultTheme.primaryColor,
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <CustomTooltip title={'Contacto'}>
          <Link href={PATH_CONTACT}>
            <MailOutlined style={iconStyle} />
          </Link>
        </CustomTooltip>
      ),
    },
    {
      key: '2',
      label: (
        <CustomTooltip title={'Pagina de ayuda'}>
          <Link href={PATH_HELP}>
            <QuestionCircleOutlined style={iconStyle} />
          </Link>
        </CustomTooltip>
      ),
    },
    {
      disabled: !isLoggedIn(),
      key: '3',
      label: (
        <CustomTooltip title={'Cerrar Sesión'}>
          <CustomButton
            type={'link'}
            onClick={confirmLogout}
            icon={<LogoutOutlined style={iconStyle} />}
          />
        </CustomTooltip>
      ),
    },
    {
      disabled: isLoggedIn(),
      key: '4',
      label: (
        <CustomTooltip title={'Modo Oscuro'}>
          <CustomButton onClick={handleGetLogin} type={'primary'}>
            Iniciar sesión
          </CustomButton>
        </CustomTooltip>
      ),
    },
  ].filter((item) => !item?.disabled);

  return (
    <CustomHeader className={'main-page-header'}>
      <CustomRow justify={'space-between'} align={'middle'} width={'100%'}>
        <Logo />

        <CustomCol xs={4}>
          <Menu mode="horizontal" items={items} />
        </CustomCol>
      </CustomRow>
      {/* <CustomRow justify={'end'} align={'middle'} width={'100%'}>
        <AvatarContainer>
          <CustomSpace size={10} direction="horizontal">
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
      </CustomRow> */}
    </CustomHeader>
  );
};

export default PageHeader;
