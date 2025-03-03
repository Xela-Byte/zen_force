declare module 'react-native-progress' {
  import {Component} from 'react';
  import {StyleProp, ViewStyle} from 'react-native';

  export interface ProgressProps {
    progress?: number;
    size?: number;
    width?: number;
    color?: string;
    unfilledColor?: string;
    borderWidth?: number;
    borderColor?: string;
    indeterminate?: boolean;
    animationType?: 'decay' | 'timing' | 'spring';
    style?: StyleProp<ViewStyle>;
  }

  export class Bar extends Component<ProgressProps> {}
  export class Circle extends Component<ProgressProps> {}
  export class Pie extends Component<ProgressProps> {}
  export class CircleSnail extends Component<ProgressProps> {}
}

declare module 'react-native-progress/Pie' {
  import {Pie} from 'react-native-progress';
  export default Pie;
}
