import {
  showErrorNotification,
  showSuccessNotification,
} from '@lib/utils/notification';
import { ApiError, AppApi } from '@type/api';
import { Equipment, EquipmentData } from '@type/common';
// import { ApiResponse } from '@type/common';
import axios, { AxiosError } from 'axios';

const defaultHeaders = {
  'Accept-Language': 'ru',
  'Content-type': 'application/json',
};

const createRequestInstance = (): AppApi => {
  const instance = axios.create({
    baseURL: 'localhost:8000',
    headers: defaultHeaders,
  });
  instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
      if (error.status === 401) {
        return;
      } else if (error.status === 500) {
        showErrorNotification('Сервер не доступен');
        return;
      }
      const errorObject = error.response?.data as ApiError | undefined;
      if (!!errorObject && typeof errorObject === 'object') {
        throw Object.fromEntries(
          errorObject.errors.map((v) => [v.code, v.detail]),
        );
      }
      throw error.message;
    },
  );
  return instance as AppApi;
};

export const request = createRequestInstance();

export const reauestAddFile = async (data: File) => {
  const formData = new FormData();
  formData.append('file', data);

  try {
    await request.post('http://localhost:8000/csv-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Указываем тип контента файла
      },
    });
    showSuccessNotification('Файл загружен успешно');
  } catch (err) {
    showErrorNotification(String(err));
  }
};

export const requestGetConflicts = async (): Promise<Equipment[]> => {
  return await request.get(
    'http://172.22.109.96:8080/api/v1/conflict/mock',
    {},
  );
};

export const requestCreateSolve = async (
  data: EquipmentData,
): Promise<{ Info: string; Equipment: EquipmentData[] }> => {
  return await request.post(
    'https://172.22.109.96:8080/api/v1/update-conflict',
    [data],
  );
};
