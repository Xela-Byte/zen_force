import {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import AppText from '../text/AppText';
import GoogleIcon from '@/assets/svgsComponents/GoogleIcon';
import AppleIcon from '@/assets/svgsComponents/AppleIcon';

type ButtonType = 'filled' | 'outlined';

type Props = {
  onPress: () => void;
  title: string;
  buttonType?: ButtonType;
  customViewStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  textSize?: number;
  loading?: boolean;
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  icon?: any;
  iconName?: 'google' | 'apple';
  iconPosition?: 'left' | 'right';
};

const AppButton = ({
  customTextStyle,
  customViewStyle,
  onPress,
  title,
  textSize,
  loading,
  disabled,
  textColor,
  bgColor,
  borderColor,
  buttonType = 'filled',
  icon,
  iconName,
  iconPosition = 'right',
}: Props) => {
  const [animate, setAnimate] = useState(false);

  const handlePress = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    onPress();
  };

  const bounce = {
    0: {opacity: 1, scale: 1},
    0.5: {opacity: 1, scale: 0.8},
    1: {opacity: 1, scale: 1},
  };

  const isOutlined = buttonType === 'outlined';

  return (
    <Pressable disabled={disabled} onPress={handlePress}>
      <Animatable.View
        duration={300}
        animation={animate ? bounce : undefined}
        style={[
          styles.container,
          customViewStyle,
          {
            opacity: disabled ? 0.3 : 1,
            backgroundColor: isOutlined
              ? 'white'
              : (bgColor ?? appColors.btnBlack),
            borderColor: isOutlined
              ? (borderColor ?? appColors.border)
              : 'transparent',
            borderWidth: isOutlined ? 2 : 0,
          },
        ]}>
        {loading ? (
          <ActivityIndicator
            color={textColor ?? appColors.white}
            size={textSize ?? fontSize.small}
          />
        ) : (
          <View
            style={[
              universalStyle.flexBetween,
              {gap: sizeBlock.getWidthSize(10)},
            ]}>
            {iconName && iconName === 'google' && <GoogleIcon />}
            {iconName && iconName === 'apple' && <AppleIcon />}
            {iconPosition === 'left' && icon}
            <AppText
              fontSize={textSize ?? fontSize.small}
              customStyle={customTextStyle}
              fontType="medium"
              color={
                textColor ?? (isOutlined ? appColors.green : appColors.white)
              }>
              {title}
            </AppText>
            {iconPosition === 'right' && icon}
          </View>
        )}
      </Animatable.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: sizeBlock.getHeightSize(15),
    paddingHorizontal: sizeBlock.getWidthSize(25),
    borderRadius: borderRadius.medium,
    ...universalStyle.centering,
  },
});

export default AppButton;
