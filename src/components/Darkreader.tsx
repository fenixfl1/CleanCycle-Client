import React from 'react';
import { useDarkreader } from 'react-darkreader';
import CustomSwitch from './antd/CustomSwitch';

const Darkreader: React.FC = () => {
  const [isDark, { toggle }] = useDarkreader();
  return (
    <CustomSwitch
      checkedChildren={'🌞'}
      unCheckedChildren={'🌙'}
      defaultChecked={isDark}
      onChange={toggle}
    />
  );
};

export default Darkreader;
