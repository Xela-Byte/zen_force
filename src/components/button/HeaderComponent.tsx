import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../text/AppText';
import AppPressable from './AppPressable';
import {
  fontSize,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import ArrowLeft from '../../assets/svgsComponents/ArrowLeft';

type Props = {
  navigation: any;
  title: string;
  onPress?: () => void;
  extraComponent?: any;
};

const HeaderComponent = ({
  navigation,
  onPress,
  title,
  extraComponent,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.header}>
      <AppPressable
        onPress={onPress ? onPress : navigation.goBack}
        customViewStyle={styles.buttonContainer}>
        <ArrowLeft />
      </AppPressable>
      <View style={styles.headerText}>
        <AppText fontType="medium" fontSize={fontSize.small + 1}>
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
