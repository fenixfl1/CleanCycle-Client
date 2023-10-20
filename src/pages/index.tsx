import CustomButton from '@/components/antd/CustomButton'
import CustomRow from '@/components/antd/CustomRow'
import CustomTitle from '@/components/antd/CustomTitle'
import { CustomParagraph } from '@/components/antd/CustomTypography'
import styled from 'styled-components'

const Image = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius};
  // box-shadow: ${({ theme }) => theme.boxShadow};
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  width: 70%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 1802px) {
    width: 80%;
  }
`

const Home = () => {
  return (
    <CustomRow>
      <Container>
        <div>
          <CustomTitle>Waste Recycle</CustomTitle>
          <CustomParagraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quos, voluptas, dolorum quia voluptates quas
            exercitationem natus quibusdam doloribus voluptate. Quisquam
            voluptatum, quos, voluptas, dolorum quia voluptates quas
            exercitationem natus quibusdam doloribus voluptate.
            <br />
            <br />
            <CustomButton type="primary">Leer más</CustomButton>
          </CustomParagraph>
        </div>
        <Image src="\assets\img\undraw_Clean_up_re_504g.png" alt="" />
      </Container>
    </CustomRow>
  )
}

export default Home
