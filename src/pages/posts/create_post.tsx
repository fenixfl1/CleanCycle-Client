import {
  ButtonActions,
  ConditionalComponent,
  FrontPage,
  PostPreview,
  TextEditor,
} from '@/components';
import EditableInput from '@/components/EditableInput';
import CustomCol from '@/components/antd/CustomCol';
import CustomDivider from '@/components/antd/CustomDivider';
import CustomForm from '@/components/antd/CustomForm';
import CustomFormItem from '@/components/antd/CustomFormItem';
import CustomRow from '@/components/antd/CustomRow';
import CustomSpace from '@/components/antd/CustomSpace';
import CustomSpin from '@/components/antd/CustomSpin';
import CustomTitle from '@/components/antd/CustomTitle';
import customNotification from '@/components/antd/customNotification';
import { PATH_HOME } from '@/constants/routes';
import getBase64 from '@/helpers/getBase64';
import { getPostDescription } from '@/helpers/getPostDescription';
import sleep from '@/helpers/sleep';
import { getSessionInfo } from '@/lib/session';
import { Post } from '@/redux/slices/postsSlice';
import { useCreatePost } from '@/services/posts';
import { colBreakpoints } from '@/themes/breakpoints';
import { Form, UploadFile } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  width: 816px;
  // border: 1px solid #e8e8e8;
  border-radius: ${({ theme }) => theme.borderRadius};
  // height: calc(100vh - 250px);
  font-size: 16px !important;
  // overflow: hidden;

  .sc-cMljjf {
    border-radius: ${({ theme }) => theme.borderRadius} !important;
  }

  .quill {
    background-color: ${({ theme }) => theme.whiteBackground} !important;
    border-radius: ${({ theme }) => theme.borderRadius} !important;
    font-size: 16px !important;

    pre {
      background-color: #f7f7f7 !important;
      border-radius: ${({ theme }) => theme.borderRadius} !important;
      padding: 10px !important;
      color: ${({ theme }) => theme.textColor} !important;
    }
  }

  .ql-toolbar {
    font-size: 16px !important;
    border-bottom: 1px solid #e8e8e8 !important;
    display: flex !important;
    justify-content: center !important;
  }
`;

const NewPost: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<Post>();
  const content = Form.useWatch('CONTENT', form);
  const previewText = Form.useWatch('PREVIEW_TEXT', form);
  const [postTitle, setPostTitle] = useState<string>('Titulo del post');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>();
  const [loadingFrontPage, setLoadingFrontPage] = useState<boolean>(false);
  const [frontPageImage, setFrontPageImage] = useState<string>('');
  const [record, setRecord] = useState<Partial<Post>>({});
  const [preview, setPreview] = useState<boolean>(false);

  const [createPost, { isLoading }] = useCreatePost();

  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const handleOnUpload = async (file: UploadFile): Promise<boolean> => {
    setLoadingFrontPage(true);
    const image = await getBase64(file);

    await sleep(1);
    setLoadingFrontPage(false);
    setFrontPageImage(`${image}`);
    return new Promise((resolve) => {
      return resolve(true);
    });
  };

  const handleOnCreatePost = async () => {
    try {
      window.onbeforeunload = null;
      const post = await form.validateFields();

      post.FRONT_PAGE = frontPageImage;

      await createPost(post).unwrap();

      // redirect to home page
      router.push(PATH_HOME);
      sleep(1);
      router.reload();
      customNotification({
        title: 'Post creado',
        description:
          'El post se ha creado correctamente. el post esta siendo revisado por un administrador. será avisado  cuando sea aprobado',
        type: 'success',
      });
    } catch (error) {
      customNotification({
        title: 'Error',
        description: 'Ocurrió un error al crear el post',
        type: 'error',
      });
    }
  };

  const handleOnPreview = () => {
    if (preview) {
      setPreview(false);
      setRecord({});

      return;
    }

    setRecord({
      PREVIEW_TEXT: previewText,
      TITLE: postTitle,
      FRONT_PAGE: frontPageImage,
      AUTHOR: 'Yo',
      CREATED_AT: new Date().toISOString(),
      AVATAR: getSessionInfo().AVATAR || '',
      STATE: 'false',
      POST_ID: 0,
    });
    setPreview(!preview);
  };

  return (
    <CustomSpin spinning={isLoading}>
      <CustomRow justify={'center'}>
        <CustomCol {...colBreakpoints}>
          <CustomRow justify={'center'}>
            <CustomForm form={form}>
              <ConditionalComponent
                condition={!preview}
                fallback={<PostPreview post={record as Post} />}
              >
                <div style={{ width: '816px' }}>
                  <CustomSpace size={20}>
                    <FrontPage
                      loading={loadingFrontPage}
                      height={frontPageImage ? '200px' : '80px'}
                      placeholder={'Aquí la portada del post'}
                      onUpload={handleOnUpload}
                      image={frontPageImage}
                      alt={'Logo'}
                    />
                    <div
                      style={{ minWidth: isEditingTitle ? '400px' : undefined }}
                    >
                      <EditableInput
                        name={'TITLE'}
                        editable={true}
                        value={postTitle}
                        inputProps={{ placeholder: 'Título del post' }}
                        onFinish={setPostTitle}
                        onEdit={(_, editing) => setIsEditingTitle(editing)}
                      />
                      <CustomFormItem hidden name={'CONTENT'} />
                    </div>
                    <EditorContainer>
                      <TextEditor
                        htmlContent={content}
                        style={{ width: '100%', height: '1000px' }}
                        onChange={(content) =>
                          form.setFieldsValue({
                            CONTENT: content,
                            PREVIEW_TEXT: getPostDescription(content ?? ''),
                          })
                        }
                      />
                    </EditorContainer>

                    <div style={{ height: '20px' }} />
                    <CustomDivider>
                      <CustomTitle level={4}>Resumen del post</CustomTitle>
                    </CustomDivider>
                    <div style={{ width: '100%', height: '200px' }}>
                      <TextEditor
                        htmlContent={previewText}
                        style={{ width: '100%', height: '100%' }}
                        onChange={(content) => {
                          form.setFieldsValue({ PREVIEW_TEXT: content });
                        }}
                      />
                    </div>
                    <div style={{ height: '20px' }} />
                    <CustomFormItem hidden name={'PREVIEW_TEXT'} />
                  </CustomSpace>
                </div>
              </ConditionalComponent>
            </CustomForm>
            <ButtonActions
              isEditing
              preview={preview}
              onPreview={handleOnPreview}
              onPublish={handleOnCreatePost}
              position={{ top: 150, right: 220 }}
            />
          </CustomRow>
        </CustomCol>
      </CustomRow>
    </CustomSpin>
  );
};

export default NewPost;
