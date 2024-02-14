import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomDivider from './antd/CustomDivider';
import CustomFlex from './antd/CustomFlex';
import CustomTitle from './antd/CustomTitle';
import Subtitle from './styled/SubTitle';
import { RecyclingPoint } from '@/redux/slices/recyclingPointsSlice';
import useGetLocation from '@/hooks/useGetLocation';
import {
  CarOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import CustomCard from './antd/CustomCard';
import { ConditionalComponent } from '.';
import CustomButton from './antd/CustomButton';
import { Location } from '@/constants/types';

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 25.8em;
  height: 100%;
  min-height: 12em;
`;

interface NearestCenterProps {
  point: RecyclingPoint | undefined;
  onShow?(location: Location): void;
}

const NearestCenter: React.FC<NearestCenterProps> = ({ point, onShow }) => {
  const location = useGetLocation();
  const [distance, setDistance] = useState<string>();
  const [duration, setDuration] = useState<string>();

  const travelInfo = useCallback(async () => {
    const direction = new google.maps.DirectionsService();
    const result = await direction.route({
      origin: location,
      destination: {
        lat: Number(point?.LATITUDE),
        lng: Number(point?.LONGITUDE),
      },
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDistance((result.routes[0].legs[0].distance as any).text as string);
    setDuration((result.routes[0].legs[0].duration as any).text as string);
  }, [point]);

  useEffect(() => {
    travelInfo();
  }, [travelInfo]);

  return (
    <div style={{ width: 'max-content' }}>
      <Card>
        <CustomTitle level={3}>Punto de recolección más cercano</CustomTitle>
        <CustomDivider />
        <CustomFlex justify={'start'} align="center">
          <CustomTitle level={4}>
            Nombre:
            <br />
            <Subtitle>{point?.LOCATION_NAME}</Subtitle>
          </CustomTitle>
        </CustomFlex>
        <CustomDivider />
        <CustomFlex justify={'start'} align="center">
          <CustomTitle level={4}>
            Dirección:
            <br />
            <Subtitle>{point?.LOCATION_ADDRESS}</Subtitle>
          </CustomTitle>
        </CustomFlex>
        <CustomFlex justify={'start'} align="center">
          <CustomTitle level={4}>
            <p>
              Distancia:
              <br />
              <ConditionalComponent
                condition={!!distance}
                fallback={
                  <>
                    {' '}
                    <LoadingOutlined />
                    Calculando...
                  </>
                }
              >
                <Subtitle>
                  {distance}; {duration} <CarOutlined />
                </Subtitle>
              </ConditionalComponent>
              <br />
              <CustomButton
                type={'link'}
                icon={<EnvironmentOutlined />}
                onClick={() => {
                  onShow?.({
                    lat: Number(point?.LATITUDE),
                    lng: Number(point?.LONGITUDE),
                  });
                }}
              >
                Ver en el mapa
              </CustomButton>
            </p>
          </CustomTitle>
        </CustomFlex>
        <CustomDivider />
        <CustomFlex justify={'start'} align="center">
          <CustomTitle level={4}>
            Horario:
            <br />
            <Subtitle>Lunes a viernes de 8:00 AM a 5:00 PM</Subtitle>
          </CustomTitle>
        </CustomFlex>
        <CustomDivider />
        <CustomFlex justify={'start'} align="center">
          <CustomTitle level={4}>
            Contacto: <br />
            Tel: <Subtitle>{point?.PHONE}</Subtitle> <br />
            Email: <Subtitle>{point?.EMAIL}</Subtitle>
          </CustomTitle>
        </CustomFlex>
        <CustomDivider />
      </Card>
    </div>
  );
};

export default NearestCenter;
