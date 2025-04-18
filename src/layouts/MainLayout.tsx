import Flex from '@components/Flex';
import { Header } from '@components/Typography';
import logo from '@public/img/logo.png';
import styled from 'styled-components';

const Line = styled.div`
  height: 132px;
  border-left: 3px #006fb9 solid;
`;

const MainLayout = () => {
  return (
    <>
      <header style={{ padding: '30px 40px' }}>
        <Flex gap="22px" align="center">
          <Flex gap="22px">
            <img src={logo} width={212} height={110} />
            <Line />
          </Flex>
          <Header>Система поддержки БДКЕ</Header>
        </Flex>
      </header>
    </>
  );
};

export default MainLayout;
