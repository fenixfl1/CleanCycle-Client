import { TruckRoutes } from '@/components';
import Body from '@/components/Body';
import CustomCard from '@/components/antd/CustomCard';
import CustomCol from '@/components/antd/CustomCol';
import CustomFlex from '@/components/antd/CustomFlex';
import CustomRow from '@/components/antd/CustomRow';
import { useRouter } from 'next/router';
import React, { use } from 'react';

const RecyclingPointPage: React.FC = () => {
  const { recycling_point_id } = useRouter().query;
  return (
    <Body>
      <CustomRow style={{ width: '100%' }}>
        <CustomCol xs={24} style={{ height: '500px' }}>
          <TruckRoutes
            route={{
              origin: { lat: 18.735693, lng: -70.162651 },
              destination: { lat: 18.735693, lng: -70.162651 },
            }}
          />
        </CustomCol>
      </CustomRow>
    </Body>
  );
};

export default RecyclingPointPage;
