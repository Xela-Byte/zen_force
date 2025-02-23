import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AppText from '../text/AppText';
import CheckCircleIcon from '../../assets/images/check_circle.svg';
import AppPressable from '../button/AppPressable';

interface QuestionCheckboxProps {
  label: string;
  optionKey: string;
  selected: boolean;
  onPress: () => void;
}

const QuestionCheckbox: React.FC<QuestionCheckboxProps> = ({
  label,
  optionKey,
  selected,
  onPress,
}) => {
  return (
    <AppPressable onPress={onPress}>
      {selected ? (
        <LinearGradient
          style={styles.selectedOption}
          colors={['#3BA700', '#6FCB03']}>
          <AppText color={appColors.white}>{optionKey}</AppText>
          <View style={styles.selectedLine} />
          <AppText color={appColors.white}>{label}</AppText>
          <CheckCircleIcon style={{marginLeft: 'auto'}} />
        </LinearGradient>
      ) : (
        <View style={styles.option}>
          <AppText color={appColors.textGrey}>{optionKey}</AppText>
          <View style={styles.line} />
          <AppText color={appColors.textGrey}>{label}</AppText>
        </View>
      )}
    </AppPressable>
  );
};

const styles = StyleSheet.create({
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#EFEEFC',
  },
  selectedLine: {
    width: 1,
    height: '100%',
    backgroundColor: appColors.white,
  },
  option: {
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(20),
    padding: sizeBlock.getWidthSize(20),
    borderWidth: 1,
    borderColor: '#EFEEFC',
    borderRadius: borderRadius.medium,
    marginBottom: sizeBlock.getHeightSize(15),
  },
  selectedOption: {
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(20),
    padding: sizeBlock.getWidthSize(20),
    borderRadius: borderRadius.medium,
    marginBottom: sizeBlock.getHeightSize(15),
  },
  optionKey: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#999',
  },
  optionKeySelected: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
  },
  optionLabel: {
    fontSize: fontSize.medium,
    color: '#333',
  },
  optionLabelSelected: {
    fontSize: fontSize.medium,
    color: 'white',
  },
  checkmark: {
    marginLeft: 'auto',
    fontSize: fontSize.large,
    color: 'white',
  },
});

export default QuestionCheckbox;
