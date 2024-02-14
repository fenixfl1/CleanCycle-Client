import { useCallback, useEffect, useState } from 'react';
import useGetLocation from './useGetLocation';
import { Location } from '@/constants/types';

type Distance = string;
type Duration = string;

function useCalculateRoute(
  location: Location,
): [google.maps.DirectionsResult, Distance, Duration] {
  const userLocation = useGetLocation();
  const [direction, setDirection] = useState<google.maps.DirectionsResult>();
  const [distance, setDistance] = useState<string>();
  const [duration, setDuration] = useState<string>();

  const callback = useCallback(async () => {
    if (!userLocation || !location.lat) return;

    const directionsService = new google.maps.DirectionsService();
    const direction = await directionsService.route({
      travelMode: google.maps.TravelMode.DRIVING,
      origin: userLocation,
      destination: {
        lat: location.lat,
        lng: location.lng,
      },
    });

    // eslint-disable-next-line no-console
    console.log({ direction });

    const distance: string = (direction.routes[0].legs[0].distance as any).text;
    const duration: string = (direction.routes[0].legs[0].duration as any).text;

    setDirection(direction);
    setDuration(duration);
    setDistance(distance);
  }, [userLocation, location]);

  useEffect(() => {
    callback();
  }, [callback]);

  return [direction, distance, duration] as never;
}

export default useCalculateRoute;
