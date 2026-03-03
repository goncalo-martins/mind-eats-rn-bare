import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { BaseColors } from '../../../src/constants/colors';

export default function ArrowLeftIcon({
  width = 24,
  height = 24,
  color = BaseColors.highlightDarkest,
}) {
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <Defs>
        <ClipPath id='clip0'>
          <Rect width='24.0009' height='24.0006' fill='white' />
        </ClipPath>
      </Defs>
      <G clipPath='url(#clip0)'>
        <Path
          d='M20.998 12H2.99805H3.49805'
          stroke={color}
          strokeWidth={3}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M9.99805 19L2.99805 12L9.99805 5'
          stroke={color}
          strokeWidth={3}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
    </Svg>
  );
}
