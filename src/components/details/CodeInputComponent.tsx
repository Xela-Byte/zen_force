import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  appColors,
  fontFamily,
  fontSize,
  sizeBlock,
} from '../../styles/universalStyle';

type Props = {
  onChange: (value: string) => void;
  cellCount?: number;
};

const CodeInputComponent = ({onChange, cellCount = 8}: Props) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="default"
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <Text
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            {index % 2 !== 0 && index < cellCount - 1 ? (
              <Text key={`separator-${index}`} style={styles.separator}>
                -
              </Text>
            ) : null}
          </Fragment>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    width: sizeBlock.getWidthSize(15),
    height: sizeBlock.getHeightSize(35),
    lineHeight: sizeBlock.getHeightSize(35),
    fontSize: fontSize.small + 5,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: sizeBlock.getWidthSize(20),
    height: sizeBlock.getHeightSize(35),
    lineHeight: sizeBlock.getHeightSize(35),
    fontSize: fontSize.small + 5,
    borderBottomWidth: 1,
    borderColor: appColors.border,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    textTransform: 'uppercase',
  },
  focusCell: {
    borderColor: appColors.text,
  },
});

export default CodeInputComponent;
