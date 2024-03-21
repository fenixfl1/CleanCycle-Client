import { ExchangeItem } from '@/redux/slices/exchangesSlice';
import React, { useEffect, useState } from 'react';
import CustomList from './antd/CustomList';
import CustomListItem from './antd/CustomListItem';
import CustomListItemMeta from './antd/CustomListItemMeta';
import styled from 'styled-components';
import CustomAvatar from './antd/CustomAvatar';
import { SwapOutlined, UserOutlined } from '@ant-design/icons';
import CustomRow from './antd/CustomRow';
import CustomButton from './antd/CustomButton';
import { truncateText } from '@/helpers/truncateText';
import ConditionalComponent from './ConditionalComponent';
import { getSessionInfo } from '@/lib/session';
import {
  CustomLink,
  CustomParagraph,
  CustomText,
} from './antd/CustomTypography';
import CustomModal from './antd/CustomModal';
import CustomSpace from './antd/CustomSpace';
import { dateTransform } from '@/helpers/dateTransform';
import { Image } from 'antd';
import CustomCol from './antd/CustomCol';
import MotionComponent from './MotionComponent';

const Container = styled.div`
  width: 100%;
  max-height: 250px;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.primaryColor}
    ${({ theme }) => theme.backgroundColor};
`;

const Paragraph = styled(CustomParagraph)`
  white-space: pre-line;
  font-size: 14px;
`;

const ImageContainer = styled.div`
  max-height: 95px;
  max-width: 95px;
  min-width: 95px;
  min-height: 95px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  width: 100%;
  margin-bottom: 1em;

  .image-item-container {
    cursor: pointer;
    max-width: 100%;

    &:hover {
      transition: all 0.3s;
      transform: scale(1.1);
      box-shadow: ${({ theme }) => theme.boxShadow};
      border-radius: ${({ theme }) => theme.borderRadius};
    }

    img {
      width: 90px;
      height: 100%;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius};
      border:;
    }
  }
`;

const ActiveImageContainer = styled.div`
  width: 100%;
  max-height: 380px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};

  img {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    max-height: 515px;
    object-fit: cover;
  }
`;

interface ProposalSectionProps {
  item?: ExchangeItem;
  dataSource?: ExchangeItem[];
  onClick?(): void;
}

const ProposalSection: React.FC<ProposalSectionProps> = ({
  dataSource = [],
  item,
  onClick,
}) => {
  const [modalVisibilityState, setModalVisibilityState] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExchangeItem>();
  const [activeImage, setActiveImage] = React.useState<string>();

  useEffect(() => {
    setActiveImage(selectedItem?.IMAGES[0]);
  }, [selectedItem]);

  const handleOnSelectItem = (item: ExchangeItem) => {
    setSelectedItem(item);
    setModalVisibilityState(true);
  };

  const handleOnAcceptProposal = () => {
    console.log('Accept proposal');
  };

  const renderItem = (item: ExchangeItem) => (
    <CustomListItem>
      <CustomListItemMeta
        description={truncateText(item.DESCRIPTION, 50)}
        title={
          <CustomLink onClick={() => handleOnSelectItem(item)}>
            {item.ITEM_NAME}
          </CustomLink>
        }
        avatar={
          <CustomAvatar
            icon={<UserOutlined />}
            shadow
            size={32}
            src={item.AVATAR}
          />
        }
      />
    </CustomListItem>
  );

  const header = (
    <ConditionalComponent
      condition={item?.CREATED_BY !== getSessionInfo().USERNAME}
    >
      <CustomRow justify={'space-between'}>
        <CustomText>Propuestas</CustomText>
        <ConditionalComponent
          condition={item?.CREATED_BY !== getSessionInfo().USERNAME}
        >
          <CustomButton
            icon={<SwapOutlined />}
            type={'dashed'}
            onClick={onClick}
          >
            Proponer Intercambio
          </CustomButton>
        </ConditionalComponent>
      </CustomRow>
    </ConditionalComponent>
  );

  return (
    <>
      <Container>
        <CustomList
          header={header}
          dataSource={dataSource}
          itemLayout="horizontal"
          renderItem={renderItem}
          pagination={false}
        />
      </Container>

      <CustomModal
        width={550}
        open={modalVisibilityState}
        onCancel={() => setModalVisibilityState(false)}
        title={selectedItem?.ITEM_NAME}
        okText={'Aceptar Propuesta'}
        onOk={handleOnAcceptProposal}
        footer={selectedItem?.CREATED_BY !== getSessionInfo().USERNAME && []}
      >
        <Paragraph>
          <CustomRow justify={'space-between'} align={'middle'}>
            <CustomSpace width={'max-content'} direction={'horizontal'}>
              <CustomAvatar
                icon={<UserOutlined />}
                shadow
                size={36}
                src={selectedItem?.AVATAR}
              />
              <CustomText type={'secondary'} strong>
                @{selectedItem?.CREATED_BY}
              </CustomText>
            </CustomSpace>
            <CustomText type={'secondary'} strong>
              {dateTransform(`${selectedItem?.CREATED_AT}`)}
            </CustomText>
          </CustomRow>
          <br />
          <CustomCol xs={24}>
            <CustomRow gap={10}>
              <ActiveImageContainer>
                <Image.PreviewGroup items={selectedItem?.IMAGES}>
                  <MotionComponent delay={2} key={activeImage}>
                    <Image src={activeImage} />
                  </MotionComponent>
                </Image.PreviewGroup>
              </ActiveImageContainer>
              <CustomCol xs={24}>
                <ImagePreview>
                  {selectedItem?.IMAGES?.map((image, index) => (
                    <div
                      className="image-item-container"
                      key={index}
                      onClick={() => setActiveImage(image)}
                    >
                      <Image preview={false} key={index} src={image} />
                    </div>
                  ))}
                </ImagePreview>
              </CustomCol>
            </CustomRow>
          </CustomCol>
          {selectedItem?.DESCRIPTION}
          <br />
        </Paragraph>
      </CustomModal>
    </>
  );
};

export default ProposalSection;
