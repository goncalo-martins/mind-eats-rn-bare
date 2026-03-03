import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { BaseColors } from '../../../src/constants/colors';

export default function BulletIcon({
  width = 9,
  height = 9,
  color = BaseColors.highlightDarkest,
}) {
  return (
    <Svg width={width} height={height} fill='none' viewBox='0 0 8 8'>
      <Rect width='8' height='8' rx='4' fill={color} />
    </Svg>
  );
}
