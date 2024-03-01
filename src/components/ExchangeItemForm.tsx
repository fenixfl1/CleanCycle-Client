import React, { useMemo } from 'react';
import CustomModal from './antd/CustomModal';
import CustomForm from './antd/CustomForm';
import { Form } from 'antd';
import CustomRow from './antd/CustomRow';
import CustomCol from './antd/CustomCol';
import CustomFormItem from './antd/CustomFormItem';
import CustomInput from './antd/CustomInput';
import CustomTitle from './antd/CustomTitle';
import CustomDivider from './antd/CustomDivider';
import CustomTextArea from './antd/CustomTextArea';
import CustomSelect from './antd/CustomSelect';
import CustomMentions from './antd/CustomMentions';
import CustomUpload from './antd/CustomUpload';
import {
  normalizeFileList,
  normalizePhone,
} from '@/helpers/formValueNormalize';
import {
  useCreateExchangeItemMutation,
  useGetExchangesItemsMutation,
  useGetTagsQuery,
} from '@/services/exchanges';
import CustomSpin from './antd/CustomSpin';
import customNotification from './antd/customNotification';
import getBase64 from '@/helpers/getBase64';
import { ExchangeItem } from '@/redux/slices/exchangesSlice';
import CustomInputGroup from './antd/CustomInputGroup';

export const getImagesString = async (images: any[]) => {
  try {
    const promises = images.map(async (image) => {
      const base64 = await getBase64(image.originFileObj);
      return base64;
    });

    const base64Strings = await Promise.all(promises);

    const obj = base64Strings.map((base64, index) => ({
      name: 'image',
      image: base64,
    }));

    return obj;
  } catch (error) {
    console.error({ error });
  }
};

interface ExchangeItemFormProps {
  open: boolean;
  onCancel?(formValue: any): void;
  onCreate?(item: ExchangeItem): Promise<void>;
}

const ExchangeItemForm: React.FC<ExchangeItemFormProps> = ({
  open,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm();
  const contactType = Form.useWatch('CONTACT_TYPE', form);
  const { data: tags } = useGetTagsQuery('');
  const [createExchangeItem, { isLoading }] = useCreateExchangeItemMutation();

  const [getExchangeItems] = useGetExchangesItemsMutation();

  const handleOnCloseModal = () => {
    const formValue = form.getFieldsValue();
    onCancel?.(formValue);
  };

  const tagsOptions = useMemo(() => {
    return tags?.map((tag) => ({ value: tag.TAG_ID, label: tag.NAME }));
  }, [tags]);

  const handleOnCreateExchangeItem = async () => {
    try {
      const data = await form.validateFields();

      data.IMAGES = await getImagesString(data.IMAGES);

      const response = await createExchangeItem(data).unwrap();

      if (typeof onCreate === 'function') {
        return onCreate(response);
      }

      onCancel?.({});
      const condition = {
        ITEM_NAME: '',
        STATE: true,
      };
      getExchangeItems({ condition });
    } catch (error) {
      customNotification({
        description: error.error,
        title: 'Error al crear el articulo de intercambio',
        type: 'error',
      });
    }
  };

  return (
    <CustomModal
      onCancel={handleOnCloseModal}
      open={open}
      width={'30%'}
      onOk={handleOnCreateExchangeItem}
      title={<CustomTitle>Crear un articulo de intercambio</CustomTitle>}
    >
      <CustomDivider />
      <CustomSpin spinning={isLoading}>
        <CustomForm form={form} layout={'vertical'}>
          <CustomRow justify={'start'}>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Titulo'}
                name={'ITEM_NAME'}
                rules={[{ required: true }]}
              >
                <CustomInput
                  placeholder={'Titulo del articulo de intercambio'}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem label={'Contacto'} rules={[{ required: true }]}>
                <CustomInputGroup>
                  <CustomFormItem
                    noStyle
                    name={'CONTACT_TYPE'}
                    getValueFromEvent={
                      contactType === 'phone' ? normalizePhone : undefined
                    }
                  >
                    <CustomSelect
                      width={'20%'}
                      placeholder={'Tipo de contacto'}
                      options={[
                        { label: 'Correo', value: 'email' },
                        { label: 'Teléfono', value: 'phone' },
                      ]}
                    />
                  </CustomFormItem>
                  <CustomFormItem
                    noStyle
                    name={'CONTACT'}
                    rules={[
                      {
                        required: true,
                        type: contactType,
                      },
                    ]}
                  >
                    <CustomInput width={'80%'} placeholder={'Contacto'} />
                  </CustomFormItem>
                </CustomInputGroup>
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={18}>
              <CustomFormItem
                label={'Etiquetas'}
                name={'TAGS'}
                rules={[{ required: false }]}
              >
                <CustomSelect
                  mode="multiple"
                  options={tagsOptions}
                  placeholder={'Etiquetas del articulo de intercambio'}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={6}>
              <CustomFormItem
                label={'Estado'}
                name={'ITEM_STATE'}
                rules={[{ required: true }]}
              >
                <CustomSelect
                  placeholder={'Estado del articulo de intercambio'}
                  options={[
                    { label: 'Nuevo', value: 1 },
                    { label: 'Usado, Como nuevo', value: 2 },
                    { label: 'Usado', value: 3 },
                  ]}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Descripción'}
                name={'DESCRIPTION'}
                rules={[{ required: true }]}
              >
                <CustomTextArea
                  autoSize={{ minRows: 5, maxRows: 10 }}
                  placeholder={'Descripción del articulo de intercambio'}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={'Imágenes'}
                name={'IMAGES'}
                rules={[{ required: true }]}
                getValueFromEvent={normalizeFileList}
                valuePropName="fileList"
              >
                <CustomUpload maxCount={5} />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  );
};

export default ExchangeItemForm;
