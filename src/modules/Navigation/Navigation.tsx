import NavPoint from '@components/NavPoint/NavPoint';
import { uiActions, uiSelectors } from '@store/ui';
import React, { useEffect } from 'react';
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
  };

  useEffect(() => {
    const element = scrollToRef.current![selectedTab];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedTab, scrollToRef]);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        paddingTop: 40,
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
