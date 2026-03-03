import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

export default function DeleteIcon({ size = 24, color = '#000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path d='M3 6H21' stroke={color} strokeWidth={2} strokeLinecap='round' />
      <Path
        d='M8 6V4H16V6'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M6 6L7 20H17L18 6'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M10 11V17'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
      />
      <Path
        d='M14 11V17'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
      />
    </Svg>
  );
}
