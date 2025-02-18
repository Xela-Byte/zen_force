import React, {useState} from 'react';
import {Controller, FieldPath, FieldValues} from 'react-hook-form';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  appColors,
  borderRadius,
  fontFamily,
  fontSize,
  sizeBlock,
} from '../../styles/universalStyle';

import AppText from '../text/AppText';
import EyeIcon from '../../assets/svgsComponents/EyeIcon';

type AppInputProps<TFieldValues extends FieldValues> = {
  control: any;
  name: FieldPath<TFieldValues>;
  password?: boolean;
  rules?: object;
  placeholder?: string;
  animatedPlaceholder?: string;
  iconName?: string;
  onFocus?: () => void;
  keyboardType?: KeyboardType;
  editable?: boolean;
  defaultValue?: TFieldValues[FieldPath<TFieldValues>];
  mB?: number;
  customStyle?: ViewStyle;
  inputProps?: TextInputProps;
  mutliline?: boolean;
};
const AppInput = <TFieldValues extends FieldValues>({
  control,
  name,
  password,
  rules,
  placeholder,
  keyboardType,
  onFocus,
  editable,
  defaultValue,
  mB,
  customStyle,
  inputProps,
  mutliline,
  animatedPlaceholder,
}: AppInputProps<TFieldValues>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState<
    boolean | string | undefined
  >(password);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.container,
                {
                  borderColor: error
                    ? 'red'
                    : isFocused
                    ? appColors.green
                    : appColors.border,
                  marginBottom: mB,
                  backgroundColor: appColors.background,
                  height: mutliline
                    ? sizeBlock.getHeightSize(150)
                    : sizeBlock.getHeightSize(55),
                },
                customStyle,
              ]}>
              <Animatable.View
                transition={'top'}
                style={[
                  styles.animatedPlaceholder,
                  {
                    left: isFocused ? '10%' : '20%',
                    opacity: isFocused ? 1 : 0,
                    top: isFocused ? -sizeBlock.getHeightSize(10) : 0,
                    backgroundColor: appColors.background,
                  },
                ]}>
                <AppText
                  color={appColors.textGrey}
                  fontSize={fontSize.small - 2}>
                  {animatedPlaceholder}
                </AppText>
              </Animatable.View>

              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  setIsFocused(false);
                }}
                defaultValue={defaultValue}
                editable={editable}
                secureTextEntry={showPassword ? true : false}
                placeholderTextColor={
                  isFocused ? appColors.background : appColors.textGrey
                }
                placeholder={placeholder}
                keyboardType={keyboardType}
                cursorColor={appColors.textGrey}
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    color: appColors.text,
                  },
                ]}
                onFocus={() => {
                  onFocus && onFocus();
                  setIsFocused(true);
                }}
                {...inputProps}
                multiline={mutliline}
                numberOfLines={5}
              />
              {password && (
                <>
                  <EyeIcon
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      width: fontSize.small,
                      transform: showPassword
                        ? [{rotate: '180deg'}]
                        : [{rotate: '0deg'}],
                    }}
                  />
                </>
              )}
            </View>

            {error && (
              <Text style={styles.error}>{error.message || 'Error'}</Text>
            )}
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: borderRadius.medium,
    paddingHorizontal: sizeBlock.getHeightSize(20),
    marginVertical: sizeBlock.getHeightSize(10),
    borderWidth: 1,
    height: sizeBlock.getHeightSize(55),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: '90%',
    borderBottomWidth: 0,
    fontFamily: fontFamily.regular,
    verticalAlign: 'top',
    marginTop: '2.5%',
  },
  error: {
    color: 'red',
    alignSelf: 'stretch',
    fontSize: 10,
    fontFamily: fontFamily.regular,
  },
  animatedPlaceholder: {
    paddingHorizontal: sizeBlock.getWidthSize(5),
    position: 'absolute',
    zIndex: 10,
  },
});

export default AppInput;
