import {
  ButtonActions,
  ConditionalComponent,
  FrontPage,
  PostPreview,
  TextEditor,
} from '@/components'
import EditableInput from '@/components/EditableInput'
import CustomCol from '@/components/antd/CustomCol'
import CustomForm from '@/components/antd/CustomForm'
import CustomFormItem from '@/components/antd/CustomFormItem'
import CustomRow from '@/components/antd/CustomRow'
import CustomSpace from '@/components/antd/CustomSpace'
import CustomSpin from '@/components/antd/CustomSpin'
import { CustomParagraph } from '@/components/antd/CustomTypography'
import customNotification from '@/components/antd/customNotification'
import { PATH_HOME } from '@/constants/routes'
import getBase64 from '@/helpers/getBase64'
import sleep from '@/helpers/sleep'
import { Post } from '@/redux/slices/postsSlice'
import { useCreatePost } from '@/services/posts'
import { colBreakpoints } from '@/themes/breakpoints'
import { Form, UploadFile } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const EditorContainer = styled.div`
  width: 816px;
  border: 1px solid #e8e8e8;
  border-radius: ${({ theme }) => theme.borderRadius};
  height: calc(100vh - 140px);
  font-size: 16px !important;

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
`

const NewPost: React.FC = () => {
  const router = useRouter()
  const [form] = Form.useForm<Post>()
  const content = Form.useWatch('CONTENT', form)
  const [postTitle, setPostTitle] = useState<string>('')
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>()
  const [loadingFrontPage, setLoadingFrontPage] = useState<boolean>(false)
  const [frontPageImage, setFrontPageImage] = useState<string>('')
  const [record, setRecord] = useState<Partial<Post>>({})
  const [preview, setPreview] = useState<boolean>(false)

  const [createPost, { isLoading }] = useCreatePost()

  useEffect(() => {
    window.onbeforeunload = () => true
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  const handleOnUpload = async (file: UploadFile): Promise<boolean> => {
    setLoadingFrontPage(true)
    const image = await getBase64(file)

    await sleep(1)
    setLoadingFrontPage(false)
    setFrontPageImage(`${image}`)
    return new Promise((resolve) => {
      return resolve(true)
    })
  }

  const handleOnCreatePost = async () => {
    try {
      const post = await form.validateFields()

      post.FRONT_PAGE = frontPageImage
      post.TITLE = postTitle

      await createPost(post).unwrap()
      router.push(PATH_HOME)
      router.reload()
    } catch (error) {
      customNotification({
        title: 'Error',
        description: 'Ocurrió un error al crear el post',
        type: 'error',
      })
    }
  }

  const handleOnPreview = () => {
    if (preview) {
      setPreview(false)
      setRecord({})

      return
    }

    setRecord({
      CONTENT: content ?? '',
      TITLE: postTitle,
      FRONT_PAGE: frontPageImage,
      AUTHOR: 'Yo',
      CREATED_AT: new Date().toISOString(),
      AVATAR: 'https://i.imgur.com/3tC8p0Z.png',
      STATE: 'false',
      POST_ID: 0,
    })
    setPreview(!preview)
  }

  return (
    <CustomSpin spinning={isLoading}>
      <CustomRow justify={'center'}>
        <CustomCol {...colBreakpoints}>
          <CustomRow justify={'center'}>
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
                    <CustomForm form={form}>
                      <EditableInput
                        name={'TITLE'}
                        editable={true}
                        value={postTitle}
                        inputProps={{ placeholder: 'Título del post' }}
                        onFinish={setPostTitle}
                        onEdit={(_, editing) => setIsEditingTitle(editing)}
                      />
                      <CustomFormItem hidden name={'CONTENT'} />
                    </CustomForm>
                  </div>
                  <EditorContainer>
                    <TextEditor
                      htmlContent={content}
                      onChange={(content) =>
                        form.setFieldsValue({ CONTENT: content })
                      }
                      style={{ width: '100%', height: '1000px' }}
                    />
                  </EditorContainer>
                </CustomSpace>
              </div>
            </ConditionalComponent>
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
  )
}

export default NewPost
