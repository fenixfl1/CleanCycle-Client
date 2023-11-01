import ConditionalComponent from '@/components/ConditionalComponent'
import Fallback from '@/components/Fallback'
import MotionComponent from '@/components/MotionComponent'
import CustomAntProvider from '@/components/antd/CustomAntProvider'
import store from '@/redux/store'
import GlobalStyle from '@/themes/GlobalStyle'
import { defaultTheme } from '@/themes/themes'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import Layout from './_layout'
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [demLoaded, setDemLoaded] = useState(false)

  useEffect(() => {
    setDemLoaded(true)
  }, [])

  return (
    <ConditionalComponent condition={demLoaded} fallback={<Fallback />}>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <CustomAntProvider>
            <Layout>
              <GlobalStyle />
              <MotionComponent>
                <Component {...pageProps} />
              </MotionComponent>
            </Layout>
          </CustomAntProvider>
        </ThemeProvider>
      </Provider>
    </ConditionalComponent>
  )
}

export default App
