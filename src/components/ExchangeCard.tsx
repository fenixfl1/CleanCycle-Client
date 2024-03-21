import { ExchangeItem } from '@/redux/slices/exchangesSlice';
import React from 'react';
import CustomCard from './antd/CustomCard';
import CustomCardMeta from './antd/CustomCardMeta';
import styled from 'styled-components';
import CustomRow from './antd/CustomRow';
import renderImage from '@/helpers/renderImage';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import CustomSpace from './antd/CustomSpace';
import { CustomText } from './antd/CustomTypography';
import CustomCol from './antd/CustomCol';
import { dateTransform } from '@/helpers/dateTransform';
import { SHORT_DATE_FORMAT_STRING } from '@/constants/formats';
import { truncateText } from '@/helpers/truncateText';
import CustomBadge from './antd/CustomBadge';

const Card = styled(CustomCard)`
  width: 20em;
  margin: 1em;

  img {
    height: 180px;
    object-fit: cover;
  }
`;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <CustomSpace>
    {React.createElement(icon)}
    {text}
  </CustomSpace>
);

interface ExchangeCardProps {
  dataSource?: ExchangeItem[];
  onExchangeClick?: (exchangeItem: ExchangeItem) => void;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  dataSource,
  onExchangeClick,
}) => {
  const router = useRouter();

  return (
    <CustomRow gap={5} justify={'center'}>
      {dataSource?.map((item) => (
        <Card
          hoverable
          title={`@${item.CREATED_BY}`}
          onClick={() => onExchangeClick?.(item)}
          extra={[
            <CustomCol xs={24}>
              <CustomText type="secondary">
                {dateTransform(item.CREATED_AT, SHORT_DATE_FORMAT_STRING)}
              </CustomText>
            </CustomCol>,
          ]}
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
              count={item.LIKES?.length}
              key={'1'}
              showZero
              size={'small'}
            >
              <MessageOutlined style={{ fontSize: '18px' }} />
            </CustomBadge>,
          ]}
          cover={
            <img alt={item.ITEM_NAME} src={renderImage(item.IMAGES?.[0])} />
          }
        >
          <Link href={`${item.EXCHANGE_ITEM_ID}`} key={item.EXCHANGE_ITEM_ID}>
            <CustomCardMeta
              title={item.ITEM_NAME}
              description={truncateText(
                `En resumen, si bien no hay un riesgo inmediato al cargar con un cargador de 65W, es recomendable utilizar el cargador original de Samsung para cuidar la batería a largo plazo. Siempre es mejor prevenir y seguir las recomendaciones del fabricante.`,
                100,
              )}
            />
          </Link>
        </Card>
      ))}
    </CustomRow>
  );
};

export default ExchangeCard;
