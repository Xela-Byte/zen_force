import React, {memo, useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import EarthIcon from '@/assets/profileIcons/earth.svg';
import {
  appColors,
  borderRadius,
  fontFamily,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import AppPressable from '../button/AppPressable';
import AppText from '../text/AppText';

interface CustomDropdownProps {
  data: {label: string; value: string}[];
  placeholder?: string;
  defaultValue?: string;
  onSelect?: (value: string) => void;
  leftIcon: any;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  placeholder = 'Select an option',
  defaultValue = '',
  onSelect,
  leftIcon,
}) => {
  const [value, setValue] = useState(defaultValue);
  const dropdownRef = useRef<any>(null);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    onSelect?.(selectedValue);
    dropdownRef?.current?.close();
  };

  const RadioButton = memo(
    useCallback(
      ({option}: {option: {label: string; value: string}}) => {
        return (
          <AppPressable onPress={() => handleSelect(option.value)}>
            <View style={styles.radioBtn}>
              <AppText>{option.label}</AppText>
              <View style={styles.checkBoxContainer}>
                {value === option.value && <View style={styles.checkBox} />}
              </View>
            </View>
          </AppPressable>
        );
      },
      [value],
    ),
  );

  return (
    <View>
      <Dropdown
        closeModalWhenSelectedItem
        ref={dropdownRef}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        search={false}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        fontFamily={fontFamily.regular}
        autoScroll
        itemContainerStyle={{
          borderColor: 'white',
          borderWidth: 0,
          elevation: 0,
        }}
        containerStyle={{
          borderColor: 'white',
          borderWidth: 0,
          elevation: 0,
          paddingVertical: sizeBlock.getHeightSize(10),
        }}
        value={value}
        renderLeftIcon={() => leftIcon}
        renderItem={item => <RadioButton option={item} />}
        onChange={item => handleSelect(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: appColors.grey,
    padding: sizeBlock.getWidthSize(15),
    borderRadius: borderRadius.medium,
    ...universalStyle.verticalCentering,
  },
  radioBtn: {
    borderWidth: 1,
    borderColor: appColors.grey,
    padding: sizeBlock.getWidthSize(15),
    borderRadius: borderRadius.medium,
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(10),
    marginVertical: sizeBlock.getHeightSize(5),
  },
  checkBoxContainer: {
    width: sizeBlock.getWidthSize(18),
    height: sizeBlock.getWidthSize(18),
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: appColors.green,
    ...universalStyle.centering,
    marginLeft: 'auto',
  },
  checkBox: {
    width: sizeBlock.getWidthSize(12),
    height: sizeBlock.getWidthSize(12),
    borderRadius: borderRadius.full,
    backgroundColor: appColors.green,
  },
  placeholderStyle: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
});

export default CustomDropdown;
