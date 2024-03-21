import { Location } from '@/constants/types';
import React, { useState } from 'react';
import CustomCard from './antd/CustomCard';
import { ConditionalComponent, CustomMap } from '.';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

interface TruckRoutesProps {
  route: {
    origin: Location;
    destination: Location;
  };
}

const TruckRoutes: React.FC<TruckRoutesProps> = ({
  route: { origin, destination },
}) => {
  const [direction, setDirection] = useState<google.maps.DirectionsResult>();
  const [, setMap] = useState<google.maps.Map>();
  const style = {
    width: '100%',
    height: '100%',
  };

  return (
    <CustomCard>
      <CustomMap
        mapContainerStyle={style}
        onLoad={setMap}
        center={{
          lat: (origin.lat + destination.lat) / 2,
          lng: (origin.lng + destination.lng) / 2,
        }}
      >
        <DirectionsService
          key={JSON.stringify({ origin, destination })}
          options={{
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING' as never,
          }}
          callback={(response) => {
            if (response !== null) {
              setDirection(response);
            }
          }}
        />
        <ConditionalComponent condition={!!direction}>
          <DirectionsRenderer directions={direction} />
        </ConditionalComponent>
      </CustomMap>
    </CustomCard>
  );
};

export default TruckRoutes;
