import { RecyclingPoint } from '@/redux/slices/recyclingPointsSlice';
import {
  CarOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import CustomCard from './antd/CustomCard';
import CustomCol from './antd/CustomCol';
import CustomRow from './antd/CustomRow';
import Subtitle from './styled/SubTitle';
import useGetLocation from '@/hooks/useGetLocation';
import { ConditionalComponent } from '.';
import CustomButton from './antd/CustomButton';
import CustomSpace from './antd/CustomSpace';
import { Location } from '@/constants/types';
import useCalculateRoute from '@/hooks/useCalculateRoute';

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 25.8em;
  height: 100%;
  min-height: 12rem;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;

  border-radius: ${({ theme }) => theme.borderRadius};
`;

interface RecyclingPointsCardProps {
  point: RecyclingPoint;
  onShow?(point: Location): void;
  onShowInfo?(point: RecyclingPoint): void;
}

const RecyclingPointsCard: React.FC<RecyclingPointsCardProps> = ({
  point,
  onShow,
  onShowInfo,
}) => {
  const userLocation = useGetLocation();

  const [direction, distance, duration] = useCalculateRoute({
    lat: Number(point?.LATITUDE),
    lng: Number(point?.LONGITUDE),
  });

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ direction });
  }, [direction]);

  return (
    <Card key={point.RECYCLE_POINT_ID} hoverable>
      <CustomRow justify={'space-between'} align={'middle'}>
        <CustomCol xs={8}>
          <Img
            src={
              point.COVER ||
              'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
            }
            alt={point.LOCATION_NAME}
          />
        </CustomCol>

        <CustomCol xs={15}>
          <p>
            <strong>{point.LOCATION_NAME}</strong>
          </p>

          <p>
            Distancia/Tiempo:{' '}
            <ConditionalComponent
              condition={!!distance}
              fallback={
                <>
                  {' '}
                  <LoadingOutlined /> Calculando...
                </>
              }
            >
              <Subtitle>
                {distance} {duration} <CarOutlined />
              </Subtitle>
            </ConditionalComponent>
          </p>
        </CustomCol>

        <CustomCol xs={24}>
          <CustomSpace direction={'horizontal'} size={10}>
            <CustomButton
              icon={<EnvironmentOutlined />}
              type={'link'}
              onClick={() =>
                onShow?.({
                  lat: Number(point.LATITUDE),
                  lng: Number(point.LONGITUDE),
                })
              }
            >
              Ver en el map
            </CustomButton>
            <CustomButton
              icon={<InfoCircleOutlined />}
              type={'link'}
              onClick={() => onShowInfo?.(point)}
            >
              Mas información
            </CustomButton>
          </CustomSpace>
        </CustomCol>
      </CustomRow>
    </Card>
  );
};

export default RecyclingPointsCard;
