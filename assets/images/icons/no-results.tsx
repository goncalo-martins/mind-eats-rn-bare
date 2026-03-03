import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export default function NoResultsIcon({
  size = 64,
  color = "#A3AE97",
  strokeWidth = 4,
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Path
        d="M11.1511 40.849C9.20094 38.8989 7.65401 36.5837 6.59861 34.0358C5.54321 31.4878 5 28.7569 5 25.999C5 23.2411 5.54321 20.5102 6.59861 17.9622C7.65401 15.4143 9.20094 13.0991 11.1511 11.149C13.1012 9.19887 15.4163 7.65194 17.9643 6.59654C20.5123 5.54114 23.2432 4.99793 26.0011 4.99793C28.759 4.99793 31.4899 5.54114 34.0378 6.59654C36.5858 7.65194 38.9009 9.19887 40.8511 11.149"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M44.471 16C46.6232 19.9796 47.4332 24.5477 46.7803 29.0247C46.1273 33.5016 44.0465 37.6482 40.8473 40.8473C37.6482 44.0465 33.5016 46.1273 29.0247 46.7803C24.5477 47.4332 19.9796 46.6232 16 44.471"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59.0001 59L40.8491 40.849"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 46.999L47 5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
