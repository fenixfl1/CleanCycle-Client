import { Post } from '@/redux/slices/postsSlice'
import React from 'react'
import CustomCol from './antd/CustomCol'
import { CustomParagraph } from './antd/CustomTypography'
import CustomTitle from './antd/CustomTitle'
import CustomRow from './antd/CustomRow'
import styled from 'styled-components'
import CustomCarousel from './antd/CustomCarousel'
import { dateTransform } from '@/helpers/dateTransform'
import { CommentOutlined, HeartOutlined } from '@ant-design/icons'
import CustomBadge from './antd/CustomBadge'
import CustomTooltip from './antd/CustomTooltip'
import CustomSpace from './antd/CustomSpace'
import Subtitle from './styled/SubTitle'
import CustomDivider from './antd/CustomDivider'
import Link from 'next/link'
import { truncateText } from '@/helpers/truncateText'
import { useRouter } from 'next/router'

interface PostPreviewProps {
  post: Post
}

const PostContainer = styled.div`
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1819px) {
    max-width: 700px;
  }
`

const ImageContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`

const SubTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Paragraph = styled(CustomParagraph)`
  position: relative;
  h3.ant-typography {
    display: inline-block;
    position: relative;
  }

  .floating-btn {
    position: absolute;
    bottom: -3%;
    left: 40%;
    z-index: 1;
    display: none;
  }
`

const Container = styled(CustomCol)`
  position: relative;
  padding: 10px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    position: relative;
    box-shadow: ${({ theme }) => theme.boxShadow};
    cursor: pointer;

    &:after {
      content: '';
      height: 45px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }
`
const Title = styled(CustomTitle)`
  margin-bottom: 0 !important;
`

const Divider = styled(CustomDivider)`
  margin-top: 10px !important;
`

const getPostDescription = (content: string) => {
  const description = content.replace(/<img[^>]*>/g, '')
  const regex = /<h[1-6]>(.*?)<\/h[1-6]>/g
  return truncateText(description.replace(regex, ''), 500)
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`/posts/${post?.POST_ID}`)
  }

  return (
    <CustomCol xs={24}>
      <Container onClick={handleOnClick}>
        <CustomRow style={{ position: 'relative' }}>
          <PostContainer>
            <Title level={1}>{post?.TITLE}</Title>
            <Divider />
            <Paragraph>
              <ImageContainer>
                <img src={post?.FRONT_PAGE} alt={post?.TITLE} />
              </ImageContainer>
              <SubTitleContainer>
                <Subtitle>
                  <CustomSpace direction={'horizontal'}>
                    <Subtitle>{post?.AUTHOR}</Subtitle>
                    <CustomBadge count={post?.COMMENTS}>
                      <CustomTooltip title="Comentarios">
                        <CommentOutlined />
                      </CustomTooltip>
                    </CustomBadge>
                    <CustomBadge count={post?.LIKED_BY?.length}>
                      <CustomTooltip title="Likes">
                        <HeartOutlined style={{ fontSize: 18 }} />
                      </CustomTooltip>
                    </CustomBadge>
                  </CustomSpace>
                </Subtitle>
                <Subtitle>{dateTransform(post?.CREATED_AT ?? '')}</Subtitle>
              </SubTitleContainer>
              <div
                dangerouslySetInnerHTML={{
                  __html: getPostDescription(post?.CONTENT || ''),
                }}
              />
            </Paragraph>
          </PostContainer>
        </CustomRow>
      </Container>
      <br />
      <br />
      <br />
    </CustomCol>
  )
}

export default PostPreview
