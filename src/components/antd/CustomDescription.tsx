import React from 'react';
import Description, { DescriptionsProps } from 'antd/lib/descriptions';

const CustomDescription: React.FC<DescriptionsProps> = ({
  size = 'middle',
  ...props
}) => {
  return <Description size={size} {...props} />;
};

export default CustomDescription;
