import NavPoint from '@components/NavPoint/NavPoint';
import { uiActions, uiSelectors } from '@store/ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProps = {
  data: string[];
  scrollToRef: React.RefObject<(HTMLDivElement | null)[]>;
};

const Navigation: React.FC<NavigationProps> = ({ data, scrollToRef }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(uiSelectors.getActiveTab);

  const selectPoint = (index: number) => {
    console.log(index);
    dispatch(uiActions.setActiveTab(index));

    // Прокрутка к соответствующему элементу
    const element = scrollToRef.current![index];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
      }}
    >
      {data.map((el, index) => (
        <NavPoint
          key={index}
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
