import Body from '@/components/Body';
import CustomCard from '@/components/antd/CustomCard';
import CustomFlex from '@/components/antd/CustomFlex';
import CustomRow from '@/components/antd/CustomRow';
import { useRouter } from 'next/router';
import React, { use } from 'react';

const RecyclingPointPage: React.FC = () => {
  const { recycling_point_id } = useRouter().query;
  return (
    <Body>
      <CustomRow style={{ width: '100%' }}>
        <CustomCard
          style={{
            width: '22rem',
            height: '12rem',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
          assumenda alias. Quod a, nobis, atque quibusdam exercitationem ea
          neque sint magni doloremque rerum nostrum voluptates magnam
          consequuntur. Eius, autem accusamus!
        </CustomCard>
      </CustomRow>
    </Body>
  );
};

export default RecyclingPointPage;
