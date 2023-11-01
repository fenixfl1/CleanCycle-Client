import { ButtonActions, ConditionalComponent, PostPreview } from '@/components'
import Body from '@/components/Body'
import CustomDivider from '@/components/antd/CustomDivider'
import CustomRow from '@/components/antd/CustomRow'
import CustomTitle from '@/components/antd/CustomTitle'
import { CustomParagraph } from '@/components/antd/CustomTypography'
import Subtitle from '@/components/styled/SubTitle'
import { dateTransform } from '@/helpers/dateTransform'
import { useGetPostById } from '@/services/posts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

const Divider = styled(CustomDivider)`
  margin-top: 10px !important;
`

const Paragraph = styled(CustomParagraph)`
  font-size: 16px !important;

  img {
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`

const PostContainer = styled.div`
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1819px) {
    max-width: 700px;
  }
`

const CommentSection = styled.div`
  width: '400px';
  max-width: '400px';
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 20px;
  height: '80vh';
  position: 'fixed';
  bottom: '0';
  overflow: 'auto';
  right: '5.5%';
  border-left: '1px solid #f5f5f5';
`

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  overflow: hidden;
  margin: 20px 0;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`

const SubTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled(CustomTitle)`
  margin-bottom: 0 !important;
`

const Post: React.FC = () => {
  const router = useRouter()
  const postId = Number(router.query.post_id)

  const { data: post } = useGetPostById(postId, { skip: isNaN(postId) })

  return (
    <Body>
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
        <ButtonActions
          avatar={post?.AVATAR}
          likes={post?.LIKED_BY}
          position={{ top: 150, right: 250 }}
        />
      </CustomRow>
    </Body>
  )
}

export default Post
