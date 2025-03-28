import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  appColors,
  borderRadius,
  fontFamily,
  sizeBlock,
} from '@/styles/universalStyle';

interface DropdownProps {
  options: {key: string; value: string}[]; // Dynamic list of options
  placeholder: string; // Placeholder text
  onSelect: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <View style={{width: '100%'}}>
      <SelectList
        search={false}
        boxStyles={{
          backgroundColor: appColors.background,
          borderColor: appColors.border,
          paddingVertical: sizeBlock.getHeightSize(15),
          borderRadius: borderRadius.medium,
        }}
        setSelected={(val: string) => handleSelect(val)}
        data={options}
        fontFamily={fontFamily.regular}
        dropdownStyles={{
          borderWidth: 0,
        }}
        dropdownItemStyles={{
          backgroundColor: appColors.grey,
          marginVertical: sizeBlock.getHeightSize(5),
          height: sizeBlock.getHeightSize(40),
          paddingTop: sizeBlock.getHeightSize(10),
          borderRadius: borderRadius.small,
        }}
        dropdownTextStyles={{
          color: appColors.text,
        }}
        inputStyles={{
          color: appColors.text,
        }}
        save="value"
        placeholder={placeholder}
      />
    </View>
  );
};

export default DropdownComponent;
