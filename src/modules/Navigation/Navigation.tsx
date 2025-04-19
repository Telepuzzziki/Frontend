import NavPoint from '@components/NavPoint/NavPoint';
import { uiActions, uiSelectors } from '@store/ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProps = {
  data: string[];
};

const Navigation: React.FC<NavigationProps> = ({ data }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(uiSelectors.getActiveTab);

  const selectPoint = (index: number) => {
    console.log(index);
    return dispatch(uiActions.setActiveTab(index));
  };

  return (
    <nav>
      {data.map((el, index) => (
        <NavPoint
          index={index + 1}
          label={el}
          onClick={() => selectPoint(index)}
          checked={selectedTab >= index}
          isFirst={index === 0}
          isLast={index === data.length - 1}
        />
      ))}
    </nav>
  );
};

export default Navigation;
