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

  &:hover {
    .floating-btn {
      display: block;
    }
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: all 0.3s ease-in-out;
    position: relative;

    &:after {
      content: '';
      height: 45px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: ${({ theme }) => theme.borderRadius};
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        ${({ theme }) => theme.secondaryTextColor} 100%
      );
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
  return description.replace(regex, '')
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  return (
    <CustomCol xs={24}>
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
                <Subtitle>{post?.AUTHOR}</Subtitle>
              </Subtitle>
              <Subtitle>{dateTransform(post?.CREATED_AT ?? '')}</Subtitle>
            </SubTitleContainer>
            <div dangerouslySetInnerHTML={{ __html: post?.CONTENT || '' }} />
          </Paragraph>
        </PostContainer>
      </CustomRow>
      <br />
      <br />
      <br />
    </CustomCol>
  )
}

export default PostPreview
