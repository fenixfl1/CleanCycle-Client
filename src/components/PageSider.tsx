import React, { useMemo, useState } from 'react';
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
  PATH_POSTS_CREATE_POSTS,
  PATH_RECYCLING_POINTS,
  PATH_USER_PROFILE,
} from '@/constants/routes';
import {
  EditOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { ConditionalComponent, ExchangeItemForm, MotionComponent } from '.';
import CustomAvatar from './antd/CustomAvatar';
import { CustomText } from './antd/CustomTypography';
import CustomDivider from './antd/CustomDivider';
import CustomButton from './antd/CustomButton';
import { CustomModalConfirmation } from './antd/ModalMethods';
import CustomSpace from './antd/CustomSpace';

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

const ActionContainer = styled.div`
  margin: 0 5px;
  width: 100%;

  .ant-btn {
    display: flex !important;
    justify-content: start !important;
    align-items: center !important;
    padding-left: 24px;

    .ant-btn-icon {
      margin-right: 10px !important;
    }
  }
`;

const PageSider: React.FC = () => {
  const router = useRouter();
  const [exchangeFormIsOpen, setExchangeFormIsOpen] = useState(false);

  const isExchanges = useMemo(() => {
    return router.pathname?.includes(PATH_EXCHANGES);
  }, [router]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <HomeOutlined style={iconStyle} />,
      label: 'Inicio',
      onClick: () => router.push(PATH_HOME),
    },
    {
      key: '2',
      icon: <EnvironmentOutlined style={iconStyle} />,
      label: 'Puntos de reciclaje',
      onClick: () => router.push(PATH_RECYCLING_POINTS),
    },
    {
      key: '3',
      icon: <SwapOutlined style={iconStyle} />,
      label: 'Intercambios',
      onClick: () => router.push(PATH_EXCHANGES),
    },
  ];

  const handleOnCloseExchangeForm = (data: any) => {
    if (Object.values(data).some((value) => value)) {
      return CustomModalConfirmation({
        title: '¿Estás seguro de cerrar el formulario?',
        content: 'Los datos ingresados se perderán.',
        onOk: () => setExchangeFormIsOpen(false),
      });
    }

    setExchangeFormIsOpen(false);
  };

  return (
    <>
      <Sider trigger={null} width={255}>
        <SiderContainer>
          <CustomRow width={'100%'} justify={'center'}>
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
            <div style={{ padding: '0 10px', width: '100%' }}>
              <CustomDivider />
            </div>
            <ActionContainer>
              <MotionComponent>
                <ConditionalComponent condition={isLoggedIn()}>
                  <CustomSpace>
                    <ConditionalComponent condition={isExchanges}>
                      <CustomButton
                        block
                        icon={<PlusOutlined />}
                        onClick={() => setExchangeFormIsOpen(true)}
                        size={'large'}
                        type={'text'}
                      >
                        Publicar un intercambio
                      </CustomButton>
                    </ConditionalComponent>
                    <CustomButton
                      block
                      icon={<EditOutlined />}
                      size={'large'}
                      type={'text'}
                      onClick={() => router.push(PATH_POSTS_CREATE_POSTS)}
                    >
                      Crea un post
                    </CustomButton>
                  </CustomSpace>
                </ConditionalComponent>
              </MotionComponent>
            </ActionContainer>
          </CustomRow>
        </SiderContainer>
      </Sider>

      <ExchangeItemForm
        open={exchangeFormIsOpen}
        onCancel={handleOnCloseExchangeForm}
      />
    </>
  );
};

export default PageSider;
