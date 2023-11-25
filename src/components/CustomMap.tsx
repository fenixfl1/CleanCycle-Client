import React, { useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api';
import GoogleMapLoader from './GoogleMapLoader';
import { ConditionalComponent, Fallback } from '.';
import initMap from '@/helpers/initMap';

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

interface CustomMapProps extends GoogleMapProps {
  children?: React.ReactNode | React.ReactNode[];
}

const CustomMap: React.FC<CustomMapProps> = ({ children, ...props }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key,
  });

  window.initMap = initMap;

  useEffect(() => {
    initMap();
  }, []);

  return (
    <ConditionalComponent condition={isLoaded} fallback={<Fallback />}>
      <GoogleMap {...props}>{children}</GoogleMap>
    </ConditionalComponent>
  );
};

export default CustomMap;
