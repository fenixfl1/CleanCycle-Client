import { Rule } from 'antd/lib/form'
import { Form } from 'antd'
import { useFormContext } from '@/context/form'
import {
  CustomFormItemContext,
  CustomFormItemContextProviderProps,
  CustomFormItemProps,
} from '@/context/formItem'

const { Item } = Form

const CustomFormItemContextProvider: React.FC<
  CustomFormItemContextProviderProps
> = ({ children, ...props }) => {
  return (
    <CustomFormItemContext.Provider value={{ ...props }}>
      {children}
    </CustomFormItemContext.Provider>
  )
}

const patternOnlyLetter = '^[a-z A-Z ZÀ-ÿ]+$'
const patternOnlyNumbers = '^[0-9 -,]+$'
const patternAlfaNumeric = '^[a-z A-Z ZÀ-ÿ 0-9]+$'

const CustomFormItem: React.FC<CustomFormItemProps> = ({
  name,
  noSpaces,
  noSymbol,
  onlyNumber,
  onlyString,
  required,
  uppercase,
  valuePropName = 'value',
  ...props
}) => {
  const ctx = useFormContext()

  const isFile = name?.toString().includes('FILE')

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  if (onlyString) {
    props.normalize = (value: string) => {
      if (RegExp(patternOnlyLetter).test(value)) {
        let curValue = value
        if (ctx?.uppercase) curValue = value.toUpperCase()
        return curValue
      } else {
        return value.substring(0, value.length - 1)
      }
    }
  } else if (onlyNumber) {
    props.normalize = (value: string) =>
      value?.match(new RegExp(patternOnlyNumbers))
        ? value
        : value?.substring(0, value?.length - 1)
  } else if (noSymbol) {
    props.normalize = (value: string) =>
      value?.match(new RegExp(patternAlfaNumeric))
        ? value
        : value?.substring(0, value?.length - 1)
  } else {
    props.normalize = (value: string) =>
      typeof value?.toUpperCase == 'function' && (uppercase ?? ctx?.uppercase)
        ? value.toUpperCase()
        : value
  }

  if (noSpaces) {
    props.normalize = (value: string) => value?.replace(/\s/g, '')
  }

  const checkRequiredRule = () =>
    props.rules
      ? !!props.rules.find((value: Rule) => value['required' as keyof Rule])
      : undefined

  return (
    <CustomFormItemContextProvider
      required={required}
      uppercase={uppercase}
      noSymbol={noSymbol}
      onlyNumber={onlyNumber}
      onlyString={onlyString}
      name={name}
      {...props}
    >
      <Item
        name={name}
        valuePropName={isFile ? 'fileList' : valuePropName}
        getValueFromEvent={isFile ? normFile : undefined}
        required={checkRequiredRule() || required}
        {...props}
      >
        {props.children}
      </Item>
    </CustomFormItemContextProvider>
  )
}

export default CustomFormItem
