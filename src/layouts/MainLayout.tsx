import Flex from '@components/Flex';
import { Header } from '@components/Typography';
import FileUploadingModule from '@modules/FileUploading/FileUploading';
import Navigation from '@modules/Navigation/Navigation';
import logo from '@public/img/logo.png';
import { uiActions } from '@store/ui';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { navPoints } from './constants';
import ConflictUpload from '@modules/ConflictUpload/ConflictUpload';
import { fetchEquipment } from '@store/ui/thunks';

const Line = styled.div`
  height: 132px;
  border-left: 3px #006fb9 solid;
`;

const MainLayout = () => {
  const dispatch = useDispatch();
  const fileUploadRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // @ts-ignore
    const fetch = () => dispatch(fetchEquipment());

    const intervalId = setInterval(fetch, 10000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let activeIndex = null; // Переменная для хранения активного индекса

        entries.forEach((entry) => {
          const rect = entry.target.getBoundingClientRect();
          const index = Number(entry.target.getAttribute('data-index'));

          // Проверяем, если элемент виден и его верхний край находится на 275 пикселей от верхней части экрана
          console.log(index, rect.top);
          if (rect.top <= 950 && rect.bottom >= 0) {
            activeIndex = index; // Устанавливаем активный индекс
          }
        });

        // Если был найден активный индекс, обновляем его в Redux
        if (activeIndex !== null) {
          dispatch(uiActions.setActiveTab(activeIndex));
        }
      },
      {
        threshold: [0], // Устанавливаем порог, чтобы срабатывать при любом пересечении
      },
    );

    fileUploadRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      fileUploadRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [dispatch, fileUploadRefs]);
  return (
    <>
      <header
        style={{
          padding: '30px 40px',
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
          <div style={{ position: 'sticky', top: 0, paddingTop: 40 }}>
            <Navigation data={navPoints} scrollToRef={fileUploadRefs} />
          </div>
          <Flex direction="column" gap="200px">
            <div
              ref={(el) => (fileUploadRefs.current[0] = el)}
              data-index={0}
              id={`section-0`}
            >
              <FileUploadingModule />
            </div>
            <div
              ref={(el) => (fileUploadRefs.current[1] = el)}
              data-index={1}
              id={`section-1`}
            >
              <ConflictUpload />
            </div>
          </Flex>
        </Flex>
      </main>
    </>
  );
};

export default MainLayout;
