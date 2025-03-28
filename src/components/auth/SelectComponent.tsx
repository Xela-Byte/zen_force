import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AppText from '../text/AppText';
import CheckIcon from '@/assets/svgsComponents/CheckIcon';

type SelectComponentProps = {
  label: string;
  value: string;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  icon?: any;
};

const SelectComponent = ({
  label,
  value,
  selectedValue,
  onSelect,
  icon,
}: SelectComponentProps) => {
  const [animate, setAnimate] = useState(false);
  const isSelected = selectedValue === value;

  const handlePress = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    onSelect(value);
  };

  const bounce = {
    0: {opacity: 1, scale: 1},
    0.5: {opacity: 1, scale: 0.95},
    1: {opacity: 1, scale: 1},
  };

  return (
    <Pressable onPress={handlePress}>
      <Animatable.View
        duration={300}
        animation={animate ? bounce : undefined}
        style={[styles.option, isSelected && styles.selectedOption]}>
        <View style={styles.row}>
          <View style={universalStyle.verticalCentering}>
            {icon && icon}
            <AppText
              color={isSelected ? appColors.green : appColors.text}
              customStyle={styles.optionText}>
              {label}
            </AppText>
          </View>

          <View
            style={{
              width: sizeBlock.getWidthSize(20),
            }}>
            {isSelected ? (
              <CheckIcon />
            ) : (
              <View
                style={{
                  width: sizeBlock.getWidthSize(15),
                  height: sizeBlock.getWidthSize(15),
                  borderWidth: 1,
                  borderRadius: borderRadius.full,
                  borderColor: appColors.border,
                }}
              />
            )}
          </View>
        </View>
      </Animatable.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    ...universalStyle.flexBetween,
    padding: 15,
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: borderRadius.medium,
    marginBottom: sizeBlock.getHeightSize(10),
  },
  selectedOption: {
    borderColor: appColors.green,
    backgroundColor: appColors.white,
  },
  row: {
    ...universalStyle.flexBetween,
    width: '100%',
  },
  optionText: {
    marginLeft: sizeBlock.getWidthSize(10),
  },
});

export default SelectComponent;
