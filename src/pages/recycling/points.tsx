import { GoogleMap } from '@/components'
import Body from '@/components/Body'
import CustomFlex from '@/components/antd/CustomFlex'
import CustomRow from '@/components/antd/CustomRow'
import useGetLocation from '@/hooks/useGetLocation'
import React, { useEffect } from 'react'
import { Location } from '@/constants/types'
import { getRequest } from '@/services/api'
import CustomCol from '@/components/antd/CustomCol'
import CustomForm from '@/components/antd/CustomForm'
import CustomSelect from '@/components/antd/CustomSelect'
import CustomFormItem from '@/components/antd/CustomFormItem'
import CustomSpace from '@/components/antd/CustomSpace'
import CustomDivider from '@/components/antd/CustomDivider'
import CustomTitle from '@/components/antd/CustomTitle'

// array of locations of dominican republic to show on the map
const locations: Location[] = [
  { lat: 18.735693, lng: -70.162651 },
  { lat: 19.780769, lng: -70.687109 },
  { lat: 19.297617, lng: -69.552035 },
  { lat: 18.479014, lng: -69.890785 },
  { lat: 18.735693, lng: -70.162651 },
  { lat: 18.735693, lng: -70.162651 },
]

const googleApiUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_URL

const Points: React.FC = () => {
  const userLocation = useGetLocation()
  const [closestLocation, setClosestLocation] = React.useState<Location>()

  // find location most close to user
  useEffect(() => {
    if (userLocation) {
      const closestLocation = locations.reduce((prev, curr) => {
        const prevDistance = Math.sqrt(
          Math.pow(userLocation.lat - prev.lat, 2) +
            Math.pow(userLocation.lng - prev.lng, 2),
        )
        const currDistance = Math.sqrt(
          Math.pow(userLocation.lat - curr.lat, 2) +
            Math.pow(userLocation.lng - curr.lng, 2),
        )
        return prevDistance < currDistance ? prev : curr
      })

      setClosestLocation(closestLocation)
    }
  }, [userLocation])

  return (
    <Body fullSize>
      <CustomRow>
        <CustomDivider>
          <CustomTitle>Puntos de reciclaje más cercanos a ti</CustomTitle>
        </CustomDivider>
        <CustomCol xs={24}>
          <CustomForm layout={'vertical'}>
            <CustomRow justify={'space-between'}>
              <CustomCol xs={8}>
                <CustomFormItem label={'Ciudad'} name={'CITY'}>
                  <CustomSelect width={'90%'} showSearch />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={8}>
                <CustomFormItem label={'tipo de residuo'} name={'WASTE_TYPE'}>
                  <CustomSelect width={'90%'} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={8}>
                <CustomFormItem label={'tipo de residuo'} name={'WASTE_TYPE'}>
                  <CustomSelect width={'90%'} />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomForm>
        </CustomCol>
        <GoogleMap
          center={userLocation}
          locations={locations}
          closestLocation={closestLocation}
        />
      </CustomRow>
    </Body>
  )
}

export default Points
