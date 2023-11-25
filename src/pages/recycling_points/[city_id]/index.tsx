import React, { useEffect, useMemo, useState } from 'react';
import { ConditionalComponent, CustomGoogleMap } from '@/components';
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

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 25.8em;
  height: 100%;
  min-height: 12em;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;

  border-radius: ${({ theme }) => theme.borderRadius};
`;

const RecyclingPoint: React.FC = () => {
  const router = useRouter();
  const { city_id } = router.query;
  const userLocation = useGetLocation();

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
    if (recyclingPoints) {
      const locations = recyclingPoints.map((recyclingPoint) => ({
        lat: Number(recyclingPoint.LATITUDE),
        lng: Number(recyclingPoint.LONGITUDE),
      }));
      setLocations(locations);
    }
  }, [recyclingPoints]);

  return (
    <Body fullSize>
      <CustomSpace size={20}>
        <CustomGoogleMap
          center={userLocation}
          locations={locations}
          recyclingPoints={recyclingPoints}
        />
        <CustomRow justify={'space-between'}>
          <div style={{ width: 'max-content' }}>
            <Card>
              <CustomTitle level={3}>
                Punto de recolección más cercano
              </CustomTitle>
              <CustomDivider />
              <CustomFlex justify={'start'} align="center">
                <CustomTitle level={4}>
                  Nombre:
                  <br />
                  <Subtitle>{nearestLocation?.LOCATION_NAME}</Subtitle>
                </CustomTitle>
              </CustomFlex>
              <CustomDivider />
              <CustomFlex justify={'start'} align="center">
                <CustomTitle level={4}>
                  Dirección:
                  <br />
                  <Subtitle>{nearestLocation?.LOCATION_ADDRESS}</Subtitle>
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
                  Tel: <Subtitle>{nearestLocation?.PHONE}</Subtitle> <br />
                  Email: <Subtitle>{nearestLocation?.EMAIL}</Subtitle>
                </CustomTitle>
              </CustomFlex>
              <CustomDivider />
            </Card>
          </div>
          <CustomCol xs={14} sm={16}>
            <CustomFlex justify={'start'} gap={20} wrap={'wrap'}>
              {recyclingPoints?.map((point) => (
                <Card
                  key={point.RECYCLE_POINT_ID}
                  hoverable
                  onClick={() => {
                    router.push(`${router.asPath}/${point.RECYCLE_POINT_ID}`);
                  }}
                >
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
                      <p>{point.LOCATION_NAME}</p>
                      {point.RECYCLING_TYPES?.map((type) => (
                        <CustomTag key={type}>{type}</CustomTag>
                      ))}
                    </CustomCol>
                  </CustomRow>
                </Card>
              ))}
            </CustomFlex>
          </CustomCol>
        </CustomRow>
      </CustomSpace>
    </Body>
  );
};

export default RecyclingPoint;
