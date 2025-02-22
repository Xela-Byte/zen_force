import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const PfpIcon = (props: SvgProps) => (
  <Svg width={70} height={70} viewBox="0 0 70 70" fill="none" {...props}>
    <Rect width={70} height={70} rx={35} fill="#D9D9D9" />
    <Path
      d="M35 20a9.375 9.375 0 1 0 0 18.75A9.375 9.375 0 0 0 35 20"
      fill="#8E9797"
    />
    <Path
      d="M35 8.75A26.25 26.25 0 1 0 61.25 35 26.28 26.28 0 0 0 35 8.75m14.987 42.986a9.375 9.375 0 0 0-9.362-9.236h-11.25a9.375 9.375 0 0 0-9.36 9.236 22.5 22.5 0 1 1 29.972 0"
      fill="#8E9797"
    />
  </Svg>
);
export default PfpIcon;
