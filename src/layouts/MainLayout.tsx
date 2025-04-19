import Flex from '@components/Flex';
import { Header } from '@components/Typography';
import FileUploadingModule from '@modules/FileUploading/FileUploading';
import Navigation from '@modules/Navigation/Navigation';
import logo from '@public/img/logo.png';
import styled from 'styled-components';

const Line = styled.div`
  height: 132px;
  border-left: 3px #006fb9 solid;
`;

const MainLayout = () => {
  return (
    <>
      <header
        style={{
          padding: '30px 40px',
          position: 'sticky',
          backgroundColor: '#fff',
        }}
      >
        <Flex gap="22px" align="center">
          <Flex gap="22px">
            <img src={logo} width={212} height={110} />
            <Line />
          </Flex>
          <Header>Система поддержки БДКЕ</Header>
        </Flex>
      </header>
      <main>
        <Flex style={{ margin: 116 }} justify="space-between">
          <Navigation
            data={[
              'Загрузка данных',
              'Поиск дубликатов',
              'хуй',
              'пизда',
              'залупа',
            ]}
          />
          <FileUploadingModule />
        </Flex>
      </main>
    </>
  );
};

export default MainLayout;
