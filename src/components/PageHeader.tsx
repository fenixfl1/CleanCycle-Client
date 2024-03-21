import React from 'react';
import styled from 'styled-components';
import CustomHeader from './antd/CustomHeader';
import Link from 'next/link';
import CustomAvatar from './antd/CustomAvatar';
import {
  PATH_CONTACT,
  PATH_HELP,
  PATH_HOME,
  PATH_LOGIN,
  PATH_REGISTER_USER,
  PATH_USER_PROFILE,
  PATH_USER_SETTINGS,
} from '@/constants/routes';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import { useRouter } from 'next/router';
import CustomSpace from './antd/CustomSpace';
import { GearOutlined, PersonCircleOutlined, PowerOutlined } from '@/icons';
import { CustomModalConfirmation } from './antd/ModalMethods';
import { useAppDispatch } from '@/redux/store';
import sleep from '@/helpers/sleep';
import { logout } from '@/redux/slices/userSlice';
import CustomRow from './antd/CustomRow';
import Logo from './styled/Logo';
import CustomButton from '@/components/antd/CustomButton';
import {
  InfoCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import CustomTooltip from './antd/CustomTooltip';
import { defaultTheme } from '@/themes/themes';
import { MenuProps } from 'antd';
import CustomDivider from './antd/CustomDivider';
import CustomDropdown from './antd/CustomDropdown';
import ConditionalComponent from './ConditionalComponent';
import { CustomLink } from './antd/CustomTypography';
import { UserOutlined } from '@ant-design/icons';

const Dropdown = styled(CustomDropdown)`
  .ant-dropdown-menu-item {
    width: 180px !important;
  }

  .ant-dropdown-menu {
    background-color: ${({ theme }) => theme.secondaryColor} !important;
    width: 400x !important;
  }
`;

const DropdownContent = styled.div`
  // padding: 10px 20px;
  width: 200px;
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
      <CustomDivider />
      <CustomButton
        block
        size={'large'}
        type={'text'}
        icon={<MailOutlined size={20} />}
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        Contáctanos
      </CustomButton>
      <CustomButton
        block
        size={'large'}
        type={'text'}
        icon={<InfoCircleOutlined size={20} />}
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        Sobre Nosotros
      </CustomButton>
      <CustomButton
        block
        size={'large'}
        type={'text'}
        icon={<QuestionCircleOutlined size={20} />}
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        Página de Ayuda
      </CustomButton>
      <CustomDivider />
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
    color: defaultTheme.textColor,
  };

  const items: MenuProps['items'] = [
    {
      disabled: !isLoggedIn(),
      key: 'profile',
      icon: (
        <CustomAvatar shadow src={getSessionInfo().AVATAR} style={iconStyle} />
      ),
      label: (
        <CustomTooltip title={'Perfil'}>
          <Link
            style={{ marginLeft: '10px' }}
            href={PATH_USER_PROFILE}
            as={PATH_USER_PROFILE.replace(
              '[username]',
              getSessionInfo().USERNAME,
            )}
          >
            Perfil
          </Link>
        </CustomTooltip>
      ),
    },
    {
      disabled: !isLoggedIn(),
      key: 'settings',
      icon: <SettingOutlined style={iconStyle} />,
      label: (
        <CustomTooltip title={'Configuraciones'}>
          <Link
            style={{ marginLeft: '10px' }}
            href={PATH_USER_SETTINGS}
            as={PATH_USER_SETTINGS.replace(
              '[username]',
              getSessionInfo().USERNAME,
            )}
          >
            Configuraciones
          </Link>
        </CustomTooltip>
      ),
    },
    {
      type: 'divider',
      key: 'divider',
      label: 'divider',
      disabled: !isLoggedIn(),
    },
    {
      key: 'contact',
      icon: <MailOutlined style={iconStyle} />,
      label: (
        <CustomTooltip title={'Contacto'}>
          <Link style={{ marginLeft: '10px' }} href={PATH_CONTACT}>
            Contáctanos
          </Link>
        </CustomTooltip>
      ),
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined style={iconStyle} />,
      label: (
        <CustomTooltip title={'Pagina de ayuda'}>
          <Link style={{ marginLeft: '10px' }} href={PATH_HELP}>
            Pagina de ayuda
          </Link>
        </CustomTooltip>
      ),
    },
    {
      type: 'divider',
      key: 'divider',
      label: 'divider',
      disabled: !isLoggedIn(),
    },
    {
      disabled: !isLoggedIn(),
      key: 'sign-out',
      icon: <LogoutOutlined style={iconStyle} />,
      label: (
        <CustomTooltip title={'Cerrar Sesión'}>
          <CustomLink style={{ marginLeft: '10px' }} onClick={confirmLogout}>
            Cerrar Sesión
          </CustomLink>
        </CustomTooltip>
      ),
    },
  ].filter((item) => !item?.disabled);

  return (
    <CustomHeader className={'main-page-header'}>
      <CustomRow justify={'space-between'} align={'middle'} width={'100%'}>
        <Logo />
        <CustomSpace
          size={10}
          direction="horizontal"
          split={<CustomDivider type="vertical" />}
          width={'max-content'}
        >
          <ConditionalComponent condition={!isLoggedIn()}>
            <CustomButton
              icon={<LoginOutlined />}
              type={'primary'}
              onClick={handleGetLogin}
            >
              Iniciar Sesión
            </CustomButton>
          </ConditionalComponent>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => {
              return (
                <DropdownContent className={'dropdown-content'}>
                  {React.cloneElement(menu as React.ReactElement, {
                    boxShadow: 'none',
                    marginRight: '10px',
                  })}
                </DropdownContent>
              );
            }}
          >
            <CustomAvatar
              shadow
              style={{ cursor: 'pointer' }}
              size={44}
              src={getSessionInfo().AVATAR}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </CustomSpace>
      </CustomRow>
    </CustomHeader>
  );
};

export default PageHeader;
