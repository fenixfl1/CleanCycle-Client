import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomRow from './antd/CustomRow';
import CustomTextArea from './antd/CustomTextArea';
import CustomAvatar from './antd/CustomAvatar';
import { getSessionInfo } from '@/lib/session';
import CustomCol from './antd/CustomCol';
import { CaretRightOutlined, FileImageOutlined } from '@ant-design/icons';
import CustomButton from './antd/CustomButton';
import styled from 'styled-components';
import CustomTooltip from './antd/CustomTooltip';
import { EmojiSmileFill, SendFill } from '@/icons';
import EmojiPicker from 'emoji-picker-react';
import { ConditionalComponent } from '.';
import CustomPopover from './antd/CustomPopover';
import CustomSpace from './antd/CustomSpace';
import { defaultTheme } from '@/themes/themes';
import CustomUpload from './antd/CustomUpload';
import { Form, FormInstance, UploadFile } from 'antd';
import getBase64 from '@/helpers/getBase64';
import CustomForm from './antd/CustomForm';
import CustomFormItem from './antd/CustomFormItem';

const Container = styled(CustomRow)`
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.whiteBackground};
  padding: 10px;
  background-color: ${({ theme }) => theme.whiteBackground};

  textarea {
    font-size: 16px !important;
  }
`;

const Textarea = styled.div`
  width: 100%;
  min-height: 40px;
  height: auto;
  font-size: 16px;

  &:empty:before {
    content: attr(placeholder);
    color: #aaa;
  }

  &:focus {
    outline: none;
  }

  img {
    width: 250px;
    height: auto;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

interface CommentBoxProps {
  onComment?(comment: string): Promise<void>;
  form?: FormInstance<{ COMMENT: string }>;
}

const CommentBox: React.FC<CommentBoxProps> = ({ onComment, form }) => {
  const comment = Form.useWatch('COMMENT', form);
  const textAreaRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLDivElement>(null);

  const disabled = useMemo(() => {
    return !textAreaRef.current?.innerText && !comment;
  }, [textAreaRef.current?.innerText]);

  const insertEmoji = (emoji) => {
    const textarea = textAreaRef.current;

    if (textarea) {
      textarea.focus();

      const selection = window.getSelection();
      const range = document.createRange();

      const textNode = document.createTextNode(emoji.emoji);
      range.setStart(textarea, 0);
      range.insertNode(textNode);

      // Mueve el cursor al final del texto insertado
      range.setStartAfter(textNode);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const handleOnComment = async () => {
    const comment = textAreaRef.current?.innerText as string;
    await onComment?.(comment);
  };

  const handleOnClickUploadImage = () => {
    const input = fileRef.current?.querySelector('input');
    input?.click();
  };

  const handleUploadImage = async (file: UploadFile): Promise<boolean> => {
    try {
      const img = await getBase64(file);

      const imgTag = `<br /> <img src="${img}" alt="img" />`;
      const textarea = textAreaRef.current as HTMLDivElement;

      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(range.createContextualFragment(imgTag));
        selection.removeAllRanges();
      } else {
        textarea.innerHTML += imgTag;
      }

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(false);
    }
  };

  return (
    <CustomRow gap={5} justify={'start'}>
      <CustomAvatar shadow size={36} src={getSessionInfo().AVATAR} />
      <CustomCol xs={21}>
        <Container justify={'end'} gap={10}>
          <CustomCol xs={24}>
            <CustomForm form={form} layout={'vertical'}>
              <CustomFormItem name={'COMMENT'} noStyle>
                <Textarea
                  ref={textAreaRef}
                  contentEditable
                  placeholder={'Escribe un comentario...'}
                />
              </CustomFormItem>
            </CustomForm>
          </CustomCol>
          <CustomRow
            width={'100%'}
            justify={'space-between'}
            align={'middle'}
            style={{
              backgroundColor: defaultTheme.backgroundColor,
              borderRadius: defaultTheme.borderRadius,
            }}
          >
            <CustomCol xs={12}>
              <CustomSpace direction={'horizontal'} size={5}>
                <CustomPopover
                  placement={'top'}
                  trigger={'click'}
                  content={
                    <EmojiPicker
                      emojiStyle={'google' as never}
                      onEmojiClick={insertEmoji}
                    />
                  }
                >
                  <CustomButton
                    type={'text'}
                    icon={
                      <EmojiSmileFill
                        style={{
                          fontSize: 18,
                          color: defaultTheme.primaryColor,
                        }}
                      />
                    }
                  />
                </CustomPopover>
                <CustomTooltip title={'Adjuntar imagen'}>
                  <CustomButton
                    onClick={handleOnClickUploadImage}
                    type={'text'}
                    icon={
                      <FileImageOutlined
                        style={{
                          fontSize: 18,
                          color: defaultTheme.primaryColor,
                        }}
                      />
                    }
                  />
                  <div ref={fileRef} style={{ display: 'none' }}>
                    <CustomUpload
                      id={'upload-img'}
                      onUpload={handleUploadImage}
                    />
                  </div>
                </CustomTooltip>
              </CustomSpace>
            </CustomCol>
            <CustomTooltip title={'Comentar'}>
              <CustomButton
                // disabled={!comment}
                onClick={handleOnComment}
                size={'large'}
                type={'text'}
                icon={
                  <SendFill
                    fill={defaultTheme.primaryColor}
                    rotate={40}
                    size={20}
                  />
                }
              />
            </CustomTooltip>
          </CustomRow>
        </Container>
      </CustomCol>
    </CustomRow>
  );
};

export default CommentBox;
