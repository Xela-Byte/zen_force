import PartnerIcon from '@/assets/svgsComponents/PartnerIcon';
import PersonIcon from '@/assets/svgsComponents/PersonIcon';
import SelectComponent from '@/components/auth/SelectComponent';
import AppButton from '@/components/button/AppButton';
import BackButton from '@/components/button/BackButton';
import AppText from '@/components/text/AppText';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import {setVettingData, VettingData} from '@/store/slices/appSlice';
import {accountSetupStyle} from '@/styles/accountSetupStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {
  AccountSetupScreenProps,
  AuthStackParamList,
} from '@/types/navigation/AuthNavigationType';
import {useState} from 'react';
import {View} from 'react-native';

//

const AccountSetupScreen = ({navigation}: AccountSetupScreenProps) => {
  const dispatch = useAppDispatch();

  const storeVettingData = (payload: Partial<VettingData>) => {
    dispatch(setVettingData(payload));
  };

  const vettingData = useAppSelector(state => state.app.vettingData);

  const navigateTo = <T extends keyof AuthStackParamList>(
    route: T,
    params?: AuthStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const [selectedOption, setSelectedOption] = useState<
    'with-partner' | 'by-myself' | string
  >(vettingData?.hereWith ?? '');

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

  const handleNext = () => {
    if (selectedOption) {
      storeVettingData({hereWith: selectedOption});
      navigateTo('DetailsScreen');
    }
  };

  return (
    <>
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

      <View
        style={{
          paddingHorizontal: sizeBlock.getWidthSize(20),
        }}>
        <AppButton
          bgColor={appColors.green}
          title="Set up profile"
          disabled={!selectedOption}
          onPress={() => {
            handleNext();
          }}
        />
      </View>
    </>
  );
};

export default AccountSetupScreen;
