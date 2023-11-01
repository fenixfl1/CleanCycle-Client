import { useState, useEffect } from 'react'
import { Location } from '@/constants/types'

function useGetLocation(): Location {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 })

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setLocation({ lat, lng })
        },
        (error) => {
          // Handle errors, such as the user denying location access
          console.error(`Error getting location: ${error.message}`)
        },
      )
    }
  }, [])

  return location
}

export default useGetLocation
