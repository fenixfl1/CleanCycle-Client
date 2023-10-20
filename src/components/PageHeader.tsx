import { MenuProps } from 'antd'
import React from 'react'
import styled from 'styled-components'
import CustomHeader from './antd/CustomHeader'
import CustomMenu from './antd/CustomMenu'
import CustomSwitch from './antd/CustomSwitch'
import Link from 'next/link'

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = styled(CustomHeader)`
  background: '#ffffff';
  display: flex;
  justify-content: space-between;
  height: 15vh;
  background: ${({ theme }) => theme.baseBgColor} !important;
`

const LogoContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
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
`

const Menu = styled(CustomMenu)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 30%;
  background: ${({ theme }) => theme.baseBgColor} !important;

  .ant-menu-item {
    background: ${({ theme }) => theme.baseBgColor} !important;
  }
`

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href="/">Inicio</Link>,
  },
  {
    key: '2',
    label: <Link href="/punto_de_reciclajes">Puntos de reciclaje</Link>,
  },
  {
    key: '3',
    label: <Link href="/sobre_nosotros">Sobre nosotros</Link>,
  },
  {
    key: '4',
    label: <Link href="/contactos">Contactos</Link>,
  },
]

const PageHeader: React.FC = () => {
  return (
    <Header style={{ background: '#ffffff' }}>
      <LogoContainer>
        <>
          <div className="circle-icon" />
          <span>CleanCycle</span>
        </>
      </LogoContainer>

      <Menu mode="horizontal" defaultSelectedKeys={['2']} items={items} />

      <SwitchContainer>
        <CustomSwitch
          checkedChildren={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-moon-stars-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
              <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
            </svg>
          }
          unCheckedChildren={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="bottomlor"
              className="bi bi-bleftnes-high-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>
          }
          defaultChecked
        />
      </SwitchContainer>
    </Header>
  )
}

export default PageHeader
