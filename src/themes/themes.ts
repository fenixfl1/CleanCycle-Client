import { ThemeConfig } from 'antd/es/config-provider/context'
import { theme } from 'antd'
import { DefaultTheme } from 'styled-components'
import * as Colors from '@ant-design/colors'
import { Theme } from '@/constants/types'

type Colors = typeof Colors

type BreakpointConfig = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string
    baseBgColor: string
    bgDark: string
    borderColor: string
    borderRadius: string
    boxShadow: string
    breakpoints: BreakpointConfig
    colorPrimaryHover: string
    colors: Colors
    compact: boolean
    primaryColor: string
    secondaryColor: string
    textColor: string
    theme: Theme
    whiteBackground: string
    colorPrimaryText: string
    secondaryColorHover: string
    paragraphFontSize: string
    h1FontSize: string
    secondaryTextColor: string
  }
}

export const defaultTheme: DefaultTheme = {
  primaryColor: Colors.purple[6],
  secondaryColor: Colors.green[6],
  baseBgColor: '#ffffff',
  backgroundColor: Colors.gray[1],
  textColor: Colors.gray[9],
  borderRadius: '10px',
  borderColor: '#f0f0f0',
  theme: 'light',
  compact: true,
  colorPrimaryHover: '#f9f0ff',
  colorPrimaryText: '#9254de',
  boxShadow:
    'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
  colors: Colors,
  bgDark: '#141414',
  whiteBackground: '#fff',
  secondaryColorHover: 'rgba(0, 0, 0, 0.06)',
  paragraphFontSize: '18px',
  h1FontSize: '32px',
  secondaryTextColor: '#8c8c8c',
  breakpoints: {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  },
}

const { compactAlgorithm, darkAlgorithm, defaultConfig } = theme

export const antTheme: ThemeConfig = {
  ...defaultConfig,
  token: {
    borderRadius: 8,
    colorPrimary: Colors.purple[6],
    fontFamily: 'Segoe UI, sans-serif, Comic Sans MS, Comic Sans, cursive',
  },
  components: {
    Menu: {
      lineWidth: 0,
      colorPrimary: Colors.purple[6],
      fontSize: 14,
    },
    Button: {
      controlOutline: 'none',
    },
    Typography: {
      fontSize: 22,
    },
  },
  algorithm: [compactAlgorithm],
}
