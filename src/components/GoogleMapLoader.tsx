import React, { useEffect } from 'react';

interface GoogleMapLoaderProps {
  children?: React.ReactNode;
  apiKey: string;
}

const GoogleMapLoader: React.FC<GoogleMapLoaderProps> = ({
  apiKey,
  children,
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [apiKey]);

  return children;
};

export default GoogleMapLoader;
