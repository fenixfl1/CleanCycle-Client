import { Tabs, TabsProps } from 'antd';
import React from 'react';

const CustomTabs: React.FC<TabsProps> = ({
  type = 'card',
  size = 'middle',
  centered = true,
  ...props
}) => {
  return <Tabs centered={centered} type={type} size={size} {...props} />;
};

export default CustomTabs;
