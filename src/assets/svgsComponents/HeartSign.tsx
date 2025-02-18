import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const HeartSign = (props: SvgProps) => (
  <Svg width={390} height={409} viewBox="0 0 390 409" fill="none" {...props}>
    <Path
      d="M-46.0341 407.431C135.312 273.503 194.519 152.408 171.006 90.3103C147.494 28.2127 57.663 -4.3434 16.6665 90.3103C-24.33 184.964 125.333 298.232 263.249 321.217C376.984 191.099 406.34 81.7296 350.065 28.2127C293.789 -25.3043 194.519 4.6999 189.093 78.2524C183.667 151.805 280.732 240.43 420 203.051"
      stroke="url(#paint0_linear_49_89)"
      strokeWidth={2}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_49_89"
        x1={186.983}
        y1={1}
        x2={186.983}
        y2={407.431}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#3BA700" />
        <Stop offset={1} stopColor="#6FCB03" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default HeartSign;
