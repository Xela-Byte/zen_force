import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {
  appColors,
  fontFamily,
  fontSize as fontSizes,
} from '@/styles/universalStyle';

type Props = {
  children: React.ReactNode;
  color?: string;
  fontSize?: number;
  customStyle?: StyleProp<TextStyle>;
  numLine?: number | undefined;
  fontType?: keyof typeof fontFamily;
  ellipsizeMode?: TextProps['ellipsizeMode'];
};

const AppText = ({
  children,
  color,
  fontSize,
  customStyle,
  numLine,
  fontType,
  ellipsizeMode,
}: Props) => {
  return (
    <Text
      numberOfLines={numLine}
      ellipsizeMode={ellipsizeMode ?? 'tail'}
      style={[
        customStyle,
        {
          color: color ? color : appColors.text,
          fontSize: fontSize ? fontSize : fontSizes.small,
          fontFamily: fontType ? fontFamily[fontType] : fontFamily.regular,
        },
      ]}>
      {children}
    </Text>
  );
};

export default AppText;
