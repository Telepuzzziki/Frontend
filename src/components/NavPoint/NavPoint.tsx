import Flex from '@components/Flex';
import { Text } from '@components/Typography';
import { content } from '@lib/theme/colors';
import React from 'react';
import styled from 'styled-components';

const Square = styled.div<{ $selected?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$selected ? content.dark : content.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div<{ $selected?: boolean }>`
  height: 140px;
  border-left: 10px
    ${(props) => (props.$selected ? content.dark : content.light)} solid;
`;

type NavPointProps = {
  label?: string;
  index: number;
  checked?: boolean;
  onClick?: VoidFunction;
};

const NavPoint: React.FC<NavPointProps> = ({
  label,
  index,
  onClick,
  checked = false,
}) => {
  return (
    <span style={{ cursor: 'pointer' }}>
      <Flex align="center" gap="16px" onClick={onClick}>
        <Square $selected={checked}>
          <Text $size="subheader" $color={content.white}>
            {index}
          </Text>
        </Square>
        <Text $size="subheader" $color={checked ? content.dark : content.light}>
          {label}
        </Text>
      </Flex>
      <Line style={{ marginLeft: 25 }} />
    </span>
  );
};

export default NavPoint;
