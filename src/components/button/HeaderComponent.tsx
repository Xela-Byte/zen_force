import React from 'react';
import {StyleSheet, View} from 'react-native';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import {
  appColors,
  fontSize,
  screenWidth,
  universalStyle,
} from '@/styles/universalStyle';
import AppText from '../text/AppText';
import AppPressable from './AppPressable';

type Props = {
  navigation: any;
  title: string;
  onPress?: () => void;
  extraComponent?: any;
  theme?: 'light' | 'dark';
};

const HeaderComponent = ({
  navigation,
  onPress,
  title,
  extraComponent,
  theme,
}: Props) => {
  return (
    <View style={styles.header}>
      <AppPressable
        onPress={onPress ? onPress : navigation.goBack}
        customViewStyle={styles.buttonContainer}>
        <ArrowLeft
          fill={theme === 'light' ? appColors.white : appColors.black}
        />
      </AppPressable>
      <View style={styles.headerText}>
        <AppText
          color={theme === 'light' ? appColors.white : appColors.black}
          fontType="medium"
          fontSize={fontSize.small + 1}>
          {title}
        </AppText>
      </View>
      {extraComponent && extraComponent}
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    ...universalStyle.verticalCentering,
    width: screenWidth,
  },
  headerText: {
    width: '70%',
    ...universalStyle.centering,
  },
  buttonContainer: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    ...universalStyle.centering,
  },
});

export default HeaderComponent;
