import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PersonIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8m8 7.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
      fill={props.fill}
    />
  </Svg>
);
export default PersonIcon;
