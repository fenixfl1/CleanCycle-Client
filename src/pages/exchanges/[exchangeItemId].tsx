import {
  CommentBox,
  ConditionalComponent,
  ExchangeItemForm,
  MotionComponent,
  ProposalSection,
} from '@/components';
import Body from '@/components/Body';
import CustomAvatar from '@/components/antd/CustomAvatar';
import CustomBadge from '@/components/antd/CustomBadge';
import CustomCard from '@/components/antd/CustomCard';
import CustomCol from '@/components/antd/CustomCol';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomTag from '@/components/antd/CustomTag';
import CustomTitle from '@/components/antd/CustomTitle';
import {
  CustomParagraph,
  CustomText,
} from '@/components/antd/CustomTypography';
import { CustomModalConfirmation } from '@/components/antd/ModalMethods';
import customNotification from '@/components/antd/customNotification';
import { SHORT_DATE_FORMAT_STRING } from '@/constants/formats';
import { PATH_USER_PROFILE } from '@/constants/routes';
import { dateTransform } from '@/helpers/dateTransform';
import { getSessionInfo } from '@/lib/session';
import { ExchangeItem } from '@/redux/slices/exchangesSlice';
import {
  useAddCommentToExchangeItemMutation,
  useAddExchangeItemProposalMutation,
  useGetExchangeItemCommentsQuery,
  useGetExchangeItemLikesQuery,
  useGetExchangeItemProposalsQuery,
  useGetExchangeItemQuery,
  useLikeExchangeItemMutation,
} from '@/services/exchanges';
import { HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Image } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ImagePreview = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 1em;
  width: 75px;
  height: 515px;

  .image-item-container {
    cursor: pointer;
    max-width: 75px;

    &:hover {
      transition: all 0.3s;
      transform: scale(1.1);
      box-shadow: ${({ theme }) => theme.boxShadow};
      border-radius: ${({ theme }) => theme.borderRadius};
    }

    img {
      max-height: 75px;
      max-width: 75px;
      min-width: 75px;
      min-height: 75px;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }
`;

const ActiveImageContainer = styled.div`
  width: calc(100% - 100px);
  max-height: 515px;

  img {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    min-width: 485px;
    max-height: 515px;
    object-fit: cover;
  }
`;

const HeartIcon = styled(HeartOutlined)`
  font-size: 20px;
  cursor: pointer;
`;

const HeartFilledIcon = styled(HeartFilled)`
  font-size: 20px;
  color: red;
  cursor: pointer;
`;

const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Paragraph = styled(CustomParagraph)`
  font-size: 14px;
`;

const normalizeContact = (contact: string, type: string) => {
  if (type === 'email') {
    return `mailto: <span class="ant-tag css-dev-only-do-not-override-6qcq5e" >${contact}</span>`;
  }
  return `tel: <span class="ant-tag css-dev-only-do-not-override-6qcq5e" >${contact.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '($1) $2-$3',
  )}</span>`;
};

const ExchangeItemPage: React.FC = () => {
  const [exchangeFormIsOpen, setExchangeFormIsOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [activeImage, setActiveImage] = React.useState<string>();

  const { exchangeItemId } = router.query;

  const skip = !exchangeItemId;

  const { data: comments, refetch } = useGetExchangeItemCommentsQuery(
    `${exchangeItemId}`,
    { skip },
  );
  const { isLoading, data: exchangeItem } = useGetExchangeItemQuery(
    `${exchangeItemId}`,
    { skip },
  );
  const [likeExchangeItem] = useLikeExchangeItemMutation();
  const [addComment] = useAddCommentToExchangeItemMutation();
  const { data: proposals, refetch: getProposal } =
    useGetExchangeItemProposalsQuery(`${exchangeItemId}`, { skip });
  const [createProposal, { isLoading: fetchingCreateProposal }] =
    useAddExchangeItemProposalMutation();

  const { data: likes, refetch: getLikes } = useGetExchangeItemLikesQuery(
    Number(exchangeItemId),
    { skip },
  );

  useEffect(() => {
    if (exchangeItem?.IMAGES?.length) {
      setActiveImage(exchangeItem.IMAGES[0]);
    }
  }, [exchangeItem]);

  const handleOnLike = async () => {
    try {
      await likeExchangeItem({
        EXCHANGE_ITEM_ID: Number(exchangeItemId),
        USERNAME: getSessionInfo().USERNAME,
      }).unwrap();
      await getLikes();
    } catch (error) {
      customNotification({
        type: 'error',
        title: 'Error',
        description: error.message ?? 'Error al dar like al intercambio',
      });
    }
  };

  const handleOnCreateProposal = async (item: ExchangeItem) => {
    try {
      await createProposal({
        ITEM_ID: Number(exchangeItemId),
        PROPOSAL_ITEM_ID: item.EXCHANGE_ITEM_ID,
      }).unwrap();
      await getProposal();
      setExchangeFormIsOpen(false);
    } catch (error) {
      customNotification({
        type: 'error',
        title: 'Error',
        description: error.message ?? 'Error al proponer intercambio',
      });
    }
  };

  const handleOnComment = async (comment: string) => {
    try {
      await addComment({
        COMMENT: comment,
        EXCHANGE_ITEM_ID: Number(exchangeItemId),
        USERNAME: getSessionInfo().USERNAME,
      }).unwrap();
      form.resetFields();
      await refetch();
    } catch (error) {
      customNotification({
        type: 'error',
        title: 'Error',
        description: error.message ?? 'Error al comentar el intercambio',
      });
    }
  };

  const handleOnCloseExchangeForm = (data: any) => {
    if (Object.values(data).some((value) => value)) {
      return CustomModalConfirmation({
        title: '¿Estás seguro de cerrar el formulario?',
        content: 'Los datos ingresados se perderán.',
        onOk: () => setExchangeFormIsOpen(false),
      });
    }

    setExchangeFormIsOpen(false);
  };

  return (
    <>
      <Body loading={isLoading || fetchingCreateProposal}>
        <CustomTitle>{exchangeItem?.ITEM_NAME}</CustomTitle>
        <CustomDivider />
        <CustomRow justify={'space-between'} align={'top'} gap={5}>
          <CustomCol xs={15}>
            <CustomRow gap={10}>
              <ImagePreview>
                {exchangeItem?.IMAGES?.map((image, index) => (
                  <div
                    className="image-item-container"
                    key={index}
                    onClick={() => setActiveImage(image)}
                  >
                    <Image preview={false} key={index} src={image} />
                  </div>
                ))}
              </ImagePreview>
              <ActiveImageContainer>
                <Image.PreviewGroup items={exchangeItem?.IMAGES}>
                  <MotionComponent delay={2} key={activeImage}>
                    <Image src={activeImage} />
                  </MotionComponent>
                </Image.PreviewGroup>
              </ActiveImageContainer>
            </CustomRow>
          </CustomCol>
          <CustomCol xs={8}>
            <Paragraph>
              <CustomRow justify={'space-between'} align={'middle'}>
                <CustomSpace direction="horizontal" width={'max-content'}>
                  <CustomAvatar
                    shadow
                    icon={<UserOutlined />}
                    src={exchangeItem?.AVATAR}
                  />
                  <Link
                    href={PATH_USER_PROFILE}
                    as={PATH_USER_PROFILE.replace(
                      '[username]',
                      `${exchangeItem?.CREATED_BY}`,
                    )}
                  >
                    {exchangeItem?.CREATED_BY}
                  </Link>
                </CustomSpace>
                <CustomText type={'secondary'}>
                  {dateTransform(
                    `${exchangeItem?.CREATED_AT}`,
                    SHORT_DATE_FORMAT_STRING,
                  )}
                </CustomText>
                <CustomBadge count={likes?.COUNT} showZero size={'small'}>
                  <ConditionalComponent
                    fallback={<HeartIcon onClick={handleOnLike} />}
                    condition={
                      !!likes?.LIKES?.includes(getSessionInfo().USERNAME)
                    }
                  >
                    <HeartFilledIcon onClick={handleOnLike} />
                  </ConditionalComponent>
                </CustomBadge>
              </CustomRow>
              <CustomDivider />
              {exchangeItem?.DESCRIPTION}
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: normalizeContact(
                    `${exchangeItem?.CONTACT}`,
                    `${exchangeItem?.CONTACT_TYPE}`,
                  ),
                }}
              />

              <br />
              <CustomSpace direction="horizontal" width={'max-content'}>
                {exchangeItem?.TAGS?.map((tag, index) => (
                  <CustomTag color={''} key={index}>
                    #{tag}
                  </CustomTag>
                ))}
              </CustomSpace>
              <CustomDivider />
              <ProposalSection
                item={exchangeItem}
                onClick={() => setExchangeFormIsOpen(true)}
                dataSource={proposals}
              />
            </Paragraph>
          </CustomCol>
        </CustomRow>
        <CustomDivider />
        <Container>
          <CustomSpace size={10}>
            {comments?.map((comment, index) => (
              <CustomCard>
                <CustomRow justify={'space-between'} align={'top'}>
                  <CustomCol xs={24}>
                    <CustomRow justify={'space-between'} align={'top'}>
                      <CustomSpace direction="horizontal" width={'max-content'}>
                        <CustomAvatar
                          size={32}
                          icon={<UserOutlined />}
                          shadow
                          src={comment.AVATAR}
                        />

                        <Link
                          href={PATH_USER_PROFILE}
                          as={PATH_USER_PROFILE.replace(
                            '[username]',
                            'username',
                          )}
                        >
                          <CustomText strong>{comment.CREATED_BY}</CustomText>
                        </Link>
                      </CustomSpace>

                      <CustomText type={'secondary'}>
                        {dateTransform(`${comment.CREATED_AT}`)}
                      </CustomText>
                    </CustomRow>
                  </CustomCol>
                  <CustomCol xs={23}>
                    <CustomParagraph style={{ paddingLeft: 42 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: comment.COMMENT,
                        }}
                      />
                    </CustomParagraph>
                  </CustomCol>
                </CustomRow>
              </CustomCard>
            ))}
          </CustomSpace>
          <CustomDivider />
          <CommentBox form={form} onComment={handleOnComment} />
        </Container>
      </Body>

      <ExchangeItemForm
        open={exchangeFormIsOpen}
        onCancel={handleOnCloseExchangeForm}
        onCreate={handleOnCreateProposal}
      />
    </>
  );
};

export default ExchangeItemPage;
