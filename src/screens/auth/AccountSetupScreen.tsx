import {View, Text} from 'react-native';
import {accountSetupStyle} from '../../styles/accountSetupStyle';
import BackButton from '../../components/button/BackButton';
import {
  AccountSetupScreenProps,
  AuthStackParamList,
} from '../../types/navigation/AuthNavigationType';
import AppText from '../../components/text/AppText';
import {appColors, fontSize, sizeBlock} from '../../styles/universalStyle';
import SelectComponent from '../../components/auth/SelectComponent';
import {useEffect, useState} from 'react';
import PersonIcon from '../../assets/svgsComponents/PersonIcon';
import PartnerIcon from '../../assets/svgsComponents/PartnerIcon';

const AccountSetupScreen = ({navigation}: AccountSetupScreenProps) => {
  const navigateTo = <T extends keyof AuthStackParamList>(
    route: T,
    params?: AuthStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const [selectedOption, setSelectedOption] = useState<
    'with-partner' | 'by-myself' | string
  >('');

  const options = [
    {
      label: 'By myself',
      value: 'by-myself',
      icon: (
        <PersonIcon
          fill={
            selectedOption === 'by-myself' ? appColors.green : appColors.text
          }
        />
      ),
    },
    {
      label: 'With my partner',
      value: 'with-partner',
      icon: (
        <PartnerIcon
          fill={
            selectedOption === 'with-partner' ? appColors.green : appColors.text
          }
        />
      ),
    },
  ];

  useEffect(() => {
    selectedOption &&
      navigateTo('DetailsScreen', {
        companionPreference: selectedOption,
      });
  }, [selectedOption]);

  return (
    <View style={accountSetupStyle.wrapper}>
      <BackButton navigation={navigation} />
      <View style={accountSetupStyle.container}>
        <AppText fontType="medium" fontSize={fontSize.medium}>
          Are you here by yourself or with your partner?
        </AppText>

        <View
          style={{
            marginVertical: sizeBlock.getHeightSize(50),
          }}>
          {options.map(option => {
            return (
              <SelectComponent
                key={option.value}
                label={option.label}
                onSelect={(value: string) => {
                  setSelectedOption(value);
                }}
                selectedValue={selectedOption}
                value={option.value}
                icon={option.icon}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AccountSetupScreen;
