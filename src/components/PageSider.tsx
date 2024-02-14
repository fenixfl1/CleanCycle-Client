import React, { useMemo } from 'react';
import { MenuProps } from 'antd';
import { getSessionInfo, isLoggedIn } from '../lib/session';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import CustomSider from './antd/CustomSider';
import CustomRow from './antd/CustomRow';
import CustomCol from './antd/CustomCol';
import CustomMenu from './antd/CustomMenu';
import {
  PATH_EXCHANGES,
  PATH_HOME,
  PATH_LOGIN,
  PATH_RECYCLING_POINTS,
  PATH_REGISTER_USER,
  PATH_USER_PROFILE,
} from '@/constants/routes';
import {
  HomeOutlined,
  EnvironmentOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { ConditionalComponent, Darkreader, MotionComponent } from '.';
import CustomAvatar from './antd/CustomAvatar';
import { CustomText } from './antd/CustomTypography';
import CustomDivider from './antd/CustomDivider';

const Sider = styled(CustomSider)`
  display: ${({ collapsed }) => (collapsed ? 'none' : undefined)};
  transition: width 0.2s ease-in-out;
  box-shadow: ${({ theme }) => theme.boxShadow} !important;
  padding: 20px;
`;

const AvatarContainer = styled(CustomRow)`
  width: 100%;
  height: 120px;
  margin: 10px;
`;

const Menu = styled(CustomMenu)`
  background: ${({ theme }) => theme.whiteBackground} !important;
  shadow: ${({ theme }) => theme.boxShadow} !important;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const LogoContainer = styled(CustomRow)`
  width: 100%;
  height: 150px;
  margin: 10px;
  // background: ${({ theme }) => theme.secondaryColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 1px 1px 8px -5px rgba(0, 0, 0, 0.75);
`;

const SiderContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const iconStyle: React.CSSProperties = {
  fontSize: '1.3rem',
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
    icon: <SwapOutlined style={iconStyle} />,
    label: <Link href={PATH_EXCHANGES}>Intercambios</Link>,
  },
];

const PageSider: React.FC = () => {
  const router = useRouter();

  const hideSider = useMemo(() => {
    return (
      router.pathname === PATH_LOGIN || router.pathname === PATH_REGISTER_USER
    );
  }, [router]);

  return (
    <Sider trigger={null} width={255}>
      <SiderContainer>
        <CustomRow width={'100%'} justify={'center'}>
          {/* <LogoContainer justify={'center'} align={'middle'}>
            <Logo />
          </LogoContainer> */}
          <AvatarContainer align={'middle'} justify={'center'}>
            <ConditionalComponent
              condition={isLoggedIn()}
              fallback={
                <>
                  <CustomAvatar
                    size={72}
                    shadow
                    icon={<UserOutlined />}
                    src={getSessionInfo().AVATAR}
                  />
                  <CustomCol xs={24}>
                    <CustomRow justify={'center'}>
                      <CustomText
                        type={'secondary'}
                        strong
                        style={{ fontSize: 14 }}
                      >
                        Usuario Anónimo
                      </CustomText>
                    </CustomRow>
                  </CustomCol>
                </>
              }
            >
              <>
                <Link
                  href={PATH_USER_PROFILE}
                  as={PATH_USER_PROFILE.replace(
                    '[username]',
                    getSessionInfo().USERNAME,
                  )}
                >
                  <CustomAvatar
                    size={72}
                    shadow
                    icon={<UserOutlined />}
                    src={getSessionInfo().AVATAR}
                  />
                  <CustomCol xs={24}>
                    <CustomRow justify={'center'}>
                      <CustomText
                        type={'secondary'}
                        strong
                        style={{ fontSize: 14 }}
                      >
                        @{getSessionInfo().USERNAME}
                      </CustomText>
                    </CustomRow>
                  </CustomCol>
                </Link>
              </>
            </ConditionalComponent>
          </AvatarContainer>
          <CustomCol xs={22}>
            <CustomRow justify={'center'}>
              <CustomDivider />
            </CustomRow>
          </CustomCol>
          <Menu mode={'inline'} items={items} />
        </CustomRow>
        <CustomRow
          justify={'center'}
          align={'middle'}
          style={{ padding: '20px' }}
        >
          <Darkreader />
        </CustomRow>
      </SiderContainer>
    </Sider>
  );
};

export default PageSider;
