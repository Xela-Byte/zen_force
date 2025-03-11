import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const CheckIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9m8.486 3.852 5.182-6.478-.936-.748-4.418 5.52-3.13-2.607-.768.922z"
        fill="#3BA700"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CheckIcon;
