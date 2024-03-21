import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const Directions = () => {
  const map = useMap();
  const routeLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  useEffect(() => {
    if (!map || !routeLibrary) return;

    setDirectionsRenderer(new routeLibrary.DirectionsRenderer());
    setDirectionsService(new routeLibrary.DirectionsService());
  }, [map, routeLibrary]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: '100 Front St, Toronto, ON',
        destination: '500 College St, Toronto ON',
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  return null;
};

const MapComponent: React.FC = () => {
  return (
    <div style={{ height: '500px', width: 'max-content' }}>
      <APIProvider apiKey={process.env.NEXT_APP_GOOGLE_AP_KEY as string}>
        <Map center={{ lat: 43.6532, lng: -79.3832 }} zoom={10}>
          {/* <Directions /> */}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
