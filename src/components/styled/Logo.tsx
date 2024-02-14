import styled from 'styled-components';
import ConditionalComponent from '../ConditionalComponent';
import CustomRow from '../antd/CustomRow';
import CustomCol from '../antd/CustomCol';
import { useRouter } from 'next/router';
import { PATH_HOME } from '@/constants/routes';

interface LogoProps {
  showText?: boolean;
}

const LogoContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;

  span {
    margin-left: 1rem;
    letter-spacing: 0.1em;
    font-size: 1.5em;
    font-weight: bold;
    color: ${({ theme }) => theme.primaryColor};
  }

  .circle-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryColor};
    position: relative;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  .circle-icon:before {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryColor};
    position: absolute;
    top: -6px
    left: 25px;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  .circle-icon:after {
    content: '';
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: -8px;
    left: 22px;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const Logo: React.FC<LogoProps> = ({ showText = true }) => {
  const route = useRouter();

  return (
    <LogoContainer onClick={() => route.push(PATH_HOME)}>
      <CustomRow justify={'center'} align={'middle'}>
        {/* <CustomCol xs={24}> */}
        <CustomRow justify={'center'}>
          <div className="circle-icon" />
        </CustomRow>
        {/* </CustomCol> */}
        <ConditionalComponent condition={showText} fallback={null}>
          <span>CleanCycle</span>
        </ConditionalComponent>
      </CustomRow>
    </LogoContainer>
  );
};

export default Logo;
