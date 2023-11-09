import { GoogleMap } from '@/components'
import Body from '@/components/Body'
import CustomDivider from '@/components/antd/CustomDivider'
import CustomTitle from '@/components/antd/CustomTitle'
import useGetLocation from '@/hooks/useGetLocation'
import React from 'react'

const RecyclingPoint: React.FC = () => {
  const userLocation = useGetLocation()

  const location = [{ lat: 0, lng: 0 }]

  return (
    <Body>
      <CustomDivider>
        <CustomTitle>Centro de recolección de Santo Domingo</CustomTitle>
      </CustomDivider>
      <GoogleMap center={userLocation} locations={location} />
    </Body>
  )
}

export default RecyclingPoint
