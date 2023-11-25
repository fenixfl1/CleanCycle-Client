import React, { useEffect } from 'react';
import { MenuProps } from 'antd';
import { getSessionInfo } from '../lib/session';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import CustomImage from './antd/CustomImage';
import CustomSider from './antd/CustomSider';
import CustomRow from './antd/CustomRow';
import { useAppSelector } from '@/redux/store';
import CustomCol from './antd/CustomCol';
import CustomDivider from './antd/CustomDivider';
import CustomMenu from './antd/CustomMenu';
import { defaultTheme } from '@/themes/themes';
import {
  PATH_HOME,
  PATH_RECYCLING_POINTS,
  PATH_ABOUT,
  PATH_CONTACT,
} from '@/constants/routes';
import {
  HomeOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Darkreader } from '.';
import CustomButton from './antd/CustomButton';

const StyledSider = styled(CustomSider)`
  display: ${({ collapsed }) => (collapsed ? 'none' : undefined)};
  transition: width 0.2s ease-in-out;
  background: ${({ theme }) => theme.secondaryColor} !important;
  box-shadow: ${({ theme }) => theme.boxShadow} !important;
  padding: 20px;
`;

const iconStyle: React.CSSProperties = {
  fontSize: '1.2rem',
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

const PageSider: React.FC = () => {
  const router = useRouter();

  return (
    <StyledSider trigger={null} width={255}>
      <CustomMenu
        mode={'inline'}
        // defaultSelectedKeys={currentOption?.openKey}
        // defaultOpenKeys={currentOption?.openKey}
        style={{
          background: defaultTheme.whiteBackground,
          boxShadow: defaultTheme.boxShadow,
          borderRadius: defaultTheme.borderRadius,
        }}
        items={items}
      />
    </StyledSider>
  );
};

export default PageSider;
