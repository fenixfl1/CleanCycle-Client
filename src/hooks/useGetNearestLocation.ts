import { useEffect, useState } from 'react';
import useGetLocation from './useGetLocation';
import { Location } from '@/constants/types';

function calcularDistancia(coord1: Location, coord2: Location) {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c; // Distancia en kilómetros
  return distancia;
}

function useGetNearestLocation(locations: Location[]) {
  const [nearestLocation, setNearestLocation] = useState<Location>();
  const userLocation = useGetLocation();

  useEffect(() => {
    let distanciaMinima = Infinity;
    let nearest = {} as Location;

    locations.forEach((coord) => {
      const distancia = calcularDistancia(userLocation, coord);
      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        nearest = coord;
      }
    });

    setNearestLocation(nearest);
  }, [userLocation, locations]);

  return nearestLocation;
}

export default useGetNearestLocation;
