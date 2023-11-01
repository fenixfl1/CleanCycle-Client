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

const getPostDescription = (content: string) => {
  const description = content.replace(/<img[^>]*>/g, '')
  const regex = /<h[1-6]>(.*?)<\/h[1-6]>/g
  return description.replace(regex, '')
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  return (
    <CustomCol xs={24}>
      <CustomRow justify={'center'}>
        <Container xs={20}>
          <Paragraph style={{ fontSize: 16 }}>
            <CustomTitle>{post.TITLE}</CustomTitle>
            <CustomDivider style={{ margin: '10px 0' }} />

            <ImageContainer>
              <img src={post.FRONT_PAGE} alt={post.TITLE} />
            </ImageContainer>
            <SubTitleContainer>
              <Subtitle>
                <CustomSpace direction={'horizontal'} size={8}>
                  <Subtitle>{post.AUTHOR}</Subtitle>
                  <CustomTooltip title={'Likes'}>
                    <CustomBadge count={post.LIKED_BY?.length} size={'small'}>
                      <HeartOutlined />
                    </CustomBadge>
                  </CustomTooltip>
                  <CustomTooltip title={'Comentarios'}>
                    <CustomBadge count={post.COMMENTS} size={'small'}>
                      <CommentOutlined />
                    </CustomBadge>
                  </CustomTooltip>
                </CustomSpace>
              </Subtitle>
              <Subtitle>{dateTransform(post.CREATED_AT)}</Subtitle>
            </SubTitleContainer>
            <div
              dangerouslySetInnerHTML={{
                __html: truncateText(getPostDescription(post.CONTENT), 400),
              }}
            />
            <Link className={'floating-btn'} href={`/posts/${post.POST_ID}`}>
              Continuar leyendo
            </Link>
          </Paragraph>

          <CustomDivider style={{ margin: '10px 0' }} />
        </Container>
      </CustomRow>
      <br />
      <br />
      <br />
    </CustomCol>
  )
}

export default PostPreview
