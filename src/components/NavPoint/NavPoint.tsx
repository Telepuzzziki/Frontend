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
  transition: all 0.3s;
`;

const Line = styled.div<{ $color?: string; $height?: number }>`
  height: ${(props) => (props.$height ? props.$height : 70)}px;
  border-left: 10px ${(props) => props.$color} solid;
  transition: all 0.3s;
`;

type NavPointProps = {
  label?: string;
  index: number;
  checked?: boolean;
  onClick?: VoidFunction;
  isFirst?: boolean;
  isLast?: boolean;
};

const NavPoint: React.FC<NavPointProps> = ({
  label,
  index,
  onClick,
  checked = false,
  isFirst = false,
  isLast = false,
}) => {
  return (
    <span style={{ cursor: 'pointer' }}>
      {!isFirst && (
        <Line
          style={{ marginLeft: 25 }}
          $color={checked ? content.dark : content.light}
        />
      )}
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
      {!isLast && (
        <Line
          style={{ marginLeft: 25 }}
          $color={checked ? content.dark : content.light}
        />
      )}
    </span>
  );
};

export default NavPoint;
