import Body from '@/components/Body';
import { WEB_API_PATH_GET_USER } from '@/constants/routes';
import { User } from '@/redux/slices/userSlice';
import { getRequest } from '@/services/api';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useState } from 'react';
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
import CustomFlex from '@/components/antd/CustomFlex';
import { Empty, Image } from 'antd';
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
  box-sizing: border-box;
  position: relative;

  .gallery-item {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius};
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${({ theme }) => theme.whiteBackground};
      font-weight: bold;
      text-shadow: 1px 1px 2px #333;
    }
  }
`;

const PosGallery: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Container>
      <Wrapper>
        <ConditionalComponent
          condition={!!posts?.length}
          fallback={<Empty description={'No tiene posts en esta lista'} />}
        >
          <PostGallery>
            {posts?.map((post) => (
              <div key={post.POST_ID} className="gallery-item">
                <CustomText type={'secondary'}>{post.TITLE}</CustomText>
                <img src={post.FRONT_PAGE} alt={post.TITLE} />
              </div>
            ))}
          </PostGallery>
        </ConditionalComponent>
      </Wrapper>
    </Container>
  );
};

interface ProfileProps {
  user: User;
}

const Profile: NextPage<ProfileProps> = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState<string>();

  const { data: posts } = useGetMyPosts(getSessionInfo().USERNAME);
  const { data: savedPosts } = useGetSavedPosts('');
  const { data } = useGetPostsList('');

  const userPosts = data?.filter((post) => post.AUTHOR === user.USERNAME);

  const isMyProfile = user.USER_ID === getSessionInfo().USER_ID;

  const editable = {
    maxLength: 1000,
    text: user.ABOUT,
    autoSize: true,
    enterIcon: null,
  };

  return (
    <>
      <Body style={{ marginTop: 20 }}>
        <CustomSpace direction="vertical" size={20} width={'100%'}>
          <Container>
            <CustomRow
              justify={'start'}
              align={'middle'}
              height={'80px'}
              style={{ alignSelf: 'flex-start', paddingLeft: 20 }}
            >
              <CustomTitle style={{ display: 'flex', flexDirection: 'column' }}>
                {user.FULL_NAME}{' '}
                <CustomText type={'secondary'}> @{user.USERNAME}</CustomText>
              </CustomTitle>
            </CustomRow>
            <AvatarContainer>
              <CustomAvatar
                icon={<UserOutlined />}
                size={100}
                src={user.AVATAR}
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
          <ConditionalComponent condition={isMyProfile}>
            <Link href={`${getSessionInfo().USERNAME}/settings`}>
              <Card hoverable>
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
          <Container>
            <Paragraph
              editable={
                user.USER_ID === getSessionInfo().USER_ID ? editable : false
              }
            >
              <div dangerouslySetInnerHTML={{ __html: user.ABOUT }} />
            </Paragraph>
          </Container>
          <ConditionalComponent
            condition={isMyProfile}
            fallback={<PostPreview posts={userPosts} />}
          >
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
          </ConditionalComponent>
        </CustomSpace>
      </Body>

      <AvatarSelector
        open={visible}
        onSelect={setAvatar}
        onClose={setVisible}
      />
    </>
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
