import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

export default function ProfileIcon({ size = 24, color = '#80E619' }: Props) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M18 6C18 9.31371 15.3137 12 12 12C8.68629 12 6 9.31371 6 6C6 2.68629 8.68629 0 12 0C15.3137 0 18 2.68629 18 6Z'
        fill={color}
      />
      <Path
        d='M2 20C2 16.6863 4.68629 14 8 14H16C19.3137 14 22 16.6863 22 20V21C22 22.6569 20.6569 24 19 24H5C3.34315 24 2 22.6569 2 21V20Z'
        fill={color}
      />
    </Svg>
  );
}
