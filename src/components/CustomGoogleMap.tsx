import { useMemo, useState } from 'react';
import { Location } from '@/constants/types';
import useGetLocation from '@/hooks/useGetLocation';
import { getSessionInfo } from '@/lib/session';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { ConditionalComponent, CustomMap } from '.';
import { RecyclingPoint } from '@/redux/slices/recyclingPointsSlice';
import CustomRow from './antd/CustomRow';
import styled from 'styled-components';
import Subtitle from './styled/SubTitle';
import CustomFlex from './antd/CustomFlex';
import CustomTag from './antd/CustomTag';

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Container = styled.div`
  width: max-content;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0.5em;
`;

interface GoogleMapProps {
  locations?: Location[];
  center: Location;
  recyclingPoints?: RecyclingPoint[];
  zoom?: number;
}

const CustomGoogleMap: React.FC<GoogleMapProps> = ({
  locations,
  center,
  recyclingPoints,
  zoom = 15,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const userLocation = useGetLocation();

  const onMarkerClick = (location?: Location) => {
    setSelectedLocation(location);
  };

  const currentSelectedLocation = useMemo(() => {
    const data = recyclingPoints?.find(
      (location) =>
        Number(location?.LATITUDE) === selectedLocation?.lat &&
        Number(location?.LONGITUDE) === selectedLocation?.lng,
    );

    return data;
  }, [selectedLocation]);

  return (
    <CustomMap
      center={center}
      zoom={zoom}
      mapContainerStyle={{
        width: '100%',
        height: '400px',
      }}
    >
      <Marker
        icon={{
          url: '/assets/img/location.png' ?? getSessionInfo()?.AVATAR,
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        position={{ lat: userLocation.lat, lng: userLocation.lng }}
        onClick={() => onMarkerClick(userLocation)}
      />

      {locations?.map((location, index) => (
        <Marker
          icon={(<EnvironmentOutlined />) as never}
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => onMarkerClick(location)}
        />
      ))}

      <ConditionalComponent condition={!!currentSelectedLocation}>
        <InfoWindow
          position={selectedLocation}
          zIndex={100}
          onCloseClick={onMarkerClick}
        >
          <Container>
            <CustomRow gap={10} justify={'space-between'} align={'middle'}>
              <div style={{ maxWidth: '8em' }}>
                <Img
                  src={currentSelectedLocation?.COVER}
                  alt={currentSelectedLocation?.LOCATION_NAME}
                />
              </div>
              <div style={{ width: '300px' }}>
                <h3>{currentSelectedLocation?.LOCATION_NAME}</h3>
                <Subtitle>{currentSelectedLocation?.DESCRIPTION}</Subtitle>
                <br />
                <br />
                <CustomFlex justify={'space-between'} align={'center'}>
                  {currentSelectedLocation?.RECYCLING_TYPES?.map(
                    (type, index) => <CustomTag key={index}>{type}</CustomTag>,
                  )}
                </CustomFlex>
              </div>
            </CustomRow>
          </Container>
        </InfoWindow>
      </ConditionalComponent>
    </CustomMap>
  );
};

export default CustomGoogleMap;
