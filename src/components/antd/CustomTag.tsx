import { defaultTheme } from '@/themes/themes';
import { Tag, TagProps } from 'antd';
import React from 'react';

const CustomTag: React.FC<TagProps> = ({
  color = defaultTheme.secondaryColor,
  ...props
}) => {
  return (
    <Tag color={color} {...props}>
      {props.children}
    </Tag>
  );
};

export default CustomTag;
