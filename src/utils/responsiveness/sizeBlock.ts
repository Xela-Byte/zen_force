import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

class SizeConfig {
  static fontSize(value: number): number {
    return moderateScale(value);
  }

  static getWidthSize(value: number): number {
    return scale(value);
  }

  static getHeightSize(value: number): number {
    return verticalScale(value);
  }
}

export const sizes = SizeConfig;
