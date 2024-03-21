import Body from '@/components/Body';
import { WEB_API_PATH_GET_USER } from '@/constants/routes';
import { User } from '@/redux/slices/userSlice';
import { getRequest } from '@/services/api';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import CustomAvatar from '@/components/antd/CustomAvatar';
import CustomButton from '@/components/antd/CustomButton';
import {
  UserOutlined,
  UploadOutlined,
  AppstoreOutlined,
  TagsOutlined,
  SettingOutlined,
  RightOutlined,
  HeartOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { AvatarSelector, ConditionalComponent } from '@/components';
import {
  CustomParagraph,
  CustomText,
} from '@/components/antd/CustomTypography';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomTitle from '@/components/antd/CustomTitle';
import { getSessionInfo } from '@/lib/session';
import { Empty } from 'antd';
import CustomTabs from '@/components/antd/CustomTabs';
import {
  useGetMyPosts,
  useGetPostsList,
  useGetSavedPosts,
} from '@/services/posts';
import { Post } from '@/redux/slices/postsSlice';
import CustomCol from '@/components/antd/CustomCol';
import CustomCard from '@/components/antd/CustomCard';
import Link from 'next/link';
import PostPreview from '@/components/PostPreviewV2';
import { useFollowUser, useGetFollowers, useUpdateUser } from '@/services/user';
import CustomSpin from '@/components/antd/CustomSpin';
import CustomModal from '@/components/antd/CustomModal';
import PostPage from '@/pages/posts/[post_id]';
import CustomCardMeta from '@/components/antd/CustomCardMeta';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 80px;
  position: relative;
  box-sizing: border-box;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};

  .avatar-shadow {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    bottom: 27px;
    right: 38px;
    background: ${({ theme }) => theme.whiteBackground};
    rotate: -45deg;
  }
`;

const Card = styled(CustomCard)`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 80px;
`;

const Textarea = styled.div<{ editable?: boolean }>`
  outline: none;
  border: none;

  // si contentEditable es true cambiar el fondo
  ${({ editable }) =>
    editable &&
    `
    background: ${({ theme }) => theme.whiteBackground};
    padding: 10px;
    border-radius: 5px;
  `}
