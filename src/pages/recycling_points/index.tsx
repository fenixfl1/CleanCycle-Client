import { CustomGoogleMap, SearchComponent } from '@/components';
import Body from '@/components/Body';
import CustomFlex from '@/components/antd/CustomFlex';
import CustomRow from '@/components/antd/CustomRow';
import useGetLocation from '@/hooks/useGetLocation';
import React, { useCallback, useEffect } from 'react';
import { Location } from '@/constants/types';
import { getRequest } from '@/services/api';
import CustomCol from '@/components/antd/CustomCol';
import CustomForm from '@/components/antd/CustomForm';
import CustomSelect from '@/components/antd/CustomSelect';
import CustomFormItem from '@/components/antd/CustomFormItem';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomTitle from '@/components/antd/CustomTitle';
import { Form } from 'antd';
import { cities, wasteTypes } from '@/constants/lists';
import CustomCard from '@/components/antd/CustomCard';
import {
  CustomParagraph,
  CustomText,
} from '@/components/antd/CustomTypography';
import styled from 'styled-components';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  RightOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { defaultTheme } from '@/themes/themes';
import { useRouter } from 'next/router';
import { useGetCitiesInfoListMutation } from '@/services/recycling_points';
import useDebounce from '@/hooks/useDebounce';
import CustomSpin from '@/components/antd/CustomSpin';
import Subtitle from '@/components/styled/SubTitle';

// array of locations of dominican republic to show on the map
const locations: Location[] = [
  { lat: 18.735693, lng: -70.162651 },
  { lat: 19.780769, lng: -70.687109 },
  { lat: 19.297617, lng: -69.552035 },
  { lat: 18.479014, lng: -69.890785 },
  { lat: 18.735693, lng: -70.162651 },
  { lat: 18.735693, lng: -70.162651 },
];

const Card = styled(CustomCard)`
  background: ${({ theme }) => theme.backgroundColor};
  width: 100%;
`;

const PointsContainer = styled.div`
  max-height: 300px;
  min-height: 250px;
  overflow: auto;
`;

const googleApiUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_URL;

const Points: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const userLocation = useGetLocation();
  const [closestLocation, setClosestLocation] = React.useState<Location>();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const debounce = useDebounce(searchValue);

  const [getCitiesInfoList, { data: points, isLoading }] =
    useGetCitiesInfoListMutation();

  const handleGetCitiesInfoList = useCallback(() => {
    getCitiesInfoList({
      CITY: debounce,
    });
  }, [debounce]);

  useEffect(handleGetCitiesInfoList, [handleGetCitiesInfoList]);

  // find location most close to user
  useEffect(() => {
    if (userLocation) {
      const closestLocation = locations.reduce((prev, curr) => {
        const prevDistance = Math.sqrt(
          Math.pow(userLocation.lat - prev.lat, 2) +
            Math.pow(userLocation.lng - prev.lng, 2),
        );
        const currDistance = Math.sqrt(
          Math.pow(userLocation.lat - curr.lat, 2) +
            Math.pow(userLocation.lng - curr.lng, 2),
        );
        return prevDistance < currDistance ? prev : curr;
      });

      setClosestLocation(closestLocation);
    }
  }, [userLocation]);

  const iconStyle = {
    fontSize: 22,
    color: defaultTheme.primaryColor,
  };

  return (
    <Body>
      <CustomRow>
        <CustomDivider>
          <CustomTitle>Puntos de reciclaje más cercanos a ti</CustomTitle>
        </CustomDivider>
        <CustomSpace size={20}>
          <CustomGoogleMap center={userLocation} locations={locations} />

          <SearchComponent onSearch={setSearchValue} />

          <CustomSpin size={'large'} spinning={isLoading}>
            <PointsContainer>
              <CustomFlex wrap={'wrap'} gap={10}>
                {points?.map((item) => (
                  <Card
                    key={item.CITY_ID}
                    hoverable
                    onClick={() =>
                      router.push(`${router.asPath}/${item.CITY_ID}`)
                    }
                  >
                    <CustomRow justify={'space-between'} align={'middle'}>
                      <CustomCol span={12}>
                        <CustomRow gap={5}>
                          <CustomSpace direction={'horizontal'}>
                            <CustomTitle level={4}>
                              <ShopOutlined style={{ ...iconStyle }} />
                            </CustomTitle>
                            <CustomTitle level={4}>{item.NAME}</CustomTitle>
                          </CustomSpace>
                          <Subtitle>
                            {item.CANT_RECYCLING_POINTS} Puntos de reciclajes
                          </Subtitle>
                        </CustomRow>
                      </CustomCol>

                      <RightOutlined style={iconStyle} />
                    </CustomRow>
                    {/* <CustomFlex align={'center'}>
                      <CustomParagraph style={{ padding: 5, width: '100%' }}>
                        <CustomTitle level={5}>{item.NAME}</CustomTitle>
                        <CustomSpace>
                          <CustomText>
                            <EnvironmentOutlined style={iconStyle} />{' '}
                            {item.CANT_RECYCLING_POINTS}
                          </CustomText>
                          <CustomText>
                            <PhoneOutlined style={iconStyle} /> . .
                          </CustomText>
                          <CustomText>
                            <ClockCircleOutlined style={iconStyle} /> None
                          </CustomText>
                        </CustomSpace>
                      </CustomParagraph>{' '}
                      <RightOutlined style={iconStyle} />
                    </CustomFlex> */}
                  </Card>
                ))}
              </CustomFlex>
            </PointsContainer>
          </CustomSpin>
        </CustomSpace>
        <div style={{ width: '100%', height: '30px' }} />
      </CustomRow>
    </Body>
  );
};

export default Points;
