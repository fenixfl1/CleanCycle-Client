import CustomButton from '@/components/antd/CustomButton'
import CustomResult from '@/components/antd/CustomResult'
import CustomRow from '@/components/antd/CustomRow'
import React from 'react'

const NotFound: React.FC = () => {
  return (
    <CustomResult
      title={'404'}
      subTitle={'Página no encontrada'}
      status={'404'}
      extra={
        <CustomRow justify={'center'}>
          <CustomButton type={'link'}>Volver al inicio</CustomButton>
        </CustomRow>
      }
    />
  )
}

export default NotFound
