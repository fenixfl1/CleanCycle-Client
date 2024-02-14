import { SearchComponent } from '@/components';
import Body from '@/components/Body';
import CustomRow from '@/components/antd/CustomRow';
import React, { useState } from 'react';

const Exchanges: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Body>
      <SearchComponent onSearch={setSearchValue} />

      <CustomRow>
        
      </CustomRow>
    </Body>
  );
};

export default Exchanges;
