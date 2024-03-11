import { LockOutlined } from '@ant-design/icons';
import { Input, InputRef } from 'antd';
import { PasswordProps } from 'antd/es/input';
import { forwardRef } from 'react';

const { Password } = Input;

const CustomPasswordInput = forwardRef<InputRef, PasswordProps>(
  ({ ...props }, ref) => {
    return <Password prefix={<LockOutlined />} {...props} ref={ref} />;
  },
);

export default CustomPasswordInput;
