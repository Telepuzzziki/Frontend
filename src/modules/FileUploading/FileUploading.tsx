import Flex from '@components/Flex';
import { SubHeader, Text } from '@components/Typography';
import { uiActions, uiSelectors } from '@store/ui';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { content } from '@lib/theme/colors';
import { showErrorNotification } from '@lib/utils/notification';
// import { FileUploader } from 'react-drag-drop-files';

const FileUploader = styled.div`
  cursor: pointer;
  background-color: rgba(0, 111, 185, 0.1);
  border: 3px ${content.primary} dashed;
  border-radius: 10px;
  padding: 80px 40px;
`;

const FileUploadingModule = () => {
  const dispatch = useDispatch();
  const file = useSelector(uiSelectors.getFile);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      if (acceptedFiles[0].type === 'text/csv') {
        dispatch(
          uiActions.setFile({
            file: acceptedFiles[0],
            name: acceptedFiles[0].name,
          }),
        );
      } else {
        showErrorNotification('Недопустимый тип файла');
        console.log(acceptedFiles[0].type);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <Flex flex="1" align="center" direction="column" gap="30px">
      <SubHeader>Загрузите файл базы конфигурационных единиц</SubHeader>
      <Flex gap="10px" direction="column" align="left">
        <FileUploader {...getRootProps()}>
          <div>
            <input {...getInputProps()} />
            <Text $color={content.primary}>
              Перетащите файл сюда, или кликните для выбора файла
            </Text>
          </div>
          {file?.name && (
            <Flex align="center" $top="medium" justify="center">
              <div>
                <p>Загруженный файл: {file.name}</p>
              </div>
              <svg
                onClick={() => dispatch(uiActions.setFile(null))}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Flex>
          )}
        </FileUploader>
        <Text $size="small" $color={content.light}>
          Поддерживаемый формат - .csv
        </Text>
      </Flex>
    </Flex>
  );
};

export default FileUploadingModule;
