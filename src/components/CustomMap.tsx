import React, { useEffect } from 'react';
import {
  GoogleMap,
  GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api';
import { ConditionalComponent, Fallback } from '.';
import initMap from '@/helpers/initMap';

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

interface CustomMapProps extends GoogleMapProps {
  children?: React.ReactNode | React.ReactNode[];
}

const CustomMap: React.FC<CustomMapProps> = ({
  children,
  options = {
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
  },
  ...props
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key,
  });

  useEffect(() => {
    initMap();
  }, []);

  return (
    <ConditionalComponent condition={isLoaded} fallback={<Fallback />}>
      <GoogleMap {...props} options={options}>
        {children}
      </GoogleMap>
    </ConditionalComponent>
  );
};

export default CustomMap;
