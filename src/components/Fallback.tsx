import React from 'react'
import CustomRow from './antd/CustomRow'
import CustomSpin from './antd/CustomSpin'

interface FallbackProp {
  width?: string | number
  height?: string | number
}

const Fallback: React.FC<FallbackProp> = ({
  width = '100%',
  height = '100vh',
}) => {
  return (
    <CustomRow
      align={'middle'}
      width={width}
      height={height}
      justify={'center'}
    >
      <CustomSpin spinning size={'large'}>
        {' '}
      </CustomSpin>
    </CustomRow>
  )
}

export default Fallback
