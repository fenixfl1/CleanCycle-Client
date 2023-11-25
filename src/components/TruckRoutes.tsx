import { Location } from '@/constants/types';
import React from 'react';
import CustomCard from './antd/CustomCard';
import { CustomMap } from '.';
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
  const style = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: (origin.lat + destination.lat) / 2,
    lng: (origin.lng + destination.lng) / 2,
  };

  return (
    <CustomCard>
      <CustomMap mapContainerStyle={style} center={center}>
        <DirectionsService
          key={JSON.stringify({ origin, destination })}
          options={{
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING' as never,
          }}
          callback={(response) => {
            if (response !== null) {
              console.log({ response, route: { origin, destination } });
            }
          }}
        />
        <DirectionsRenderer
          directions={
            {
              routes: [
                {
                  legs: [
                    {
                      start_location: origin,
                      end_location: destination,
                      steps: [],
                    },
                  ],
                },
              ],
              request: {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING' as never,
              },
              status: 'OK',
            } as never
          }
        />
      </CustomMap>
    </CustomCard>
  );
};

export default TruckRoutes;
