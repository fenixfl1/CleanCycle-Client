import styled from 'styled-components';
import CustomUpload from './antd/CustomUpload';
import ConditionalComponent from './ConditionalComponent';
import { Image, UploadFile } from 'antd';
import { useState } from 'react';
import { CustomText } from './antd/CustomTypography';
import CustomSpin from './antd/CustomSpin';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string | number;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${({ height }) => height ?? '200px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.whiteBackground};
  position: relative;
  border: 1px solid ${({ theme }) => theme.borderColor};

  .btn-upload {
    z-index: 999;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 6px;

    button {
      background-color: transparent;
    }
  }

  img {
    width: 100%;
    height: 100%;
    cover: fill;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .image-loading {
    opacity: 0.5;
    transition: opacity 0.5s ease-in-out;
  }

  .placeholder {
    font-size: ${({ theme }) => theme.paragraphFontSize};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;
    letter-spacing: 1px;
    text-shadow: 15px 5px 15px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
`;

interface FrontPageProps extends ContainerProps {
  alt?: string;
  image?: string;
  onRemove?(file: UploadFile): Promise<boolean> | boolean;
  onUpload?(file: UploadFile): Promise<boolean>;
  showUploadButton?: boolean;
  loading?: boolean;
}

const FrontPage: React.FC<FrontPageProps> = ({
  alt,
  image,
  onRemove,
  onUpload,
  showUploadButton = true,
  placeholder = 'No image',
  loading,
  height,
  ...props
}) => {
  return (
    <CustomSpin spinning={loading}>
      <Container height={height} placeholder={placeholder} {...props}>
        <ConditionalComponent condition={showUploadButton}>
          <div className={'btn-upload'}>
            <CustomUpload
              showFiles={false}
              onRemove={onRemove}
              onUpload={onUpload}
              showText={false}
              listType={'picture'}
              buttonProps={{
                shape: 'circle',
                size: 'large',
              }}
            />
          </div>
        </ConditionalComponent>
        <ConditionalComponent condition={!!image}>
          <Image
            className={loading ? 'image-loading' : undefined}
            width={'100%'}
            height={height ?? '200px'}
            src={image}
            alt={alt}
          />
        </ConditionalComponent>
        <ConditionalComponent condition={!image && !!placeholder}>
          <CustomText copyable={false} className={'placeholder'}>
            {placeholder}
          </CustomText>
        </ConditionalComponent>
      </Container>
    </CustomSpin>
  );
};

export default FrontPage;
