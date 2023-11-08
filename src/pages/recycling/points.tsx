import { GoogleMap, SearchComponent } from '@/components'
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
import { Form } from 'antd'
import { cities, wasteTypes } from '@/constants/lists'
import CustomCard from '@/components/antd/CustomCard'
import { CustomParagraph, CustomText } from '@/components/antd/CustomTypography'
import styled from 'styled-components'
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { defaultTheme } from '@/themes/themes'

// array of locations of dominican republic to show on the map
const locations: Location[] = [
  { lat: 18.735693, lng: -70.162651 },
  { lat: 19.780769, lng: -70.687109 },
  { lat: 19.297617, lng: -69.552035 },
  { lat: 18.479014, lng: -69.890785 },
  { lat: 18.735693, lng: -70.162651 },
  { lat: 18.735693, lng: -70.162651 },
]

const Card = styled(CustomCard)`
  background: ${({ theme }) => theme.backgroundColor};
  width: 100%;
`

const points = [
  {
    id: 1,
    city: 'Centro Santiago',
    address: 'Calle 30 de Marzo',
    phone: '809-123-4567',
    schedule: 'Lunes a Viernes 8:00am - 5:00pm',
  },
  {
    id: 2,
    city: 'Centro La Vega',
    address:
      'García Godoy N0. 81, Plaza Estela en modulo 213, LA VEGA, La Vega · < 1 km',
    phone: '809-123-4567',
    schedule: 'Lunes a Viernes 8:00am - 5:00pm',
  },
  {
    id: 3,
    city: 'Centro Puerto Plata',
    address: 'Av. Manolo Tavarez Justo',
    phone: '809-123-4567',
    schedule: 'Lunes a Viernes 8:00am - 5:00pm',
  },
  {
    id: 4,
    city: 'Centro Samana',
    address: 'Av. Manolo Tavarez Justo',
    phone: '809-123-4567',
    schedule: 'Lunes a Viernes 8:00am - 5:00pm',
  },
  {
    id: 5,
    city: 'Centro Santo Domingo',
    address: 'Av. 27 de Febrero',
    phone: '809-123-4567',
    schedule: 'Lunes a Viernes 8:00am - 5:00pm',
  },
  {
    id: 6,
    city: 'Centro San Cristobal',
    address: 'Av. Constitucion',
    phone: '809-123-4567',
    schedule: 'Lunes a Viernes 8:00am - 5:00pm',
  },
]

const PointsContainer = styled.div`
  max-height: 500px;
  overflow: auto;
`

const googleApiUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_URL

const Points: React.FC = () => {
  const [form] = Form.useForm()
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

  const iconStyle = {
    fontSize: 22,
    color: defaultTheme.primaryColor,
  }

  return (
    <Body>
      <CustomRow>
        <CustomDivider>
          <CustomTitle>Puntos de reciclaje más cercanos a ti</CustomTitle>
        </CustomDivider>
        <CustomSpace size={20}>
          <GoogleMap
            center={userLocation}
            locations={locations}
            closestLocation={closestLocation}
          />

          <SearchComponent />

          <PointsContainer>
            <CustomFlex wrap={'wrap'} gap={10}>
              {points.map((item) => (
                <Card hoverable>
                  <CustomFlex align={'center'}>
                    <CustomParagraph style={{ padding: 5, width: '100%' }}>
                      <CustomTitle level={5}>{item.city}</CustomTitle>
                      <CustomSpace>
                        <CustomText>
                          <EnvironmentOutlined style={iconStyle} />{' '}
                          {item.address}
                        </CustomText>
                        <CustomText>
                          <PhoneOutlined style={iconStyle} /> {item.phone}
                        </CustomText>
                        <CustomText>
                          <ClockCircleOutlined style={iconStyle} />{' '}
                          {item.schedule}
                        </CustomText>
                      </CustomSpace>
                    </CustomParagraph>{' '}
                    <RightOutlined style={iconStyle} />
                  </CustomFlex>
                </Card>
              ))}
            </CustomFlex>
          </PointsContainer>
        </CustomSpace>
        <div style={{ width: '100%', height: '30px' }} />
      </CustomRow>
    </Body>
  )
}

export default Points
