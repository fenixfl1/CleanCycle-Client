import React, { useCallback, useEffect } from 'react'
import CustomInput, { CustomInputProps } from './antd/CustomInput'
import styled from 'styled-components'
import { SearchOutlined } from '@ant-design/icons'

interface SearchEvent extends Event {
  target: HTMLInputElement
}

interface SearchComponentProps extends Omit<CustomInputProps, 'bordered'> {
  onSearch?(value: string): void
  icon?: React.ReactNode
  loading?: boolean
  trigger?: keyof Pick<DocumentEventMap, 'change' | 'keydown'>
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background: ${({ theme }) => theme.theme === 'dark' && theme.bgDark};
`

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  icon = <SearchOutlined style={{ fontSize: 18 }} />,
  loading,
  placeholder = 'Buscar...',
  ...props
}) => {
  const handleEvent = useCallback(
    (e: Event) => {
      const target = e.target as HTMLInputElement
      onSearch?.(target.value)
    },
    [onSearch],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEvent)

    return () => {
      document.removeEventListener('keydown', handleEvent)
    }
  }, [handleEvent])

  return (
    <SearchContainer>
      <CustomInput
        bordered={false}
        placeholder={placeholder}
        suffix={icon}
        {...props}
      />
    </SearchContainer>
  )
}

export default SearchComponent
