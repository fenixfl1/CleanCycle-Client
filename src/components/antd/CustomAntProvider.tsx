import React from 'react'
import { ConfigProvider } from 'antd'
import { antTheme } from '@/themes/themes'

interface CustomAntProviderProps {
  children: React.ReactNode
}

const CustomAntProvider: React.FC<CustomAntProviderProps> = ({ children }) => {
  return <ConfigProvider theme={{ ...antTheme }}>{children}</ConfigProvider>
}

export default CustomAntProvider
