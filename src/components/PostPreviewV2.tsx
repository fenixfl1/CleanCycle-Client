import { Post } from '@/redux/slices/postsSlice';
import React, { useState } from 'react';
import styled from 'styled-components';
import CustomCard from './antd/CustomCard';
import CustomSpace from './antd/CustomSpace';
import CustomCol from './antd/CustomCol';
import CustomRow from './antd/CustomRow';
import CustomAvatar from './antd/CustomAvatar';
import Subtitle from './styled/SubTitle';
import { dateTransform } from '@/helpers/dateTransform';
import {
  CustomLink,
  CustomParagraph,
  CustomText,
} from './antd/CustomTypography';
import CustomTitle from './antd/CustomTitle';
import CustomDivider from './antd/CustomDivider';
import { truncateText } from '@/helpers/truncateText';
import CustomCarousel from './antd/CustomCarousel';
import { getPostImg } from '@/helpers/getPostImg';
import CustomButton from './antd/CustomButton';
import {
  CommentOutlined,
  MoreOutlined,
  HeartOutlined,
  BookOutlined,
  StopOutlined,
  EllipsisOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import CustomPopover from './antd/CustomPopover';
import CustomBadge from './antd/CustomBadge';
import CustomTooltip from './antd/CustomTooltip';
import Link from 'next/link';
import { PATH_USER_PROFILE } from '@/constants/routes';
import { getPostDescription } from '@/helpers/getPostDescription';
import { useBlockAuthor, useSavePosts } from '@/services/posts';
import { getSessionInfo } from '@/lib/session';
import CustomModal from './antd/CustomModal';
import CustomTextArea from './antd/CustomTextArea';
import CustomFormItem from './antd/CustomFormItem';
import CustomForm from './antd/CustomForm';
import { Form } from 'antd';
import ConditionalComponent from './ConditionalComponent';
import { useFollowUser } from '@/services/user';

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .btn-post-action {
    position: absolute;
    top: 3px;
    right: 3px;
  }
`;

const Carousel = styled(CustomCarousel)`
  max-height: 400px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const Button = styled(CustomButton)`
  display: flex !important;
  justify-content: start !important;
  align-items: center !important;
  gap: 15px !important;
`;

interface PostPreviewProps {
  posts: Post[] | undefined;
}

const PostPreview: React.FC<PostPreviewProps> = ({ posts = [] }) => {
  const [form] = Form.useForm();
  const [reasonModalVisibilityState, setReasonModalVisibilityState] =
    useState<boolean>();
  const [savePost] = useSavePosts();
  const [blockAuthor] = useBlockAuthor();
  const [followUser] = useFollowUser();

  const handleSavePost = async (postId: number) => {
    try {
      await savePost({
        POST_ID: postId,
        USERNAME: getSessionInfo().USERNAME,
      }).unwrap();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnBlockAuthor = async () => {
    try {
      const data = form.getFieldsValue();
      await blockAuthor({
        AUTHOR: data.AUTHOR,
        USERNAME: getSessionInfo().USERNAME,
        REASON: data.REASON,
      }).unwrap();

      form.resetFields();
      setReasonModalVisibilityState(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFollowUser = async (username: string) => {
    followUser({ USERNAME: username }).unwrap();
  };

  const options = (post: Post) => (
    <CustomRow gap={10} justify={'center'} width={'140px'}>
      <ConditionalComponent
        condition={!post.FOLLOWERS?.includes(getSessionInfo().USERNAME)}
        fallback={<CustomText type={'secondary'}>Siguiendo</CustomText>}
      >
        <Button
          block
          type={'text'}
          icon={<UserAddOutlined />}
          onClick={() => handleFollowUser(post.AUTHOR)}
        >
          Seguir
        </Button>
      </ConditionalComponent>
      <Button
        block
        type="text"
        icon={<BookOutlined style={{ fontSize: 16 }} />}
        onClick={() => handleSavePost(post.POST_ID)}
      >
        Guardar
      </Button>
      <Button
        block
        type="text"
        icon={<StopOutlined style={{ fontSize: 16 }} />}
        onClick={() => {
          form.setFieldsValue({ AUTHOR: post.AUTHOR });
          setReasonModalVisibilityState(true);
        }}
      >
        Bloquear autor
      </Button>
    </CustomRow>
  );

  return (
    <>
      <CustomRow width={'100%'} justify={'center'}>
        <CustomCol xs={20}>
          <CustomSpace size={25}>
            {posts.map((post) => (
              <Card key={post.POST_ID}>
                <CustomPopover
                  trigger={'click'}
                  placement={'bottom'}
                  content={options(post)}
                >
                  <CustomButton
                    className="btn-post-action"
                    type={'text'}
                    icon={<EllipsisOutlined style={{ fontSize: 22 }} />}
                  />
                </CustomPopover>
                <CustomRow>
                  <CustomCol xs={24}>
                    <CustomRow align={'middle'} gap={10}>
                      <CustomAvatar shadow size={42} src={post.AVATAR} />
                      <CustomSpace size={'small'} width={'80%'}>
                        <Link
                          href={PATH_USER_PROFILE.replace(
                            '[username]',
                            post.AUTHOR,
                          )}
                        >
                          {post.AUTHOR}
                        </Link>
                        <Subtitle>{dateTransform(post.CREATED_AT)}</Subtitle>
                      </CustomSpace>
                      <CustomCol xs={24}>
                        <CustomTitle>
                          <p>{post.TITLE}</p>
                        </CustomTitle>
                      </CustomCol>
                    </CustomRow>
                  </CustomCol>
                  <CustomCol xs={24}>
                    <Carousel>
                      {getPostImg(post.CONTENT ?? '')
                        ?.concat(post.FRONT_PAGE)
                        ?.map((img, index) => (
                          <div key={index}>
                            <img src={img} />
                          </div>
                        ))}
                    </Carousel>
                    <CustomParagraph style={{ fontSize: 14 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            post?.PREVIEW_TEXT ||
                            getPostDescription(post?.CONTENT || ''),
                        }}
                      />
                      <Link href={`/posts/${post.POST_ID}`}>
                        Continuar leyendo
                      </Link>
                    </CustomParagraph>
                  </CustomCol>
                  <CustomDivider />
                </CustomRow>

                <CustomRow justify={'space-between'}>
                  <CustomCol xs={12}>
                    <CustomSpace direction={'horizontal'}>
                      <CustomBadge count={post?.COMMENTS}>
                        <CustomTooltip title="Comentarios">
                          <CustomButton
                            size={'large'}
                            type={'text'}
                            icon={<CommentOutlined style={{ fontSize: 22 }} />}
                          />
                        </CustomTooltip>
                      </CustomBadge>
                      <CustomBadge count={post?.LIKED_BY?.length}>
                        <CustomTooltip title="Likes">
                          <CustomButton
                            size={'large'}
                            type={'text'}
                            icon={<HeartOutlined style={{ fontSize: 22 }} />}
                          />
                        </CustomTooltip>
                      </CustomBadge>
                    </CustomSpace>
                  </CustomCol>
                </CustomRow>
              </Card>
            ))}
          </CustomSpace>
        </CustomCol>
      </CustomRow>

      <CustomModal
        open={reasonModalVisibilityState}
        onCancel={() => setReasonModalVisibilityState(false)}
        onOk={handleOnBlockAuthor}
        centered
      >
        <CustomForm form={form} layout={'vertical'}>
          <CustomFormItem name={'AUTHOR'} hidden />
          <CustomFormItem
            name={'REASON'}
            label={'¿Porqué quieres bloquear a este autor?'}
          >
            <CustomTextArea
              maxLength={200}
              placeholder={'Razón del bloqueo'}
              autoSize={{ minRows: 5 }}
            />
          </CustomFormItem>
        </CustomForm>
      </CustomModal>
    </>
  );
};

export default PostPreview;
