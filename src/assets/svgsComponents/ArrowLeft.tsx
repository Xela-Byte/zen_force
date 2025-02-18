import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ArrowLeft = (props: SvgProps) => (
  <Svg width={12} height={24} viewBox="0 0 12 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.84294 12.7106L7.49994 18.3676L8.91394 16.9536L3.96394 12.0036L8.91394 7.05365L7.49994 5.63965L1.84294 11.2966C1.65547 11.4842 1.55015 11.7385 1.55015 12.0036C1.55015 12.2688 1.65547 12.5231 1.84294 12.7106Z"
      fill="#121313"
    />
  </Svg>
);
export default ArrowLeft;
