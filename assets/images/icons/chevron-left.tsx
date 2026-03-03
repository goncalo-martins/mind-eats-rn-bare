import { BaseColors } from '../../../src/constants/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ChevronLeftIcon({
  width = 24,
  height = 24,
  color = BaseColors.neutralLightLight,
}) {
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24'>
      <Path
        d='M15 18l-6-6 6-6'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
