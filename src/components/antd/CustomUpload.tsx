import React, { useState } from 'react'
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload'
import { Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { useFormContext } from '@/context/form'
import { useFormItemContext } from '@/context/formItem'
import { NamePath } from 'antd/es/form/interface'
import CustomButton, { CustomButtonProps } from './CustomButton'
import CustomModal from './CustomModal'
import sleep from '@/helpers/sleep'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface CustomUploadProps extends UploadProps {
  onlyImages?: boolean
  onUpload?(file: UploadFile): Promise<boolean>
  buttonProps?: CustomButtonProps
  showText?: boolean
  showFiles?: boolean
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType = 'picture-card',
  maxCount = 1,
  onlyImages = true,
  buttonProps = { type: 'link' },
  showText = true,
  onUpload,
  onChange,
  onRemove,
  showFiles = true,
  ...props
}): React.ReactElement => {
  const { form } = useFormContext()
  const { name, readonly } = useFormItemContext()
  const _fileList = Form.useWatch(name as NamePath, form)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps['onChange'] = (info) => {
    setFileList(showFiles ? info.fileList : [])
    form?.setFieldsValue({
      [name as string]: info.file,
    })
    onChange?.(info)
  }

  const dummyRequest = async (options: UploadRequestOption) => {
    const { file, onError, onSuccess } = options
    let isOk = true
    await sleep(1)
    if (typeof onUpload === 'function') isOk = await onUpload(file as never)

    if (!isOk) {
      onError?.({ status: 500 } as never)
      form?.resetFields([name as string])
    } else onSuccess?.(file, { status: 200 } as never)
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1) || '',
    )
  }

  const handleOnRemove = (file: UploadFile) => {
    if (readonly) return false

    const newFileList = fileList?.filter((item) => item.uid !== file.uid)
    form?.setFieldsValue({
      [name as string]: {
        fileList: newFileList.map((item) => ({ url: item.thumbUrl })),
      },
    })
    setFileList(newFileList)
    onRemove?.(file)
  }

  const handleCancel = () => setPreviewOpen(false)

  const uploadButton = (
    <CustomButton
      icon={<UploadOutlined />}
      disabled={readonly}
      {...buttonProps}
    >
      {showText && 'Cargar'}
    </CustomButton>
  )

  return (
    <>
      <Upload
        accept={onlyImages ? 'image/*' : undefined}
        action={action}
        customRequest={dummyRequest}
        fileList={fileList}
        listType={listType}
        maxCount={maxCount}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleOnRemove}
        {...props}
      >
        {_fileList?.length >= maxCount || fileList.length ? null : uploadButton}
      </Upload>

      <CustomModal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </CustomModal>
    </>
  )
}

export default CustomUpload
