import {
  ConditionalComponent,
  MotionComponent,
  SearchComponent,
} from '@/components';
import Body from '@/components/Body';
import ExchangeCard from '@/components/ExchangeCard';
import CustomAvatar from '@/components/antd/CustomAvatar';
import CustomBadge from '@/components/antd/CustomBadge';
import CustomButton from '@/components/antd/CustomButton';
import CustomCol from '@/components/antd/CustomCol';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomList from '@/components/antd/CustomList';
import CustomListItem from '@/components/antd/CustomListItem';
import CustomListItemMeta from '@/components/antd/CustomListItemMeta';
import CustomRow from '@/components/antd/CustomRow';
import CustomSegmented from '@/components/antd/CustomSegmented';
import CustomSpin from '@/components/antd/CustomSpin';
import CustomTitle from '@/components/antd/CustomTitle';
import CustomTooltip from '@/components/antd/CustomTooltip';
import {
  CustomParagraph,
  CustomText,
} from '@/components/antd/CustomTypography';
import { PATH_EXCHANGES } from '@/constants/routes';
import { dateTransform } from '@/helpers/dateTransform';
import renderImage from '@/helpers/renderImage';
import { truncateText } from '@/helpers/truncateText';
import useDebounce from '@/hooks/useDebounce';
import { ExchangeItem, exchangesSelector } from '@/redux/slices/exchangesSlice';
import { useAppSelector } from '@/redux/store';
import { useGetExchangesItemsMutation } from '@/services/exchanges';
import {
  MessageOutlined,
  FilterOutlined,
  AppstoreOutlined,
  BarsOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Image } from 'antd';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  max-height: 200px;
  max-width: 200px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
`;

const Exchanges: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [segmentedValue, setSegmentedValue] = useState<'C' | 'L'>('L');
  const debounce = useDebounce(searchValue, 500);

  const { exchangeItems } = useAppSelector(exchangesSelector);

  const [getExchangeItems, { isLoading }] = useGetExchangesItemsMutation();

  const handleOnSearch = useCallback(() => {
    const condition: any = {
      item_name: debounce,
    };

    getExchangeItems({ condition });
  }, [debounce]);

  useEffect(handleOnSearch, [handleOnSearch]);

  const segmentedOptions = [
    { value: 'L', icon: <BarsOutlined /> },
    { value: 'C', icon: <AppstoreOutlined /> },
  ];

  const renderListItem = (item: ExchangeItem) => {
    return (
      <CustomListItem
        key={item.EXCHANGE_ITEM_ID}
        extra={
          <ImageContainer>
            <Image width={272} alt="logo" src={renderImage(item.IMAGES[0])} />
          </ImageContainer>
        }
        actions={[
          <CustomBadge
            count={item.LIKES?.length}
            key={'0'}
            showZero
            size={'small'}
          >
            <HeartOutlined style={{ fontSize: '18px' }} />
          </CustomBadge>,
          <CustomBadge
            count={item?.COMMENT_COUNT}
            key={'1'}
            showZero
            size={'small'}
          >
            <MessageOutlined style={{ fontSize: '18px' }} />
          </CustomBadge>,
          <CustomText type={'secondary'} key={'2'}>
            {dateTransform(item.CREATED_AT)}
          </CustomText>,
        ]}
      >
        <CustomListItemMeta
          avatar={<CustomAvatar shadow size={64} src={item.AVATAR} />}
          description={
            <CustomParagraph>
              {truncateText(item.DESCRIPTION, 355)}
            </CustomParagraph>
          }
          title={
            <Link href={`${PATH_EXCHANGES}/${item.EXCHANGE_ITEM_ID}`}>
              <CustomTitle level={4}>{item.ITEM_NAME}</CustomTitle>
            </Link>
          }
        />
      </CustomListItem>
    );
  };

  return (
    <CustomSpin spinning={isLoading}>
      <Body>
        <CustomCol xs={24}>
          <CustomRow justify={'space-between'} align={'middle'}>
            <ConditionalComponent
              condition={false}
              fallback={<CustomCol xs={1} />}
            >
              <CustomTooltip title={'Filtrar'}>
                <CustomButton
                  type={'text'}
                  icon={<FilterOutlined />}
                  size={'large'}
                />
              </CustomTooltip>
            </ConditionalComponent>
            <CustomCol xs={20}>
              <SearchComponent onSearch={setSearchValue} />
            </CustomCol>
            <CustomSegmented
              onClick={() =>
                setSegmentedValue((prev) => (prev === 'L' ? 'C' : 'L'))
              }
              value={segmentedValue}
              size={'large'}
              options={segmentedOptions}
            />
          </CustomRow>
        </CustomCol>

        <CustomDivider />
        <CustomRow justify={'center'}>
          <CustomCol xs={23}>
            <MotionComponent key={segmentedValue} delay={1.5}>
              <ConditionalComponent
                condition={segmentedValue === 'L'}
                fallback={<ExchangeCard dataSource={exchangeItems} />}
              >
                <CustomList
                  dataSource={exchangeItems}
                  itemLayout="vertical"
                  renderItem={renderListItem}
                />
              </ConditionalComponent>
            </MotionComponent>
          </CustomCol>
        </CustomRow>
      </Body>
    </CustomSpin>
  );
};

export default Exchanges;
