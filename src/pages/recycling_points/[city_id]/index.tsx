import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ConditionalComponent,
  CustomGoogleMap,
  NearestCenter,
  RecyclingPointsCard,
} from '@/components';
import Body from '@/components/Body';
import CustomCard from '@/components/antd/CustomCard';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomFlex from '@/components/antd/CustomFlex';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomTitle from '@/components/antd/CustomTitle';
import { CustomText } from '@/components/antd/CustomTypography';
import useGetLocation from '@/hooks/useGetLocation';
import { useGetRecyclingPointsByCityQuery } from '@/services/recycling_points';
import { useRouter } from 'next/router';
import { Location } from '@/constants/types';
import styled from 'styled-components';
import CustomCol from '@/components/antd/CustomCol';
import Subtitle from '@/components/styled/SubTitle';
import CustomTag from '@/components/antd/CustomTag';
import useGetNearestLocation from '@/hooks/useGetNearestLocation';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { defaultTheme } from '@/themes/themes';
import { CarOutlined } from '@ant-design/icons';
import { RecyclingPoint } from '@/redux/slices/recyclingPointsSlice';

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 25.8em;
  height: 100%;
  min-height: 10rem;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;

  border-radius: ${({ theme }) => theme.borderRadius};
`;

const RecyclePoint: React.FC = () => {
  const router = useRouter();
  const { city_id } = router.query;
  const userLocation = useGetLocation();
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();
  const [distance, setDistance] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [center, setCenter] = useState(userLocation);
  const [locations, setLocations] = useState<Location[]>([]);

  const nearest = useGetNearestLocation(locations);

  const { data: recyclingPoints } = useGetRecyclingPointsByCityQuery(
    `${city_id}`,
    { skip: !city_id },
  );

  const nearestLocation = useMemo(() => {
    if (!recyclingPoints) return undefined;

    const location = recyclingPoints.find(
      (location) =>
        Number(location.LATITUDE) === nearest?.lat &&
        Number(location.LONGITUDE) === nearest?.lng,
    );

    return location;
  }, [nearest, recyclingPoints]);

  useEffect(() => {
    setCenter(userLocation);
  }, [userLocation]);

  useEffect(() => {
    if (recyclingPoints) {
      const locations = recyclingPoints.map((recyclingPoint) => ({
        lat: Number(recyclingPoint.LATITUDE),
        lng: Number(recyclingPoint.LONGITUDE),
      }));
      setLocations(locations);
    }
  }, [recyclingPoints]);

  const showRecyclePointInfo = (point: RecyclingPoint) => {
    router.push(`${router.asPath}/${point.RECYCLE_POINT_ID}`);
  };

  return (
    <Body fullSize>
      <CustomSpace size={20}>
        <CustomGoogleMap
          center={center}
          locations={locations}
          recyclingPoints={recyclingPoints}
          zoom={18}
        />
        <GoogleMap
          zoom={15}
          mapContainerStyle={{ borderRadius: defaultTheme.borderRadius }}
        >
          <Marker position={userLocation} />
          <ConditionalComponent condition={!!directionsResponse}>
            <DirectionsRenderer directions={directionsResponse} />
          </ConditionalComponent>
        </GoogleMap>
        <CustomRow justify={'space-between'}>
          <NearestCenter onShow={setCenter} point={nearestLocation} />
          <CustomCol xs={14} sm={16}>
            <CustomFlex justify={'start'} gap={20} wrap={'wrap'}>
              {recyclingPoints?.map((point) => (
                <RecyclingPointsCard
                  point={point}
                  key={point.RECYCLE_POINT_ID}
                  onShow={setCenter}
                  onShowInfo={showRecyclePointInfo}
                />
              ))}
            </CustomFlex>
          </CustomCol>
        </CustomRow>
      </CustomSpace>
    </Body>
  );
};

export default RecyclePoint;
