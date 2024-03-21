import { CustomGoogleMap } from '@/components';
import Body from '@/components/Body';
import CustomCard from '@/components/antd/CustomCard';
import CustomCol from '@/components/antd/CustomCol';
import CustomFlex from '@/components/antd/CustomFlex';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpin from '@/components/antd/CustomSpin';
import { CustomParagraph } from '@/components/antd/CustomTypography';
import { Location } from '@/constants/types';
import { useGetRecyclingPointsByIdQuery } from '@/services/recycling_points';
import { CarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CustomTitle from '@/components/antd/CustomTitle';
import CustomDivider from '@/components/antd/CustomDivider';

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Img = styled.img`
  width: 100%
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const ImgGallery = styled.div`
  display: grid;
  grid-auto-rows: 200px;
  gap: 1rem;
  grid-auto-flow: row dense;

  .grid-gallery__item:nth-child(11n + 1) {
    grid-column: span 1;
  }

  .grid-gallery__item:nth-child(11n + 4) {
    grid-column: span 2;
    grid-row: span 1;
  }

  .grid-gallery__item:nth-child(11n + 6) {
    grid-column: span 3;
    grid-row: span 1;
  }

  .grid-gallery__item:nth-child(11n + 7) {
    grid-column: span 1;
    grid-row: span 2;
  }

  .grid-gallery__item:nth-child(11n + 8) {
    grid-column: span 2;
    grid-row: span 2;
  }

  .grid-gallery__item:nth-child(11n + 9) {
    grid-row: span 3;
  }

  .grid-gallery__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const imgList = [
  'https://www.bogotalimpia.com/wp-content/uploads/2021/07/Foto-noticia-Festival-del-recialje-2-768x576.jpeg',
  'https://wilferland.com/wp-content/uploads/2019/12/AdobeStock_223169149v2-768x513.jpg',
  'https://th.bing.com/th/id/OIP.Uu0rbBwkB6f_vBdHG98kxgHaEK?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP._h5WE6S0ja58e4QSMh7lTQHaEo?rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.MQ3pLHH_jTEX1iy-bfeZgAHaEK?rs=1&pid=ImgDetMain',
  'https://th.bing.com/th/id/OIP.76vEHivgqXExEhlrpRBQiQHaE8?w=1080&h=720&rs=1&pid=ImgDetMain',
];

const RecyclingPointPage: React.FC = () => {
  const router = useRouter();
  const ref = useRef(null);
  const point_id = String(router.query.recycling_point_id);
  const [location, setLocation] = useState({} as Location);

  // const [direction, distance, duration] = useCalculateRoute(location);
  const distance = '';
  const duration = '';

  const { data, isLoading } = useGetRecyclingPointsByIdQuery(point_id, {
    skip: isNaN(Number(point_id)),
  });

  useEffect(() => {
    setLocation({ lat: Number(data?.LATITUDE), lng: Number(data?.LONGITUDE) });
  }, [data]);

  const origin = { lat: 37.7749, lng: -122.4194 }; // San Francisco, CA
  const destination = { lat: 34.0522, lng: -118.2437 }; // Los Angeles, CA
  const waypoints = [
    { location: { lat: 36.7783, lng: -119.4179 } }, // Fresno, CA
  ];

  return (
    <CustomSpin spinning={isLoading}>
      <Body fullSize>
        <CustomRow justify={'space-between'} gap={10}>
          <CustomCol xs={24}>
            <CustomGoogleMap
              center={location}
              locations={[location]}
              recyclingPoints={[data as never]}
              zoom={18}
            />
            {/* <MapWithRoute
            // origin={origin}
            // destination={destination}
            // waypoints={waypoints}
            // />  */}
          </CustomCol>
          <CustomCol xs={8}>
            <CustomFlex vertical gap={10}>
              <Card>
                <CustomParagraph>
                  <CustomTitle level={5}>Distancia y duración</CustomTitle>
                  <CustomDivider />
                  Este centro esta a <strong>{distance}</strong> de tu ubicación
                  actual.
                  <br />
                  <strong>{duration}</strong> en auto <CarOutlined />
                </CustomParagraph>
              </Card>
              <Card>
                <CustomTitle level={5}>Horario</CustomTitle>
                <CustomDivider />
              </Card>
              <Card>
                <CustomParagraph>
                  <CustomTitle level={5}>Sobre este centro</CustomTitle>
                  <CustomDivider />
                  {data?.DESCRIPTION}
                </CustomParagraph>
              </Card>
            </CustomFlex>
          </CustomCol>

          <CustomCol xs={15}>
            <ImgGallery>
              {imgList.map((img, index) => (
                <div key={index} className={'grid-gallery__item'}>
                  <Img
                    key={index}
                    className={'grid-gallery__image'}
                    src={img}
                    alt={'image-gallery'}
                  />
                  <div className={'grid-gallery__img_mask'} />
                </div>
              ))}
            </ImgGallery>
          </CustomCol>
        </CustomRow>
      </Body>
    </CustomSpin>
  );
};

export default RecyclingPointPage;
