import { uiActions } from '@store/ui';
import { Equipment, EquipmentData } from '@type/common';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface EquipmentTableListProps {
  equipmentList: Equipment[];
}

const equipmentDataKeys: (keyof EquipmentData)[] = [
  'idid',
  'id',
  'created_on',
  'updated_on',
  'name',
  'ci_code',
  'short_name',
  'full_name',
  'description',
  'notes',
  'status',
  'manufacturer',
  'serial',
  'model',
  'location',
  'mount',
  'hostname',
  'dns',
  'ip',
  'cpu_cores',
  'cpu_freq',
  'ram',
  'total_volume',
  'type',
  'category',
  'user_org',
  'owner_org',
  'code_mon',
];

const EquipmentTableList: React.FC<EquipmentTableListProps> = ({
  equipmentList,
}) => {
  const dispatch = useDispatch();
  const [solveData, setSolveData] = useState<EquipmentData[]>(
    equipmentList.map(() => ({}) as EquipmentData), // Инициализируем массив пустыми объектами
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getHeaderLabel = (key: string) => {
    return key
      .replace(/_/g, ' ')
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  };

  const handleInputChange = (
    index: number,
    key: keyof EquipmentData,
    value: string,
  ) => {
    const newSolveData = [...solveData];
    newSolveData[index] = { ...newSolveData[index], [key]: value };
    setSolveData(newSolveData);

    // Отправляем обновлённый массив в Redux
    dispatch(uiActions.setSolve(newSolveData));
  };

  return (
    <div className="equipment-container">
      {equipmentList.map((equipment, index) => (
        <div
          key={index}
          className="equipment-pair"
          style={{ marginBottom: '40px' }}
        >
          <h3>Оборудование #{index + 1}</h3>
          <table
            className="equipment-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '12px',
                    textAlign: 'left',
                  }}
                >
                  Характеристика
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '12px',
                    textAlign: 'left',
                  }}
                >
                  Основное
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '12px',
                    textAlign: 'left',
                  }}
                >
                  Дочернее
                </th>
                <th
                  style={{
                    border: '1px solid #ddd',
                    padding: '12px',
                    textAlign: 'left',
                  }}
                >
                  Ввод
                </th>
              </tr>
            </thead>
            <tbody>
              {equipmentDataKeys.map((key) => {
                //@ts-ignore
                const mainValue = equipment.main[key];
                //@ts-ignore
                const childValue = equipment.child[key];

                // Форматирование значений
                const formatValue = (value: any) => {
                  if (key === 'created_on' || key === 'updated_on') {
                    return formatDate(value);
                  }
                  if (typeof value === 'number') {
                    return key === 'cpu_freq' || key === 'total_volume'
                      ? value.toFixed(2)
                      : value.toString();
                  }
                  return value;
                };

                return (
                  <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>
                      {getHeaderLabel(key)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {formatValue(mainValue)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {formatValue(childValue)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="text"
                        value={solveData[index][key] || ''}
                        onChange={(e) =>
                          handleInputChange(index, key, e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '8px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default EquipmentTableList;
