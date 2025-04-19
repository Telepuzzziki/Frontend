import { requestCreateSolve, requestGetConflicts } from '@lib/api';
import { AppDispatch } from '..';
import { uiActions } from '.';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@lib/utils/notification';
import { AxiosError } from 'axios';
import { EquipmentData } from '@type/common';

export const fetchEquipment = () => async (dispatch: AppDispatch) => {
  try {
    const message = await requestGetConflicts();
    console.log(message);
    dispatch(
      uiActions.setEquipment(
        message.map((el) => ({ child: el.child, main: el.main })),
      ),
    );
  } catch (e) {
    if (e instanceof AxiosError) return e.message;
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};

export const fetchAddSolve =
  (item: EquipmentData) => async (dispatch: AppDispatch) => {
    try {
      const message = await requestCreateSolve(item);
      dispatch(uiActions.setSolve(message.Equipment));
    } catch (e) {
      if (e instanceof AxiosError) return showSuccessNotification('uploaded');
      if (typeof e === 'string') return showSuccessNotification('uploaded');
      showErrorNotification('Что-то пошло не так...');
    }
  };