`;

const Paragraph = styled(CustomParagraph)`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
  outline: none;
  border: none;
  font-size: 14px;

  textarea {
    width: 100% !important;
    font-size: 14px;
    background: ${({ theme }) => theme.backgroundColor};
    border: none;
    outline: none;
    resize: none;

    &:focus {
      outline: none;
      border: none;
    }
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  top: -50px;
  right: 10px;
  padding: 0 20px;
  width: max-content;

  .ant-avatar {
    position: relative;
    z-index: 2;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  .upload-button {
    position: absolute;
    bottom: 0;
    right: 31px;
    z-index: 999;
  }

  &::before {
    content: '';
    height: 105px;
    width: 110px;
    border-radius: 0 0 50% 50%;
    position: absolute;
    top: 0;
    right: 15px;
    background: ${({ theme }) => theme.whiteBackground};
  }
`;

const PostGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  width: 100%;
  padding: 10px;

  .gallery-item {
    img {
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      object-fit: cover;
    }
  }
`;

interface PosGalleryProps {
  posts: Post[];
}

const PosGallery: React.FC<PosGalleryProps> = ({ posts }) => {
  const [showPost, setShowPost] = useState(false);
  const [selectPost, setSelectPost] = useState<Post>();

  const handleSelectPost = (post: Post) => {
    setSelectPost(post);
    setShowPost(true);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <ConditionalComponent
            condition={!!posts?.length}
            fallback={<Empty description={'No tiene posts en esta lista'} />}
          >
            <PostGallery>
              {posts?.map((post) => (
                <CustomCard
                  hoverable
                  key={post.POST_ID}
                  className="gallery-item"
                  cover={<img src={post.FRONT_PAGE} alt={post.TITLE} />}
                >
                  <CustomCardMeta
                    title={post.TITLE}
                    description={
                      <CustomSpace direction="horizontal">
                        <HeartOutlined />
                        <CommentOutlined />
                      </CustomSpace>
                    }
                  />
                </CustomCard>
              ))}
            </PostGallery>
          </ConditionalComponent>
        </Wrapper>
      </Container>

      <CustomModal open={showPost}>
        <CustomRow justify={'center'}>
          <PostPage post={selectPost} />
        </CustomRow>
      </CustomModal>
    </>
  );
};

interface ProfileProps {
  user: User;
}

const Profile: NextPage<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [about, setAbout] = useState<string>();

  const { data: posts } = useGetMyPosts(getSessionInfo().USERNAME);
  const { data: savedPosts } = useGetSavedPosts('');
  const { data } = useGetPostsList('');
  const [updateUser, { data: updatedUser, isLoading: fetchingUpdateUser }] =
    useUpdateUser();

  const [followUser] = useFollowUser();
  const { data: follow, refetch: getFollowers } = useGetFollowers(
    user.USERNAME,
  );

  const iFollow = useMemo(() => {
    return !!follow?.FOLLOWERS?.find((follower) => {
      // eslint-disable-next-line no-console
      console.log({ follower, session: getSessionInfo() });
      return follower.USERNAME === getSessionInfo().USERNAME;
    });
  }, [follow?.FOLLOWERS]);

  const currentUser = useMemo(() => {
    if (updatedUser) {
      return updatedUser;
    }

    return user;
  }, [user, updatedUser]);

  const userPosts = data?.filter(
    (post) => post.AUTHOR === currentUser.USERNAME,
  );
  const isMyProfile = currentUser.USER_ID === getSessionInfo().USER_ID;

  const handleUpdateAvatar = (url: string) => {
    updateUser({ USER_ID: currentUser.USER_ID, AVATAR: url });
  };

  const editable = {
    maxLength: 1000,
    text: user.ABOUT,
    autoSize: true,
    enterIcon: null,
    onChange: setAbout,
    onEnd: () => {
      if (about) {
        updateUser({ USER_ID: currentUser.USER_ID, ABOUT: about });
      }
    },
  };

  const handleFollowUser = async () => {
    await followUser({ USERNAME: currentUser.USERNAME }).unwrap();

    await getFollowers();
  };

  return (
    <CustomSpin spinning={fetchingUpdateUser}>
      <Body style={{ marginTop: 20 }}>
        <CustomRow justify={'center'} gap={10} width={'100%'}>
          <CustomCol xs={20}>
            <Container>
              <CustomRow
                justify={'start'}
                align={'middle'}
                style={{ alignSelf: 'flex-start', paddingLeft: 20 }}
              >
                <CustomCol xs={24}>
                  <CustomRow
                    gap={10}
                    justify={'space-between'}
                    width={'max-content'}
                    height={'max-content'}
                    align="middle"
                  >
                    <CustomTitle style={{ height: 'max-content' }}>
                      {currentUser?.FULL_NAME}
                    </CustomTitle>
                    <CustomDivider type="vertical" style={{ marginTop: 18 }} />
                    <CustomText type={'secondary'} style={{ marginTop: 15 }}>
                      <CustomText strong>
                        {follow?.FOLLOWERS?.length}
                      </CustomText>{' '}
                      Seguidores
                    </CustomText>
                    <ConditionalComponent condition={!isMyProfile}>
                      <CustomButton
                        onClick={handleFollowUser}
                        style={{ marginTop: 15 }}
                        type={'primary'}
                      >
                        {iFollow ? 'Dejar de seguir' : 'Seguir'}
                      </CustomButton>
                    </ConditionalComponent>
                  </CustomRow>
                </CustomCol>
                <CustomText type={'secondary'} style={{ marginTop: -10 }}>
                  @{currentUser?.USERNAME}
                </CustomText>
              </CustomRow>
              <AvatarContainer>
                <CustomAvatar
                  icon={<UserOutlined />}
                  size={100}
                  src={currentUser.AVATAR}
                  shadow
                />
                <CustomButton
                  shape={'circle'}
                  className={'upload-button'}
                  icon={<UploadOutlined />}
                  onClick={() => setVisible(true)}
                />
              </AvatarContainer>
              <div className="avatar-shadow" />
            </Container>
          </CustomCol>
          <CustomCol xs={20}>
            <ConditionalComponent condition={isMyProfile}>
              <Link href={`${getSessionInfo().USERNAME}/settings`}>
                <Card
                  hoverable
                  onClick={() => {
                    router.push(`${getSessionInfo().USERNAME}/settings`);
                  }}
                >
                  <CustomRow
                    justify={'space-between'}
                    width={'100%'}
                    align={'middle'}
                    style={{ padding: 10 }}
                  >
                    <CustomCol xs={22}>
                      <CustomSpace direction="horizontal" size={10}>
                        <CustomText type={'secondary'}>
                          <SettingOutlined style={{ fontSize: 22 }} />
                        </CustomText>
                        <CustomText strong>Configuración</CustomText>
                      </CustomSpace>
                    </CustomCol>
                    <CustomText type={'secondary'}>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </CustomText>
                  </CustomRow>
                </Card>
              </Link>
            </ConditionalComponent>
          </CustomCol>
          <CustomCol xs={20}>
            <Container>
              <Paragraph
                editable={
                  currentUser.USER_ID === getSessionInfo().USER_ID
                    ? editable
                    : false
                }
              >
                <div dangerouslySetInnerHTML={{ __html: currentUser.ABOUT }} />
              </Paragraph>
            </Container>
          </CustomCol>
          <ConditionalComponent
            condition={isMyProfile}
            fallback={<PostPreview posts={userPosts} />}
          >
            <CustomCol xs={20}>
              <CustomTabs
                items={[
                  {
                    children: <PosGallery posts={posts ?? []} />,
                    key: '1',
                    label: (
                      <CustomSpace size={5} direction="horizontal">
                        <AppstoreOutlined style={{ fontSize: 16 }} />
                        <span style={{ fontSize: 16 }}>Posts</span>
                      </CustomSpace>
                    ),
                  },
                  {
                    children: <PosGallery posts={savedPosts ?? []} />,
                    key: '2',
                    label: (
                      <CustomSpace size={5} direction="horizontal">
                        <TagsOutlined style={{ fontSize: 16 }} />
                        <span style={{ fontSize: 16 }}>Guardados</span>
                      </CustomSpace>
                    ),
                  },
                ]}
              />
            </CustomCol>
          </ConditionalComponent>
        </CustomRow>
      </Body>

      <AvatarSelector
        open={visible}
        onSelect={handleUpdateAvatar}
        onClose={setVisible}
      />
    </CustomSpin>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.params as { username: string };
  try {
    const response = await getRequest<User>(
      `${WEB_API_PATH_GET_USER}/${username}`,
    );

    return {
      props: {
        user: response?.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Profile;
