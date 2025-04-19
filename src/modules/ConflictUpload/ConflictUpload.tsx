import Button from '@components/Button';
import EquipmentTableList from '@components/EquipmentData';
import Flex from '@components/Flex';
import { SubHeader, Text } from '@components/Typography';
import Input from '@components/input/Input';
import { content } from '@lib/theme/colors';
import { uiActions, uiSelectors } from '@store/ui';
import { fetchAddSolve } from '@store/ui/thunks';
import { Equipment, EquipmentData } from '@type/common';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ConflictUpload = () => {
  const dispatch = useDispatch();
  const equipment = useSelector(uiSelectors.getEquipment);
  const solve = useSelector(uiSelectors.getDolve);

  return (
    <>
      <Flex justify="center" style={{ width: '100%' }}>
        <SubHeader>{!equipment ? 'Данные в обработке' : 'Данные'}</SubHeader>
      </Flex>
      <Flex
        align="center"
        flex="1"
        direction="column"
        gap="20px"
        style={{
          paddingTop: 120,
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'scroll',
        }}
      >
        {!equipment && <Text $color={content.light}>Подождите...</Text>}
        {equipment && <EquipmentTableList equipmentList={equipment} />}
      </Flex>
      <Button onClick={() => dispatch(fetchAddSolve(solve))}>
        <Text>Отправить изменения</Text>
      </Button>
    </>
  );
};

export default ConflictUpload;
