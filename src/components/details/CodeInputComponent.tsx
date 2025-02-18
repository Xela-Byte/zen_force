import React, {useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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

const CELL_COUNT = 6;

const CodeInputComponent = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="default"
        textContentType="oneTimeCode"
        // autoComplete={Platform.select({
        //   android: 'sms-otp',
        //   default: 'one-time-code',
        // })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: sizeBlock.getWidthSize(40),
    height: 40,
    lineHeight: 40,
    fontSize: fontSize.medium,
    borderBottomWidth: 1,
    borderColor: appColors.border,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  focusCell: {
    borderColor: appColors.text,
  },
});

export default CodeInputComponent;
