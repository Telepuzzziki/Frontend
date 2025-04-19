import Flex from '@components/Flex';
import { Header } from '@components/Typography';
import FileUploadingModule from '@modules/FileUploading/FileUploading';
import Navigation from '@modules/Navigation/Navigation';
import logo from '@public/img/logo.png';
import { uiActions } from '@store/ui';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Line = styled.div`
  height: 132px;
  border-left: 3px #006fb9 solid;
`;

const MainLayout = () => {
  const dispatch = useDispatch();
  const fileUploadRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            <Navigation
              data={[
                'Загрузка данных',
                'Поиск дубликатов',
                'хуй',
                'пизда',
                'залупа',
              ]}
              scrollToRef={fileUploadRefs}
            />
          </div>
          <Flex direction="column" gap="400px">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                ref={(el) => (fileUploadRefs.current[index] = el)}
                data-index={index}
                id={`section-${index}`}
              >
                <FileUploadingModule />
              </div>
            ))}
          </Flex>
        </Flex>
      </main>
    </>
  );
};

export default MainLayout;
