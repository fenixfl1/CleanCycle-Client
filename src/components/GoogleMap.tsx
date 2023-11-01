import { Location } from '@/constants/types'
import { EnvironmentOutlined } from '@ant-design/icons'
import { GoogleMap as Map, LoadScript, Marker } from '@react-google-maps/api'
import { useEffect } from 'react'

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

interface GoogleMapProps {
  locations?: Location[]
  center: Location
  closestLocation?: Location
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  locations,
  center,
  closestLocation,
}) => {
  return (
    <LoadScript googleMapsApiKey={key}>
      <Map
        center={center}
        zoom={10}
        mapContainerStyle={{
          width: '100%',
          height: '400px',
        }}
      >
        {locations?.map((location, index) => (
          <Marker
            draggable
            icon={(<EnvironmentOutlined />) as never}
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}
      </Map>
    </LoadScript>
  )
}

export default GoogleMap
