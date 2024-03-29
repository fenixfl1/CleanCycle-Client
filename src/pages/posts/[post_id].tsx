import React, { useEffect, useMemo } from 'react';
import { ButtonActions, CommentBox, ConditionalComponent } from '@/components';
import Body from '@/components/Body';
import CustomCard from '@/components/antd/CustomCard';
import CustomCol from '@/components/antd/CustomCol';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomRow from '@/components/antd/CustomRow';
import CustomTitle from '@/components/antd/CustomTitle';
import {
  CustomParagraph,
  CustomText,
} from '@/components/antd/CustomTypography';
import Subtitle from '@/components/styled/SubTitle';
import { dateTransform } from '@/helpers/dateTransform';
import {
  useCommentPost,
  useGetPostById,
  useGetPostComments,
} from '@/services/posts';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import CustomAvatar from '@/components/antd/CustomAvatar';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomTextArea from '@/components/antd/CustomTextArea';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import CustomButton from '@/components/antd/CustomButton';
import { CaretRightOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import CustomFormItem from '@/components/antd/CustomFormItem';
import CustomForm from '@/components/antd/CustomForm';
import CustomTooltip from '@/components/antd/CustomTooltip';
import { DATE_TIME_FORMAT } from '@/constants/formats';
import { CustomModalInfo } from '../../components/antd/ModalMethods';
import { defaultTheme } from '@/themes/themes';
import { Post } from '@/redux/slices/postsSlice';

const Divider = styled(CustomDivider)`
  margin-top: 10px !important;
`;

const Paragraph = styled(CustomParagraph)`
  font-size: 16px !important;

  img {
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const About = styled.div`
  width: 100%;
  max-width: 816px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 20px;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.backgroundColor};
  margin-bottom: 10px;

  @media (max-width: 1819px) {
    // max-width: 700px;
  }
`;

const CommentContent = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.baseBgColor};
  padding: 10px;
  width: 100%;
  max-width: 816px;
  margin: auto;
`;

const CommentSection = styled.div`
  width: '100%';
  max-width: 816px;
  margin-bottom: 20px;
  padding: 20px;
  margin-top: 20px;
  height: '80vh';
  position: 'fixed';
  bottom: '0';
  overflow: 'auto';
  right: '5.5%';
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 0 auto;
`;

const CommentContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  overflow: hidden;
  margin: 20px 0;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const SubTitleContainer = styled.div`
  display: flex;
  justify-comment: space-between;
`;

const Title = styled(CustomTitle)`
  margin-bottom: 0 !important;
`;

interface PostPageProps {
  post?: Post;
}

const PostPage: React.FC<PostPageProps> = ({ post: _post }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const postId = Number(router.query.post_id);

  const { data, isLoading } = useGetPostById(postId, {
    skip: isNaN(postId),
  });
  const [getPostComment, { data: comments }] = useGetPostComments();
  const [commentPost] = useCommentPost();

  const post = useMemo(() => {
    return _post || data;
  }, [data, _post]);

  useEffect(() => {
    postId &&
      getPostComment({
        POST_ID: postId,
      });
  }, [postId]);

  const handleOnComment = async (comment: string) => {
    try {
      if (!isLoggedIn()) {
        return CustomModalInfo({
          title: 'Inicia sesión',
          content: 'Debes iniciar sesión para comentar',
        });
      }

      await commentPost({
        COMMENT: comment,
        POST_ID: postId,
        USERNAME: getSessionInfo().USERNAME,
      } as never).unwrap();

      getPostComment({ POST_ID: postId });
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Body loading={isLoading}>
      <CustomRow gap={10} justify={'center'}>
        <CustomCol>
          <PostContainer>
            <Title level={1}>{post?.TITLE}</Title>
            <Divider />
            <Paragraph>
              <ImageContainer>
                <img src={post?.FRONT_PAGE} alt={post?.TITLE} />
              </ImageContainer>
              <CustomRow justify={'space-between'}>
                <Subtitle upper>
                  <Subtitle>@{post?.AUTHOR}</Subtitle>
                </Subtitle>
                <Subtitle upper>
                  {dateTransform(post?.CREATED_AT ?? '')}
                </Subtitle>
              </CustomRow>
              <div dangerouslySetInnerHTML={{ __html: post?.CONTENT || '' }} />
            </Paragraph>
          </PostContainer>
        </CustomCol>

        <CustomCol>
          <About>
            <CustomRow width={'100%'} align={'top'} gap={10}>
              <CustomCol xs={24}>
                <CustomText strong>Acerca del author</CustomText>
                <CustomDivider />
              </CustomCol>

              {/* <CustomSpace direction={'horizontal'} align={'center'}> */}
              <CustomAvatar shadow size={60} src={post?.AVATAR} />
              <CustomCol xs={20}>
                <CustomParagraph
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    borderRadius: defaultTheme.borderRadius,
                  }}
                >
                  <CustomText strong>@{post?.AUTHOR}</CustomText>
                  <p>{post?.ABOUT_AUTHOR}</p>
                </CustomParagraph>
              </CustomCol>
              {/* </CustomSpace> */}
            </CustomRow>
          </About>
        </CustomCol>

        <CustomCol>
          <CommentSection>
            <CustomSpace width={'100%'}>
              <ConditionalComponent condition={!!comments?.length}>
                <CommentContainer>
                  {comments?.map((comment) => (
                    <CustomRow width={'100%'} align={'top'} gap={10}>
                      <CustomTooltip title={comment.CREATED_BY}>
                        <CustomAvatar
                          shadow
                          size={36}
                          src={comment?.AVATAR}
                          icon={<UserOutlined />}
                        />
                      </CustomTooltip>
                      <CustomCol xs={21}>
                        <CommentContent>
                          <CustomParagraph>
                            <CustomRow
                              justify={'space-between'}
                              height={'20px'}
                              width={'100%'}
                              gap={15}
                              align={'top'}
                            >
                              <Subtitle>@{comment.CREATED_BY}</Subtitle>
                              <Subtitle>
                                {dateTransform(
                                  comment?.CREATED_AT ?? '',
                                  DATE_TIME_FORMAT,
                                )}
                              </Subtitle>
                            </CustomRow>
                            {comment?.COMMENT}
                          </CustomParagraph>
                        </CommentContent>
                      </CustomCol>
                    </CustomRow>
                  ))}
                </CommentContainer>
              </ConditionalComponent>

              <CommentBox onComment={handleOnComment} />
            </CustomSpace>
          </CommentSection>
        </CustomCol>
        <ButtonActions
          author={{
            USERNAME: post?.AUTHOR,
            ABOUT: post?.ABOUT_AUTHOR,
            AVATAR: post?.AVATAR,
          }}
          likes={post?.LIKED_BY}
          comments={post?.COMMENTS}
        />
      </CustomRow>
    </Body>
  );
};

export default PostPage;
