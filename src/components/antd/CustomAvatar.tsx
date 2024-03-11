import React from 'react';
import { Avatar, AvatarProps } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

const SAvatar = styled(Avatar)<{ shadow?: boolean }>`
  box-shadow: ${({ shadow, theme }) => (shadow ? theme.boxShadow : 'none')};
`;

interface CustomAvatarProps extends AvatarProps {
  shadow?: boolean;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  shadow = false,
  ...props
}): React.ReactElement => {
  return <SAvatar icon={<UserOutlined />} shadow={shadow} {...props} />;
};

export default CustomAvatar;
