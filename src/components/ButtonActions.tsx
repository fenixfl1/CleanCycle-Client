import React, { useEffect, useState } from 'react';
import CustomFlex from './antd/CustomFlex';
import CustomButton from './antd/CustomButton';
import {
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  FileSearchOutlined,
  HeartOutlined,
  HeartTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import CustomAvatar from './antd/CustomAvatar';
import styled from 'styled-components';
import { getSessionInfo, isLoggedIn } from '@/lib/session';
import { ConditionalComponent } from '.';
import { useLikePost } from '@/services/posts';
import { useRouter } from 'next/router';
import CustomBadge from './antd/CustomBadge';
import CustomTooltip from './antd/CustomTooltip';
import CustomPopover from './antd/CustomPopover';
import CustomCol from './antd/CustomCol';
import { CustomParagraph } from './antd/CustomTypography';
import { CustomModalInfo } from './antd/ModalMethods';

interface ButtonActionsProps {
  author?: { USERNAME?: string; ABOUT?: string; AVATAR?: string };
  comments?: number;
  isEditing?: boolean;
  likes?: string[];
  onComment?: () => void;
  onLike?: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  position?: {};
  preview?: boolean;
}

const Container = styled.div<ButtonActionsProps>`
  position: fixed;
  right: 5%;
  bottom: 5%;
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
`;

const ButtonActions: React.FC<ButtonActionsProps> = ({
  author,
  comments = 0,
  isEditing = false,
  likes: likedBy = [],
  onComment,
  onLike,
  onPreview,
  onPublish,
  position,
  preview,
}) => {
  const route = useRouter();

  const [likes, setLikes] = useState<string[]>(likedBy);

  useEffect(() => {
    setLikes(likedBy);
  }, [likedBy]);

  const { USERNAME } = getSessionInfo();
  const ILiked = likes?.includes(USERNAME);

  const postId = String(route.query.post_id);

  const [likePost] = useLikePost();

  const handleLike = async () => {
    try {
      if (!isLoggedIn()) {
        return CustomModalInfo({
          title: 'Inicia sesión',
          content: 'Para dar like a una publicación debes iniciar sesión',
        });
      }

      const data = await likePost({
        POST_ID: postId,
        USERNAME,
        OPTION: ILiked ? 1 : 0,
      }).unwrap();
      setLikes(data);
      onLike?.();
    } catch (error) {
      console.log(error);
    }
  };

  const iconStyle = {
    fontSize: '24px',
  };

  return (
    <Container position={position}>
      <CustomFlex gap={20} vertical style={{ width: 'max-content' }}>
        <ConditionalComponent
          condition={!isEditing}
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
          <>
            <CustomPopover
              title={`@${author?.USERNAME}`}
              content={
                <CustomCol
                  xs={24}
                  style={{
                    maxWidth: '200px',
                  }}
                >
                  <CustomParagraph>{author?.ABOUT}</CustomParagraph>
                </CustomCol>
              }
            >
              <CustomAvatar
                shadow
                size={36}
                src={author?.AVATAR}
                icon={<UserOutlined />}
              />
            </CustomPopover>
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
            <CustomBadge count={comments}>
              <CustomButton
                onClick={onComment}
                size={'large'}
                type={'text'}
                icon={<CommentOutlined style={iconStyle} />}
              />
            </CustomBadge>
          </>
        </ConditionalComponent>
      </CustomFlex>
    </Container>
  );
};

export default ButtonActions;
