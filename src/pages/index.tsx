import Body from '@/components/Body';
import ConditionalComponent from '@/components/ConditionalComponent';
import EditableArea from '@/components/EditableArea';
import PostPreview from '@/components/PostPreviewV2';
import CustomFloatButton from '@/components/antd/CustomFloatButton';
import CustomSpace from '@/components/antd/CustomSpace';
import { PATH_POSTS_CREATE_POSTS } from '@/constants/routes';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import { useGetPostsList } from '@/services/posts';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const Space = styled(CustomSpace)`
  display: flex;
  justify-content: center;
`;

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useGetPostsList(getSessionInfo()?.USERNAME);

  return (
    <Body loading={isLoading}>
      <PostPreview posts={data} />
      <ConditionalComponent condition={isLoggedIn()}>
        <CustomFloatButton
          style={{ width: '50px', height: '50px' }}
          onClick={() => router.push(PATH_POSTS_CREATE_POSTS)}
          icon={<EditOutlined />}
          tooltip={'Escribir un post'}
          type="primary"
        />
      </ConditionalComponent>
    </Body>
  );
};

export default Home;
