import React, { useEffect, useState } from 'react'
import CustomFlex from './antd/CustomFlex'
import CustomButton from './antd/CustomButton'
import {
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  FileSearchOutlined,
  HeartOutlined,
  HeartTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import CustomAvatar from './antd/CustomAvatar'
import styled from 'styled-components'
import { getSessionInfo } from '@/lib/session'
import { ConditionalComponent } from '.'
import { useLikePost } from '@/services/posts'
import { useRouter } from 'next/router'
import CustomBadge from './antd/CustomBadge'
import CustomTooltip from './antd/CustomTooltip'

interface ButtonActionsProps {
  likes?: string[]
  avatar?: string
  preview?: boolean
  isEditing?: boolean
  onComment?: () => void
  onLike?: () => void
  onPreview?: () => void
  onPublish?: () => void
  position: {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
  }
}

const Container = styled.div<ButtonActionsProps>`
  position: fixed;
  top: ${({ position: { top } }) => top}px;
  left: ${({ position: { left } }) => left}px;
  right: ${({ position: { right } }) => right}px;
  bottom: ${({ position: { bottom } }) => bottom}px;
  z-index: 1;
  background-color: ${({ theme }) => theme.baseBgColor};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all 0.3s ease;
  width: 60px;
  height: max-content;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonActions: React.FC<ButtonActionsProps> = ({
  avatar,
  isEditing = false,
  likes: likedBy = [],
  onComment,
  onLike,
  onPreview,
  onPublish,
  position,
  preview,
}) => {
  const route = useRouter()

  const [likes, setLikes] = useState<string[]>(likedBy)

  useEffect(() => {
    setLikes(likedBy)
  }, [likedBy])

  const { USERNAME } = getSessionInfo()
  const ILiked = likes?.includes(USERNAME)

  const postId = String(route.query.post_id)

  const [likePost] = useLikePost()

  const handleLike = async () => {
    try {
      const data = await likePost({
        POST_ID: postId,
        USERNAME,
        OPTION: ILiked ? 1 : 0,
      }).unwrap()
      setLikes(data)
      onLike?.()
    } catch (error) {
      console.log(error)
    }
  }

  const iconStyle = {
    fontSize: '24px',
  }

  return (
    <Container position={position}>
      <CustomFlex gap={20} vertical style={{ width: 'max-content' }}>
        <ConditionalComponent
          condition={isEditing}
          fallback={
            <>
              <CustomTooltip
                title={preview ? 'Finalizar la vista previa' : 'Vista previa'}
                placement={'right'}
              >
                <CustomButton
                  onClick={onPreview}
                  type={'text'}
                  size={'large'}
                  icon={
                    preview ? (
                      <CloseOutlined />
                    ) : (
                      <FileSearchOutlined style={iconStyle} />
                    )
                  }
                />
              </CustomTooltip>
              <CustomTooltip title={'Publicar'} placement={'right'}>
                <CustomButton
                  onClick={onPublish}
                  type={'text'}
                  size={'large'}
                  icon={<CheckOutlined style={iconStyle} />}
                />
              </CustomTooltip>
            </>
          }
        >
          <CustomAvatar shadow size={36} src={avatar} icon={<UserOutlined />} />
          <CustomBadge count={likes.length}>
            <CustomButton
              size={'large'}
              type={'text'}
              onClick={handleLike}
              icon={
                <ConditionalComponent
                  condition={!ILiked}
                  fallback={
                    <HeartTwoTone twoToneColor={'red'} style={iconStyle} />
                  }
                >
                  <HeartOutlined style={iconStyle} />
                </ConditionalComponent>
              }
            />
          </CustomBadge>
          <CustomButton
            onClick={onComment}
            size={'large'}
            type={'text'}
            icon={<CommentOutlined style={iconStyle} />}
          />
        </ConditionalComponent>
      </CustomFlex>
    </Container>
  )
}

export default ButtonActions
